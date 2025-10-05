/*
  Warnings:

  - The values [rightArrow] on the enum `StrokeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `RightArrow` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StrokeType_new" AS ENUM ('rect', 'line', 'circle', 'ellipse', 'arrow');
ALTER TABLE "public"."Stroke" ALTER COLUMN "type" TYPE "public"."StrokeType_new" USING ("type"::text::"public"."StrokeType_new");
ALTER TYPE "public"."StrokeType" RENAME TO "StrokeType_old";
ALTER TYPE "public"."StrokeType_new" RENAME TO "StrokeType";
DROP TYPE "public"."StrokeType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."RightArrow" DROP CONSTRAINT "RightArrow_strokeId_fkey";

-- DropTable
DROP TABLE "public"."RightArrow";

-- CreateTable
CREATE TABLE "public"."Arrow" (
    "id" TEXT NOT NULL,
    "startX" DOUBLE PRECISION NOT NULL,
    "startY" DOUBLE PRECISION NOT NULL,
    "endX" DOUBLE PRECISION NOT NULL,
    "endY" DOUBLE PRECISION NOT NULL,
    "dx" DOUBLE PRECISION NOT NULL,
    "dy" DOUBLE PRECISION NOT NULL,
    "headlen" DOUBLE PRECISION NOT NULL,
    "angle" DOUBLE PRECISION NOT NULL,
    "strokeId" TEXT NOT NULL,

    CONSTRAINT "Arrow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Arrow_strokeId_key" ON "public"."Arrow"("strokeId");

-- AddForeignKey
ALTER TABLE "public"."Arrow" ADD CONSTRAINT "Arrow_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "public"."Stroke"("id") ON DELETE CASCADE ON UPDATE CASCADE;
