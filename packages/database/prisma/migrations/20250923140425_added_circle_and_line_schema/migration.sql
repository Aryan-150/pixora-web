-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."StrokeType" ADD VALUE 'circle';
ALTER TYPE "public"."StrokeType" ADD VALUE 'line';

-- DropForeignKey
ALTER TABLE "public"."Rect" DROP CONSTRAINT "Rect_strokeId_fkey";

-- CreateTable
CREATE TABLE "public"."Circle" (
    "id" TEXT NOT NULL,
    "centerX" DOUBLE PRECISION NOT NULL,
    "centerY" DOUBLE PRECISION NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "strokeId" TEXT NOT NULL,

    CONSTRAINT "Circle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Line" (
    "id" TEXT NOT NULL,
    "startX" DOUBLE PRECISION NOT NULL,
    "startY" DOUBLE PRECISION NOT NULL,
    "endX" DOUBLE PRECISION NOT NULL,
    "endY" DOUBLE PRECISION NOT NULL,
    "strokeId" TEXT NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Circle_strokeId_key" ON "public"."Circle"("strokeId");

-- CreateIndex
CREATE UNIQUE INDEX "Line_strokeId_key" ON "public"."Line"("strokeId");

-- AddForeignKey
ALTER TABLE "public"."Rect" ADD CONSTRAINT "Rect_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "public"."Stroke"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Circle" ADD CONSTRAINT "Circle_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "public"."Stroke"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Line" ADD CONSTRAINT "Line_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "public"."Stroke"("id") ON DELETE CASCADE ON UPDATE CASCADE;
