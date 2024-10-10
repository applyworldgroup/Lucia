/*
  Warnings:

  - The values [JRPPRE] on the enum `JRPStage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JRPStage_new" AS ENUM ('JRPRE', 'JRE', 'JRWA', 'JRFA');
ALTER TABLE "JobReadyProgram" ALTER COLUMN "stage" TYPE "JRPStage_new" USING ("stage"::text::"JRPStage_new");
ALTER TYPE "JRPStage" RENAME TO "JRPStage_old";
ALTER TYPE "JRPStage_new" RENAME TO "JRPStage";
DROP TYPE "JRPStage_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "JobReadyProgram" DROP CONSTRAINT "JobReadyProgram_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SkillsAssessment" DROP CONSTRAINT "SkillsAssessment_customerId_fkey";

-- AddForeignKey
ALTER TABLE "JobReadyProgram" ADD CONSTRAINT "JobReadyProgram_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsAssessment" ADD CONSTRAINT "SkillsAssessment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
