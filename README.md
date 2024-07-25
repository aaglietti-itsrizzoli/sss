# Seek Set Send

Demo: https://sss-nine-swart.vercel.app/

## video download & frames extraction

Run `./aws-mechanical-turk/do-it.sh` and follow the instructions.

At the end a new `/public/pics/frames/<seekId>.json` is generated with ref to all of his frames.

You'll be able to open that game at `https://sss-nine-swart.vercel.app/games/550e8400-e29b-41d4-a716-446655440000/seek/<seekId>`

## Vercel tips&tricks

Enable Git LFS https://vercel.com/docs/projects/overview#git-large-file-storage-lfs

After forking create a Postgres inside Vercel and add all the Codespace repository secrets as follow

```
POSTGRES_URL
POSTGRES_URL_NON_POOLING
POSTGRES_PRISMA_URL
POSTGRES_URL_NO_SSL
```

## Database DDL

Inside the `ddl` folder we have the .sql file that need to be executed to create all the required tables.
