import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sql } from "@vercel/postgres";
 
export async function middleware(request: NextRequest) {
  const hasCookie = request.cookies.has('uuid')

  const response = NextResponse.next()
  if (!hasCookie) {
    const { rows } = await sql`INSERT INTO profiles (id) VALUES (gen_random_uuid()) RETURNING id;`;
    response.cookies.set({
        name: 'uuid',
        value: rows[0].id,
        path: '/',
      })
  }

  return response
}
