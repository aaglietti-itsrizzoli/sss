import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export default async function Profile(): Promise<JSX.Element> {
  const cookieStore = cookies()
  const hasCookie = cookieStore.has('uuid')
  let isValidUidCookie = false;
  let uuid = "";
  let uuidCreatedAt = "";

  if (hasCookie) {
    uuid = cookieStore.get('uuid')?.value || ""
    const { rows } = await sql`SELECT * from profiles WHERE id = ${uuid} LIMIT 1`
    if (rows.length) {
      isValidUidCookie = true
      uuidCreatedAt = rows[0].created_at.toString()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Profile page
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          {hasCookie ? (<p>Il tuo uuid è {uuid}</p>) : <p>Non hai uno uuid</p>}
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          {isValidUidCookie ? (<p>Il tuo uuid è valido a partire da {uuidCreatedAt}</p>) : (<p>Il tuo uuid NON è valido</p>)}
        </div>
      </div>
    </main>
  );
}
