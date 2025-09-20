/*
  Warnings:

  - You are about to drop the column `message` on the `Stroke` table. All the data in the column will be lost.
  - Added the required column `type` to the `Stroke` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StrokeType" AS ENUM ('rect');

-- AlterTable
ALTER TABLE "public"."Stroke" DROP COLUMN "message",
ADD COLUMN     "type" "public"."StrokeType" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Rect" (
    "id" TEXT NOT NULL,
    "startX" DOUBLE PRECISION NOT NULL,
    "stratY" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "strokeId" TEXT NOT NULL,

    CONSTRAINT "Rect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rect_strokeId_key" ON "public"."Rect"("strokeId");

-- AddForeignKey
ALTER TABLE "public"."Rect" ADD CONSTRAINT "Rect_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "public"."Stroke"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
