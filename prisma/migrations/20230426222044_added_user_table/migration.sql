/*
  Warnings:

  - You are about to drop the column `availableSlots` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "availableSlots";

-- CreateTable
CREATE TABLE "User" (
    "clerkId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("clerkId")
);

-- CreateTable
CREATE TABLE "TrainingsOnUsers" (
    "userId" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,

    CONSTRAINT "TrainingsOnUsers_pkey" PRIMARY KEY ("userId","trainingId")
);

-- AddForeignKey
ALTER TABLE "TrainingsOnUsers" ADD CONSTRAINT "TrainingsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingsOnUsers" ADD CONSTRAINT "TrainingsOnUsers_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
