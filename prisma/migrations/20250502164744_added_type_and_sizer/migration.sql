/*
  Warnings:

  - Added the required column `type` to the `folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "size" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;
