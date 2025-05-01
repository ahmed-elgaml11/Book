-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('arabic', 'english', 'french');

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "language" "Lang" NOT NULL DEFAULT 'arabic',

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
