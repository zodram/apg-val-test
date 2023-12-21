import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function GET(req) {
  try {
    const result =
      await sql`SELECT * FROM configs ORDER BY id ASC;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
