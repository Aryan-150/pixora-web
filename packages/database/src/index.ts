import { PrismaClient } from "./generated/prisma";

const PrismaClientSingleton = () => {
  return new PrismaClient();
}

declare global {
  var prisma: undefined | ReturnType<typeof PrismaClientSingleton>
}

const prisma = globalThis.prisma ?? PrismaClientSingleton();

export { prisma };
export * from "./generated/prisma";