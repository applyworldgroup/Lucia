/*
  Warnings:

  - You are about to drop the column `certificateIssued` on the `JobReadyProgram` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `JobReadyProgram` table. All the data in the column will be lost.
  - You are about to drop the column `appealDate` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `appealOutcome` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `appealSubmitted` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `documentationSubmitted` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `outcomeReceived` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `SkillsAssessment` table. All the data in the column will be lost.
  - Added the required column `outcomeResult` to the `JobReadyProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage` to the `JobReadyProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reassesmentOutcome` to the `SkillsAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage` to the `SkillsAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outcomeResult` to the `SkillsAssessment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JRPStage" AS ENUM ('JRPPRE', 'JRE', 'JRWA', 'JRFA');

-- CreateEnum
CREATE TYPE "SAStage" AS ENUM ('STAGE_1', 'STAGE_2', 'INTERVIEW');

-- CreateEnum
CREATE TYPE "OUTCOME" AS ENUM ('SUCCESSFUL', 'UNSUCCESSFUL', 'PENDING');

-- AlterTable
ALTER TABLE "JobReadyProgram" DROP COLUMN "certificateIssued",
DROP COLUMN "status",
ADD COLUMN     "outcomeResult" "OUTCOME" NOT NULL,
ADD COLUMN     "stage" "JRPStage" NOT NULL;

-- AlterTable
ALTER TABLE "SkillsAssessment" DROP COLUMN "appealDate",
DROP COLUMN "appealOutcome",
DROP COLUMN "appealSubmitted",
DROP COLUMN "documentationSubmitted",
DROP COLUMN "outcomeReceived",
DROP COLUMN "status",
ADD COLUMN     "reassesmentDate" TIMESTAMP(3),
ADD COLUMN     "reassesmentOutcome" "OUTCOME" NOT NULL,
ADD COLUMN     "reassesmentSubmitted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stage" "SAStage" NOT NULL,
DROP COLUMN "outcomeResult",
ADD COLUMN     "outcomeResult" "OUTCOME" NOT NULL;
