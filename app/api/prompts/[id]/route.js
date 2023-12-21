import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
  try {
    const result =
      await sql`SELECT * FROM prompts WHERE id=${params.id};`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const result =
      await sql`DELETE FROM prompts WHERE id=${params.id};`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
