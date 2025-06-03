-- CreateTable
CREATE TABLE "file" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fileAuthorId" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_fileAuthorId_fkey" FOREIGN KEY ("fileAuthorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
