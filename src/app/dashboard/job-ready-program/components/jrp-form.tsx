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
  JobReadyProgramInput,
  JobReadyProgramInputSchema,
} from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createJrpApplication,
  updateJrpApplication,
} from "@/features/actions/job-ready-program/actions";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Customer, JobReadyProgram } from "@prisma/client";

interface JRPProps {
  initialData?: JobReadyProgram & { customer: Customer };
}

export default function JRPFrom({ initialData }: JRPProps) {
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

  const form = useForm<JobReadyProgramInput>({
    resolver: zodResolver(JobReadyProgramInputSchema),
    defaultValues: defaultValue || {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      programType: "",
      startDate: undefined,
      endDate: "",
      stage: "JRPRE",
      workplacement: "",
      employerName: "",
      employerABN: "",
      supervisorName: "",
      supervisorContact: "",
      completionDate: undefined,
      outcomeResult: "PENDING",
    },
  });

  const createMutation = useMutation({
    mutationFn: createJrpApplication,
    onSuccess: ({ success, error }) => {
      queryClient.invalidateQueries({ queryKey: ["visaApplications"] });
      if (success) {
        toast({
          title: "Success",
          description: "Visa application successfully recorded.",
        });
      } else if (!success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Failed to create visa application",
        });
      }
      form.reset();
      router.push("/dashboard/job-ready-program");
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

  const updateMutation = useMutation({
    mutationFn: (params: { id: string; data: Partial<JobReadyProgramInput> }) =>
      updateJrpApplication(params.id, params.data),
    onSuccess: ({ success, error }) => {
      queryClient.invalidateQueries({ queryKey: ["visaApplications"] });
      if (success) {
        toast({
          title: "Success",
          description: "Visa application successfully recorded.",
        });
      } else if (!success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Failed to create visa application",
        });
      }
      form.reset();
      router.push("/dashboard/job-ready-program");
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

  const handleFormSubmit = (data: JobReadyProgramInput) => {
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
        <Link href={"/dashboard/job-ready-program"}>
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
                name="programType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
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
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
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
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Date</FormLabel>
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
                          <SelectValue placeholder="Select visa status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="JRPRE">JRPRE</SelectItem>
                        <SelectItem value="JRE">JRE</SelectItem>
                        <SelectItem value="JRWA">JRWA</SelectItem>
                        <SelectItem value="JRFA">JRFA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workplacement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Placement</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="employerABN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer ABN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supervisorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supervisorContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor Contact</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
