/*
  Warnings:

  - Made the column `reasonOfVisit` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "reasonOfVisit" SET NOT NULL;
