-- CreateTable
CREATE TABLE "general_enquiry" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "purpose_of_enquiry" TEXT NOT NULL,
    "follow_up_dates" DATE[] DEFAULT ARRAY[]::DATE[],
    "remarks" VARCHAR(500),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followed_up_by" VARCHAR(255),

    CONSTRAINT "general_enquiry_pkey" PRIMARY KEY ("id")
);
