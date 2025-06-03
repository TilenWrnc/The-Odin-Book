-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "currentUser" INTEGER NOT NULL,
    "recievingUser" INTEGER NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatMessage" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chatMessage" ADD CONSTRAINT "chatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
