"use client";
import { useState, useCallback } from "react";
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
import { VisaApplication, VisaApplicationSchema } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createVisaApplication,
  updateVisaApplication,
} from "@/features/actions/visa-applications/actions";
import Link from "next/link";

interface VisaApplicationFormProps {
  initialData?: VisaApplication;
}

export default function VisaApplicationForm({
  initialData,
}: VisaApplicationFormProps) {
  const [isEditing] = useState(!!initialData);
  const queryClient = useQueryClient();

  const form = useForm<VisaApplication>({
    resolver: zodResolver(VisaApplicationSchema),
    defaultValues: initialData || {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      address: "",
      passportNumber: "",
      visaAppliedDate: new Date(),
      visaStatus: "PENDING",
      previousVisa: undefined,
      visaType: undefined,
      totalAmount: 0,
      totalPaid: 0,
      overseer: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createVisaApplication,
    onSuccess: ({ success }) => {
      queryClient.invalidateQueries({ queryKey: ["visaApplications"] });
      alert(success);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (params: { id: string; data: Partial<VisaApplication> }) =>
      updateVisaApplication(params.id, params.data),
    onSuccess: ({ success }) => {
      queryClient.invalidateQueries({ queryKey: ["visaApplications"] });
      alert(success);
    },
  });

  const handleFormSubmit = useCallback(
    (data: VisaApplication) => {
      if (isEditing && initialData?.id) {
        updateMutation.mutate({ id: initialData.id, data });
      } else {
        createMutation.mutate(data);
      }
    },
    [isEditing, initialData, updateMutation, createMutation],
  );
  return (
    <div className="w-full">
      <CardHeader className="pt-0">
        <Link href={"/dashboard/visa-applications"}>
          <Button variant={"link"} className="self-start px-0 flex gap-2 py-8">
            <ArrowLeft size={"15"} /> Back
          </Button>
        </Link>
        <CardTitle>
          {isEditing ? "Edit Visa Application" : "Create Visa Application"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the details of the visa application."
            : "Fill in the details to create a new visa application."}
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
                      <Input {...field} />
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
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
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visaAppliedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Applied Date</FormLabel>
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
                name="visaStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visa Status</FormLabel>
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
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="APPROVED">APPROVED</SelectItem>
                        <SelectItem value="REJECTED">REJECTED</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previousVisa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Visa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select previous Visa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SUB_500">500</SelectItem>
                        <SelectItem value="SUB_482">482</SelectItem>
                        <SelectItem value="SUB_407">407</SelectItem>
                        <SelectItem value="SUB_186">186</SelectItem>
                        <SelectItem value="SUB_189">189</SelectItem>
                        <SelectItem value="SUB_190">190</SelectItem>
                        <SelectItem value="SUB_600">600</SelectItem>
                        <SelectItem value="SUB_820">820</SelectItem>
                        <SelectItem value="SUB_801">801</SelectItem>
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
                name="visaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Visa</FormLabel>
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
                        <SelectItem value="SUB_500">500</SelectItem>
                        <SelectItem value="SUB_482">482</SelectItem>
                        <SelectItem value="SUB_407">407</SelectItem>
                        <SelectItem value="SUB_186">186</SelectItem>
                        <SelectItem value="SUB_189">189</SelectItem>
                        <SelectItem value="SUB_190">190</SelectItem>
                        <SelectItem value="SUB_600">600</SelectItem>
                        <SelectItem value="SUB_820">820</SelectItem>
                        <SelectItem value="SUB_801">801</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="overseer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overseer</FormLabel>
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
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Paid</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
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
