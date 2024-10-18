/*
  Warnings:

  - Made the column `overseer` on table `VisaApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VisaApplication" ALTER COLUMN "overseer" SET NOT NULL;
