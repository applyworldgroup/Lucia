/*
  Warnings:

  - Added the required column `remarks` to the `SkillsAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rpl` to the `SkillsAssessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SkillsAssessment" ADD COLUMN     "remarks" TEXT NOT NULL,
ADD COLUMN     "rpl" TEXT NOT NULL;
