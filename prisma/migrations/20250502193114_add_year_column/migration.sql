/*
  Warnings:

  - Made the column `year` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
UPDATE "Book" SET "year" = 2000; 
ALTER TABLE "Book" ALTER COLUMN "year" SET NOT NULL;
