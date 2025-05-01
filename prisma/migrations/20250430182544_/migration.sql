/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "book";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pages" INTEGER,
    "language" "Lang" NOT NULL DEFAULT 'arabic',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
