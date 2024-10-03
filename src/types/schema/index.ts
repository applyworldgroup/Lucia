import { z } from "zod";

// Customer schema
const CustomerBaseSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().nullable().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  passportNumber: z.string().nullable().optional(),
  currentVisa: z
    .enum([
      "SUB_500",
      "SUB_482",
      "SUB_407",
      "SUB_186",
      "SUB_189",
      "SUB_190",
      "SUB_600",
      "SUB_820",
      "SUB_801",
    ])
    .nullable()
    .optional(),
  visaExpiry: z.date().nullable().optional(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CustomerSchema = CustomerBaseSchema;
export const CustomerInputSchema = CustomerBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// VisaApplication schema
const VisaApplicationBaseSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().nullable().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  passportNumber: z
    .string()
    .min(1, { message: "Passport number is required" })
    .nullable(),
  visaAppliedDate: z.date(),
  visaStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  visaType: z.enum([
    "SUB_500",
    "SUB_482",
    "SUB_407",
    "SUB_186",
    "SUB_189",
    "SUB_190",
    "SUB_600",
    "SUB_820",
    "SUB_801",
  ]),
  totalAmount: z
    .number()
    .nonnegative({ message: "Total amount must be non-negative" }),
  totalPaid: z
    .number()
    .nonnegative({ message: "Total paid must be non-negative" }),
  overseer: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const VisaApplicationSchema = VisaApplicationBaseSchema;
export const VisaApplicationInputSchema = VisaApplicationBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// JobReadyProgram schema
const JobReadyProgramBaseSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  programType: z.string().min(1, { message: "Program type is required" }),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["ENROLLED", "IN_PROGRESS", "COMPLETED", "WITHDRAWN"]),
  workplacement: z.string().optional(),
  employerName: z.string().optional(),
  employerABN: z.string().optional(),
  supervisorName: z.string().optional(),
  supervisorContact: z.string().optional(),
  completionDate: z.date().optional(),
  certificateIssued: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const JobReadyProgramSchema = JobReadyProgramBaseSchema;
export const JobReadyProgramInputSchema = JobReadyProgramBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// SkillsAssessment schema
const SkillsAssessmentBaseSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  assessingAuthority: z
    .string()
    .min(1, { message: "Assessing authority is required" }),
  applicationDate: z.date(),
  status: z.enum([
    "SUBMITTED",
    "UNDER_ASSESSMENT",
    "ADDITIONAL_INFO_REQUIRED",
    "COMPLETED",
    "APPEALED",
  ]),
  documentationSubmitted: z.boolean(),
  skillsAssessmentType: z.enum([
    "SKILLS_ASSESSMENT",
    "QUALIFICATION_ASSESSMENT",
    "PROVISIONAL_SKILLS_ASSESSMENT",
  ]),
  outcomeReceived: z.boolean(),
  outcomeDate: z.date().optional(),
  outcomeResult: z.string().optional(),
  appealSubmitted: z.boolean(),
  appealDate: z.date().optional(),
  appealOutcome: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SkillsAssessmentSchema = SkillsAssessmentBaseSchema;
export const SkillsAssessmentInputSchema = SkillsAssessmentBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerInput = z.infer<typeof CustomerInputSchema>;
export type VisaApplication = z.infer<typeof VisaApplicationSchema>;
export type VisaApplicationInput = z.infer<typeof VisaApplicationInputSchema>;
export type JobReadyProgram = z.infer<typeof JobReadyProgramSchema>;
export type JobReadyProgramInput = z.infer<typeof JobReadyProgramInputSchema>;
export type SkillsAssessment = z.infer<typeof SkillsAssessmentSchema>;
export type SkillsAssessmentInput = z.infer<typeof SkillsAssessmentInputSchema>;
