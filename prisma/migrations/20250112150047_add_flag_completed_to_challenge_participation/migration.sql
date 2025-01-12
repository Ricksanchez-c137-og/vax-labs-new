/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `ChallengeParticipation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChallengeParticipation_userId_challengeId_key" ON "ChallengeParticipation"("userId", "challengeId");
