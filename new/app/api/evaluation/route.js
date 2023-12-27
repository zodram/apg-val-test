import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';


export async function GET(req) {
  try {
    const result =
      await sql`SELECT * FROM testcases ORDER BY id ASC;`;
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
