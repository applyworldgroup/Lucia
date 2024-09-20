import * as z from "zod";

export const visaSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    passportNumber: z.string().min(1, "Passport number is required"),
    visaAppliedDate: z.date(),
    visaStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    previousVisa: z.enum([
        "SUB_500",
        "SUB_482",
        "SUB_407",
        "SUB_186",
        "SUB_189",
        "SUB_190",
        "SUB_600",
        "SUB_820",
        "SUB_801"
    ]),
    visaType: z.enum([
        "SUB_500",
        "SUB_482",
        "SUB_407",
        "SUB_186",
        "SUB_189",
        "SUB_190",
        "SUB_600",
        "SUB_820",
        "SUB_801"
    ]),
    totalAmount: z.number().min(0, "Total amount must be non-negative"),
    totalPaid: z.number().min(0, "Total paid must be non-negative"),
    overseer: z.string().min(1, "Overseer is required"),
});

export type VisaApplication = z.infer<typeof visaSchema>;