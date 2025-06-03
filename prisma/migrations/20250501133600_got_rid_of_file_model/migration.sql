/*
  Warnings:

  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_fileAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_folderId_fkey";

-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "parentFolderId" INTEGER;

-- DropTable
DROP TABLE "file";

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
