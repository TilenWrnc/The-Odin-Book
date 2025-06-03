/*
  Warnings:

  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Folder";

-- CreateTable
CREATE TABLE "folder" (
    "id" SERIAL NOT NULL,
    "folder_name" TEXT NOT NULL,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);
