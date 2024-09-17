/*
  Warnings:

  - You are about to drop the column `expiryDate` on the `ResetToken` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `ResetToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `ResetToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `ResetToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `ResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ResetToken_token_key";

-- AlterTable
ALTER TABLE "ResetToken" DROP COLUMN "expiryDate",
DROP COLUMN "token",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_code_key" ON "ResetToken"("code");
