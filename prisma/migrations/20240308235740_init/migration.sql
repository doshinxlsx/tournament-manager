/*
  Warnings:

  - Added the required column `slug_1` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug_2` to the `match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "match" ADD COLUMN     "slug_1" TEXT NOT NULL,
ADD COLUMN     "slug_2" TEXT NOT NULL;
