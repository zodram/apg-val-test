const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.COMPLETION_API_TOKEN,
    baseURL: process.env.COMPLETION_API_BASE,
  });


async function genAccuracyScore(expRes, response) {
    const accuracyQry = {
        model: process.env.COMPLETION_API_MODEL,
        messages: [
            {
            role: "assistant",
            content: `You are a teacher grading a quiz from 0 to 100. You are given the student's answer - ${response}, and the true answer - ${expRes}, and are asked to score the student answer as either CORRECT or INCORRECT.
            Example Format:
                Accuracy Score: 0-100 here
                Reason: Explain in brief for the score given
                Grade the student answers based ONLY on their factual accuracy. Ignore differences in punctuation and phrasing between the student answer and true answer. It is OK if the student answer contains more information than the true answer, as long as it does not contain any conflicting statements.
            `
            }
        ],
        temperature: 0,
        };
    const accuracy = await openai.chat.completions.create(accuracyQry);
    console.log("accuracy:", accuracy.choices[0].message.content)
    return accuracy.choices[0].message.content
}



async function genSympathyScore(response) {
    console.log("response:", response)
    const sympathyQry = {
        model: process.env.COMPLETION_API_MODEL,
        messages: [
          {
            role: "assistant",
            content: `Please grade the statement - ${response} from 0 to 100 for whether it expresses sympathy to its reader
            Example Format:
              Sympathy Score: 0-100 here
              Reason: Explain in brief for the score given
            `
          }
        ],
        temperature: 0,
      };
    const sympathy = await openai.chat.completions.create(sympathyQry);
    console.log("sympathy:", sympathy.choices[0].message.content)
    return sympathy.choices[0].message.content
}


module.exports = {
    genAccuracyScore,
    genSympathyScore
}
