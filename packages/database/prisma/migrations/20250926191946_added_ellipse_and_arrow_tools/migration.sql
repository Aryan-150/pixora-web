-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."StrokeType" ADD VALUE 'ellipse';
ALTER TYPE "public"."StrokeType" ADD VALUE 'rightArrow';

-- CreateTable
CREATE TABLE "public"."Ellipse" (
    "id" TEXT NOT NULL,
    "centerX" DOUBLE PRECISION NOT NULL,
    "centerY" DOUBLE PRECISION NOT NULL,
    "radiusX" DOUBLE PRECISION NOT NULL,
    "radiusY" DOUBLE PRECISION NOT NULL,
    "strokeId" TEXT NOT NULL,

    CONSTRAINT "Ellipse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RightArrow" (
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

    CONSTRAINT "RightArrow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ellipse_strokeId_key" ON "public"."Ellipse"("strokeId");

-- CreateIndex
CREATE UNIQUE INDEX "RightArrow_strokeId_key" ON "public"."RightArrow"("strokeId");

-- AddForeignKey
ALTER TABLE "public"."Ellipse" ADD CONSTRAINT "Ellipse_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "public"."Stroke"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RightArrow" ADD CONSTRAINT "RightArrow_strokeId_fkey" FOREIGN KEY ("strokeId") REFERENCES "public"."Stroke"("id") ON DELETE CASCADE ON UPDATE CASCADE;
