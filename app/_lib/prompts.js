import { sql } from '@vercel/postgres';


console.log("POSTGRES_URL:", `${process.env.POSTGRES_URL}`)

export const getPrompts = sql`SELECT * FROM prompts ORDER BY id ASC`;


