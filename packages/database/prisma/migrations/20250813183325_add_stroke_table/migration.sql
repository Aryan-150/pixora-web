-- CreateEnum
CREATE TYPE "public"."Color" AS ENUM ('red', 'green', 'blue', 'white', 'black');

-- CreateTable
CREATE TABLE "public"."Stroke" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "color" "public"."Color",
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Stroke_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Stroke" ADD CONSTRAINT "Stroke_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stroke" ADD CONSTRAINT "Stroke_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
