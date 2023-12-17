// import { sql } from "@vercel/postgres";


// console.log("POSTGRES_URL:", `${process.env.POSTGRES_URL}`)

// export const getPrompts = sql`SELECT * FROM prompts ORDER BY id ASC`;




// export const getPrompts = async () => {
//   const result = await sql`
//     SELECT *
//     FROM prompts
//     ORDER BY id ASC;
//   `;

//   const {rows} = await sql`
//     SELECT *
//     FROM prompts
//     ORDER BY id ASC;
//   `;

//   return rows  
//     }


import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const client = await db.connect();
  let result;

  try {
    result = await client.sql`SELECT * FROM prompts;`;
    console.log(result)
  } catch (error) {
    return NextResponse.json({ error });
  }
 
  return NextResponse.json({ data: result });
}



// https://blog.coffeeinc.in/getting-started-with-vercel-postgres-and-next-js-13-bcb4715f3899