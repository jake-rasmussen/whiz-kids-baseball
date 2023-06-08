-- DropForeignKey
ALTER TABLE "TrainingsOnUsers" DROP CONSTRAINT "TrainingsOnUsers_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingsOnUsers" DROP CONSTRAINT "TrainingsOnUsers_userId_fkey";

-- AddForeignKey
ALTER TABLE "TrainingsOnUsers" ADD CONSTRAINT "TrainingsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingsOnUsers" ADD CONSTRAINT "TrainingsOnUsers_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
