import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


import runEval from "@/utils/runEval"




export async function GET(req) {
  const prompts =
      await sql`SELECT * FROM prompts ORDER BY id ASC;`;
  
    


    
    // let promptsForGenExpRes = prompts.filter(prompt => (prompt.expected_response === null));
    // // setInterval(() => {
    // if (promptsForGenExpRes.length > 0) {
    //     // genExpRes(promptsForGenExpRes)
    // };
    // // }, 10000);  
    // let promptsForGenRes = prompts.filter(prompt => (prompt.response === null));
    // // setInterval(() => {
    // if (promptsForGenRes.length > 0) {
    //     // genRes(promptsForGenRes)
    // };
    // }, 10000);
  let promptsForEval = prompts.filter(prompt => (prompt.accuracy_score === null));
  if (promptsForEval.length > 0) {
    console.log(promptsForEval)
    runEval(promptsForEval)
  };
  
  
  try {
    const result =
      await sql`SELECT * FROM prompts ORDER BY id ASC;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export async function POST(req, res) {
  const data = await req.json();
  try {
    const result =
      await sql`
      INSERT INTO prompts (lang, prompt, response, expected_response, config_id, parent_id)
        VALUES (${data.lang}, ${data.prompt}, ${data.response}, ${data.expected_response}, ${data.config_id}, ${data.parent_id})
        RETURNING id;
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
