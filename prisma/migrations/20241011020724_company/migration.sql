-- CreateEnum
CREATE TYPE "SbsStatusEnum" AS ENUM ('APPROVED', 'NOT_APPROVED', 'PENDING');

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "tradingName" VARCHAR(256) NOT NULL,
    "name" VARCHAR(56),
    "director" VARCHAR(56) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "abn" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "website" VARCHAR(256),
    "sbsStatus" "SbsStatusEnum" NOT NULL DEFAULT 'NOT_APPROVED',
    "associatedClients" INTEGER,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_email_key" ON "company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_phone_key" ON "company"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "company_abn_key" ON "company"("abn");
