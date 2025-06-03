/*
  Warnings:

  - Added the required column `date` to the `folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folderAuthorId` to the `folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "folderAuthorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_folderAuthorId_fkey" FOREIGN KEY ("folderAuthorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
