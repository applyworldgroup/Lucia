-- CreateEnum
CREATE TYPE "JRPStatus" AS ENUM ('ENROLLED', 'IN_PROGRESS', 'COMPLETED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "SAStatus" AS ENUM ('SUBMITTED', 'UNDER_ASSESSMENT', 'ADDITIONAL_INFO_REQUIRED', 'COMPLETED', 'APPEALED');

-- CreateEnum
CREATE TYPE "SAType" AS ENUM ('SKILLS_ASSESSMENT', 'QUALIFICATION_ASSESSMENT', 'PROVISIONAL_SKILLS_ASSESSMENT');

-- CreateEnum
CREATE TYPE "OverSeer" AS ENUM ('DEEPAK', 'GANESH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VisaType" AS ENUM ('SUB_500', 'SUB_482', 'SUB_407', 'SUB_186', 'SUB_189', 'SUB_190', 'SUB_600', 'SUB_820', 'SUB_801');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "passportNumber" TEXT,
    "currentVisa" "VisaType",
    "visaExpiry" TIMESTAMP(3),
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisaApplication" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "visaAppliedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visaStatus" "Status" NOT NULL,
    "previousVisa" "VisaType" NOT NULL,
    "visaType" "VisaType" NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalPaid" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "overseer" TEXT,
    "customerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisaApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobReadyProgram" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "programType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "JRPStatus" NOT NULL,
    "workplacement" TEXT,
    "employerName" TEXT,
    "employerABN" TEXT,
    "supervisorName" TEXT,
    "supervisorContact" TEXT,
    "completionDate" TIMESTAMP(3),
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobReadyProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillsAssessment" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "occupation" TEXT NOT NULL,
    "assessingAuthority" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "status" "SAStatus" NOT NULL,
    "documentationSubmitted" BOOLEAN NOT NULL,
    "skillsAssessmentType" "SAType" NOT NULL,
    "outcomeReceived" BOOLEAN NOT NULL DEFAULT false,
    "outcomeDate" TIMESTAMP(3),
    "outcomeResult" TEXT,
    "appealSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "appealDate" TIMESTAMP(3),
    "appealOutcome" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillsAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_passportNumber_key" ON "Customer"("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "VisaApplication_email_key" ON "VisaApplication"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VisaApplication_passportNumber_key" ON "VisaApplication"("passportNumber");

-- AddForeignKey
ALTER TABLE "VisaApplication" ADD CONSTRAINT "VisaApplication_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobReadyProgram" ADD CONSTRAINT "JobReadyProgram_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsAssessment" ADD CONSTRAINT "SkillsAssessment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
