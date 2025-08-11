import { prisma } from "@repo/database/client";

export default async function Home() {
  const users = await prisma.user.findMany({});

  return (
    <div>
      {JSON.stringify(users)}
    </div>
  )
}