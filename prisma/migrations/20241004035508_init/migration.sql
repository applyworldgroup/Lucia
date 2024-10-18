/*
  Warnings:

  - Made the column `email` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "email" SET NOT NULL;
