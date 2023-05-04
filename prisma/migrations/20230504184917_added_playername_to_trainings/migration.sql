/*
  Warnings:

  - Added the required column `playerName` to the `TrainingsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingsOnUsers" ADD COLUMN     "playerName" TEXT NOT NULL;
