/*
  Warnings:

  - You are about to drop the `_PendingFriends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PendingFriends" DROP CONSTRAINT "_PendingFriends_A_fkey";

-- DropForeignKey
ALTER TABLE "_PendingFriends" DROP CONSTRAINT "_PendingFriends_B_fkey";

-- DropTable
DROP TABLE "_PendingFriends";
