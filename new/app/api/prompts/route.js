import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function GET(req) {
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
