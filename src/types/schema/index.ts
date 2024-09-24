import * as z from "zod";

const VisaTypeEnum = z.enum([
  "SUB_500",
  "SUB_482",
  "SUB_407",
  "SUB_186",
  "SUB_189",
  "SUB_190",
  "SUB_600",
  "SUB_820",
  "SUB_801",
]);

export const visaSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "Name is required"),
  middleName: z.string().min(1, "Name is required").optional(),
  lastName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  visaAppliedDate: z.date(),
  visaStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  previousVisa: VisaTypeEnum,
  visaType: VisaTypeEnum,
  totalAmount: z.number().min(0, "Total amount must be non-negative"),
  totalPaid: z.number().min(0, "Total paid must be non-negative"),
  overseer: z.string().min(1, "Overseer is required"),
});
export const customerSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "Name is required"),
  middleName: z.string().min(1, "Name is required").optional(),
  lastName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  passportNumber: z.string().optional(),
  currentVisa: VisaTypeEnum.optional(),
  visaExpiry: z.date().optional(),
  phone: z.string().min(1, "Phone number is required"),
});

export type VisaApplication = z.infer<typeof visaSchema>;
export type Customer = z.infer<typeof customerSchema>;
