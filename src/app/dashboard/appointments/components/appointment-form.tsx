"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,3}?[\s\-\.]?\(?\d{1,4}\)?[\s\-\.]?\d{1,4}[\s\-\.]?\d{1,9}$/,
      {
        message: "Phone number must be 10 digits.",
      },
    ),
  status: z.enum(["CONFIRMED", "CANCELLED"]),
  appointmentDate: z.date({
    required_error: "Please select a date.",
  }),
  appointmentTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  reasonOfVisit: z.string().max(500, "Max word limit reached"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AppointmentSchema = formSchema;
export const AppointmentInputSchema = formSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

type AppointmentFormValues = z.infer<typeof AppointmentInputSchema>;

interface AppointmentFormProps {
  appointment?: Partial<AppointmentFormValues>;
  onSubmit: (data: AppointmentFormValues) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function AppointmentForm({
  appointment,
  onSubmit,
  onCancel,
  isLoading,
}: AppointmentFormProps) {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(AppointmentInputSchema),
    defaultValues: appointment || {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      status: "CONFIRMED",
      appointmentDate: new Date(),
      appointmentTime: "",
      reasonOfVisit: "",
    },
  });

  async function onFormSubmit(data: AppointmentFormValues) {
    onSubmit(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-6 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
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
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
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
                        date < new Date(new Date().setHours(0, 0, 0, 0))
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
            name="appointmentTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Slot</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="10:00">10:00 AM </SelectItem>
                    <SelectItem value="10:15">10:15 AM </SelectItem>
                    <SelectItem value="10:30">10:30 AM </SelectItem>
                    <SelectItem value="10:45">10:45 AM </SelectItem>
                    <SelectItem value="11:00">11:00 AM </SelectItem>
                    <SelectItem value="11:15">11:15 AM </SelectItem>
                    <SelectItem value="11:30">11:30 AM </SelectItem>
                    <SelectItem value="11:45">11:45 AM </SelectItem>
                    <SelectItem value="12:00">12:00 PM </SelectItem>
                    <SelectItem value="12:15">12:15 PM </SelectItem>
                    <SelectItem value="12:30">12:30 PM </SelectItem>
                    <SelectItem value="12:45">12:45 PM </SelectItem>
                    <SelectItem value="13:00">1:00 PM </SelectItem>
                    <SelectItem value="13:15">1:15 PM </SelectItem>
                    <SelectItem value="13:30">1:30 PM </SelectItem>
                    <SelectItem value="13:45">1:45 PM </SelectItem>
                    <SelectItem value="14:00">2:00 PM </SelectItem>
                    <SelectItem value="14:15">2:15 PM </SelectItem>
                    <SelectItem value="14:30">2:30 PM </SelectItem>
                    <SelectItem value="14:45">2:45 PM </SelectItem>
                    <SelectItem value="15:00">3:00 PM </SelectItem>
                    <SelectItem value="15:15">3:15 PM </SelectItem>
                    <SelectItem value="15:30">3:30 PM </SelectItem>
                    <SelectItem value="15:45">3:45 PM </SelectItem>
                    <SelectItem value="16:00">4:00 PM </SelectItem>
                    <SelectItem value="16:15">4:15 PM </SelectItem>
                    <SelectItem value="16:30">4:30 PM </SelectItem>
                    <SelectItem value="16:45">4:45 PM </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reasonOfVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason of Visit</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="eg: consultation, 407 enquiry, 482 enquiry, etc."
                    className="resize-none"
                    {...field}
                    value={appointment?.reasonOfVisit ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Submit Appointment
          </Button>
        </div>
      </form>
    </Form>
  );
}
