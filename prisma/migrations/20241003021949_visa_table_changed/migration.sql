/*
  Warnings:

  - You are about to drop the column `address` on the `VisaApplication` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `VisaApplication` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `VisaApplication` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `VisaApplication` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `VisaApplication` table. All the data in the column will be lost.
  - You are about to drop the column `passportNumber` on the `VisaApplication` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "VisaApplication_email_key";

-- DropIndex
DROP INDEX "VisaApplication_passportNumber_key";

-- AlterTable
ALTER TABLE "VisaApplication" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "passportNumber";
