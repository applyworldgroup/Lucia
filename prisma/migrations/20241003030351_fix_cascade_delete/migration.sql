-- DropForeignKey
ALTER TABLE "VisaApplication" DROP CONSTRAINT "VisaApplication_customerId_fkey";

-- AddForeignKey
ALTER TABLE "VisaApplication" ADD CONSTRAINT "VisaApplication_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
