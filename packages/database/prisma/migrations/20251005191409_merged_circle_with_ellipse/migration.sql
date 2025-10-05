/*
  Warnings:

  - The values [circle] on the enum `StrokeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Circle` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StrokeType_new" AS ENUM ('rect', 'line', 'ellipse', 'arrow');
ALTER TABLE "public"."Stroke" ALTER COLUMN "type" TYPE "public"."StrokeType_new" USING ("type"::text::"public"."StrokeType_new");
ALTER TYPE "public"."StrokeType" RENAME TO "StrokeType_old";
ALTER TYPE "public"."StrokeType_new" RENAME TO "StrokeType";
DROP TYPE "public"."StrokeType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Circle" DROP CONSTRAINT "Circle_strokeId_fkey";

-- DropTable
DROP TABLE "public"."Circle";
