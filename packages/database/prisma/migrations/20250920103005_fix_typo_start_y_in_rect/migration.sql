/*
  Warnings:

  - You are about to drop the column `stratY` on the `Rect` table. All the data in the column will be lost.
  - Added the required column `startY` to the `Rect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Rect" DROP COLUMN "stratY",
ADD COLUMN     "startY" DOUBLE PRECISION NOT NULL;
