/*
  Warnings:

  - Added the required column `group` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team" ADD COLUMN     "group" TEXT NOT NULL;
