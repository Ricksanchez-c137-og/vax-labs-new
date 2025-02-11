/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeRealId]` on the table `ChallengeParticipation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ChallengeParticipation" DROP CONSTRAINT "ChallengeParticipation_challengeId_fkey";

-- DropIndex
DROP INDEX "ChallengeParticipation_userId_challengeId_key";

-- AlterTable
ALTER TABLE "ChallengeParticipation" ADD COLUMN     "challengeRealId" TEXT NOT NULL DEFAULT 'default_value';

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "courseRealId" TEXT NOT NULL DEFAULT 'default_value';

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeParticipation_userId_challengeRealId_key" ON "ChallengeParticipation"("userId", "challengeRealId");

-- AddForeignKey
ALTER TABLE "ChallengeParticipation" ADD CONSTRAINT "ChallengeParticipation_challengeRealId_fkey" FOREIGN KEY ("challengeRealId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
