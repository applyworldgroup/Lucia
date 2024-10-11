/*
  Warnings:

  - A unique constraint covering the columns `[abn]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "tradingName" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "director" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "website" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "company_abn_key" ON "company"("abn");
