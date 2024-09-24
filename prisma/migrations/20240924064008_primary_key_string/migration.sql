/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JobReadyProgram` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SkillsAssessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VisaApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "JobReadyProgram" DROP CONSTRAINT "JobReadyProgram_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SkillsAssessment" DROP CONSTRAINT "SkillsAssessment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "VisaApplication" DROP CONSTRAINT "VisaApplication_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customer_id_seq";

-- AlterTable
ALTER TABLE "JobReadyProgram" DROP CONSTRAINT "JobReadyProgram_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "JobReadyProgram_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JobReadyProgram_id_seq";

-- AlterTable
ALTER TABLE "SkillsAssessment" DROP CONSTRAINT "SkillsAssessment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SkillsAssessment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SkillsAssessment_id_seq";

-- AlterTable
ALTER TABLE "VisaApplication" DROP CONSTRAINT "VisaApplication_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "VisaApplication_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "VisaApplication_id_seq";

-- AddForeignKey
ALTER TABLE "VisaApplication" ADD CONSTRAINT "VisaApplication_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobReadyProgram" ADD CONSTRAINT "JobReadyProgram_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsAssessment" ADD CONSTRAINT "SkillsAssessment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
