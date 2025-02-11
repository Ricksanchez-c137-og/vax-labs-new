-- AlterTable
ALTER TABLE "ChallengeParticipation" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "flag" TEXT;
