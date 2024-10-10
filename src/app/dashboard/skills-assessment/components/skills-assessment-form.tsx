"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SkillsAssessmentInput,
  SkillsAssessmentInputSchema,
} from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSkillsAssessment,
  updateSkillsAssessment,
} from "@/features/actions/skills-assessment/actions";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Customer, SkillsAssessment } from "@prisma/client";

interface SkillsAssessmentProps {
  initialData?: SkillsAssessment & { customer: Customer };
}

export default function SkillsAssessmentForm({
  initialData,
}: SkillsAssessmentProps) {
  const router = useRouter();
  const [isEditing] = useState(!!initialData);
  const queryClient = useQueryClient();

  let defaultValue;
  if (initialData) {
    defaultValue = {
      ...initialData,
      firstName: initialData?.customer?.firstName,
      middleName: initialData?.customer?.middleName,
      lastName: initialData?.customer?.lastName,
      email: initialData?.customer?.email,
    };
  }

  const form = useForm<SkillsAssessmentInput>({
    resolver: zodResolver(SkillsAssessmentInputSchema),
    defaultValues: defaultValue || {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      occupation: "",
      assessingAuthority: "",
      applicationDate: "",
      stage: "STAGE_1",
      outcomeDate: undefined,
      outcomeResult: "PENDING",
    },
  });

  const createMutation = useMutation({
    mutationFn: createSkillsAssessment,
    onSuccess: ({ success, error }) => {
      queryClient.invalidateQueries({ queryKey: ["skills-assessment"] });
      if (success) {
        toast({
          title: "Success",
          description: "Skills Assessment application successfully recorded.",
        });
      } else if (!success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Failed to create skils assessment application",
        });
      }
      form.reset();
      router.push("/dashboard/skills-assessment");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Unknown error occoured",
      });
      form.reset();
      router.push("/dashboard/skills-assessment");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (params: {
      id: string;
      data: Partial<SkillsAssessmentInput>;
    }) => updateSkillsAssessment(params.id, params.data),
    onSuccess: ({ success, error }) => {
      queryClient.invalidateQueries({ queryKey: ["visaApplications"] });
      if (success) {
        toast({
          title: "Success",
          description: "Skills Assessment application successfully recorded.",
        });
      } else if (!success) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error || "Failed to create Skills Assessment application",
        });
      }
      form.reset();
      router.push("/dashboard/skills-assessment");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Unknown error occoured",
      });
      form.reset();
      router.push("/dashboard/job-ready-program");
    },
  });

  const handleFormSubmit = (data: SkillsAssessmentInput) => {
    console.log("Form Submitted", data);
    form.reset();
    if (isEditing && initialData?.id) {
      updateMutation.mutate({ id: initialData.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="w-full">
      <CardHeader className="pt-0">
        <Link href={"/dashboard/skills-assessment"}>
          <Button variant={"link"} className="self-start px-0 flex gap-2 py-8">
            <ArrowLeft size={"15"} /> Back
          </Button>
        </Link>
        <CardTitle>
          {isEditing ? "Edit JRP Application" : "Create JRP Application"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the details of the JRP application."
            : "Fill in the details to create a new JRP application."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? undefined} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assessingAuthority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assessing Authority</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="STAGE_1">STAGE_1</SelectItem>
                        <SelectItem value="STAGE_2">STAGE_2</SelectItem>
                        <SelectItem value="INTERVIEW">INTERVIEW</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="applicationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="outcomeDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outcome Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="outcomeResult"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outcome Result</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select current Visa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SUCCESSFUL">SUCCESSFUL</SelectItem>
                        <SelectItem value="UNSUCCESSFUL">
                          UNSUCCESSFUL
                        </SelectItem>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full py-2">
              {isEditing ? "Update Application" : "Create Application"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
