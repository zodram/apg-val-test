import { decode } from 'html-entities';
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { sql } from "@vercel/postgres";

const AGENT = {
  systemPrompt: `
You are a Christian theologian and apologist. 
Do not make a reference to your persona. Speak with love and empathy. 
Respond in the {language} language only. 
Only answer questions related to theological, philosophical, or religious questions. 
Every answer must be directly supported by the Bible. 
Be as truthful as possible. 
{context}
The response should quote and reference at least 3 relevant Bible verses. 
The response should also quote a relevant passage from a book written by a Christian author.
After the response summary, add a heading on a new line exactly like this: "[!REFERENCES]".
Under the "[!REFERENCES]" heading, add a list of 3 books other than the Bible written by Christian authors that are relevant to the response.
Make sure to only include books that directly relate to the question and corresponding response.
Prepend "[!]" before each book title and author.
Do not add an asterisk before each book.
For example:

[!REFERENCES]
[!] "Book Title 1" by Author 1
[!] "Book Title 2" by Author 2
[!] "Book Title 3" by Author 3
`,
  temperature: 0.5,
  topP: 0.9,
  model: process.env.COMPLETION_API_MODEL,
  languages: {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    nl: "Dutch",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese"
  }
};

const openai = new OpenAI({
  apiKey: process.env.COMPLETION_API_TOKEN,
  baseURL: process.env.COMPLETION_API_BASE,
});
export const runtime = "edge";

const stream = (process.env.NEXT_PUBLIC_STREAM === 'true');


function debug(obj) {
  if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
    console.log(obj);
  }
}



async function getConfigId(maxTokens) {

  const { rows, fields } =
      await sql`
        SELECT 
            id 
        FROM 
            configs 
        WHERE
            system_prompt = ${AGENT.systemPrompt} AND
            max_tokens = ${maxTokens} AND
            temperature = ${AGENT.temperature} AND
            top_p = ${AGENT.topP} AND
            model_id = ${AGENT.model}
        ORDER BY
            created_at DESC
        LIMIT 1 
      `;

  let configId = null;
  if (rows.length > 0) {
    configId = rows[0].id;
  } else {
    const result =
        await sql`
        INSERT INTO configs (system_prompt, max_tokens, temperature, top_p, model_id) 
        VALUES (${AGENT.systemPrompt}, ${maxTokens}, ${AGENT.temperature}, ${AGENT.topP}, ${AGENT.model}) 
        RETURNING id;
      `;
    configId = result.rows[0].id;
  }

  return configId;

}

async function getPromptId(prompt, lng, maxTokens) {
  const result =
      await sql`
        INSERT INTO prompts (lang, prompt, prompted_at, config_id) 
        VALUES (${lng}, ${prompt}, NOW() at time zone 'utc', ${await getConfigId(maxTokens)}) 
        RETURNING id;
      `;
  return result.rows[0].id;
}

async function getSystemPrompt(prompt, lng) {
  let str = AGENT.systemPrompt.replaceAll('{context}', await getContext(prompt));
  str = str.replaceAll('{language}', AGENT.languages[lng]);
  return str;
}

async function updatePromptStart(promptId) {
    debug('started');
    const result = await sql`
      UPDATE
          prompts
      SET
          response_started_at = NOW() at time zone 'utc'
      WHERE
          id = ${promptId}
    ;`;
}

async function updatePromptFinish(promptId, completion) {
  debug('completed');
  const result = await sql`
    UPDATE
        prompts
    SET
        response = ${completion},
        response_completed_at = NOW() at time zone 'utc'
    WHERE
        id = ${promptId}
  ;`;
}

export async function POST(req) {

  const { prompt, lng, maxTokens } = await req.json();

  const promptId = await getPromptId(prompt, lng, maxTokens);
  const systemPrompt = await getSystemPrompt(prompt, lng);
  debug(systemPrompt);

  const completionQry = {
    model: process.env.COMPLETION_API_MODEL,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      }
    ],
    temperature: AGENT.temperature,
    top_p: AGENT.topP,
    stream: stream,
    max_tokens: maxTokens,
    // context_length_exceeded_behavior: "truncate",
    // prompt_truncate_len: null,
  };
  debug(completionQry);

  const completionRes = await openai.chat.completions.create(completionQry, {path: process.env.COMPLETION_API_PATH});
  await updatePromptStart(promptId);

  if (stream) {

    const completionStream = OpenAIStream(completionRes, {
      onCompletion: async (completion) => {
        await updatePromptFinish(promptId, completion);
      },
    });
    return new StreamingTextResponse(completionStream);

  } else {

    const completion = completionRes.choices[0].message.content;
    await updatePromptFinish(promptId, completion);
    debug(completion);
    return Response.json({completion: completion});

  }

}
