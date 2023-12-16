import { sql } from "@vercel/postgres";


const prompts = async () => {
    const getPrompts =
        await sql`
          SELECT *
          FROM prompts
          ORDER BY id ASC;
        `;

  }

export default prompts;
