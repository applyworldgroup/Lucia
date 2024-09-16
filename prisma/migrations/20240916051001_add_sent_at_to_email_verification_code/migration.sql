/*
  Warnings:

  - Added the required column `sentAt` to the `EmailVerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerificationCode" ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL;
