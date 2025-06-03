-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_parentFolderId_fkey";

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
