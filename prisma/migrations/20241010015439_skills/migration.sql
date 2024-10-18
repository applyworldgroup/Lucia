/*
  Warnings:

  - You are about to drop the column `reassesmentDate` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `reassesmentOutcome` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `reassesmentSubmitted` on the `SkillsAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `skillsAssessmentType` on the `SkillsAssessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SkillsAssessment" DROP COLUMN "reassesmentDate",
DROP COLUMN "reassesmentOutcome",
DROP COLUMN "reassesmentSubmitted",
DROP COLUMN "skillsAssessmentType";

-- DropEnum
DROP TYPE "SAType";
