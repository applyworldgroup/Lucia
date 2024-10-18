-- DropIndex
DROP INDEX "company_abn_key";

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "abn" SET DATA TYPE TEXT;
