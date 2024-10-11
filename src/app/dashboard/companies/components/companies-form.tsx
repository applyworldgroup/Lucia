"use client";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CompanyInputSchema } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Company } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  createCompany,
  updateCompany,
} from "@/features/actions/company/actions";

interface CompanyFormProps {
  initialData?: Company;
}

export default function CompanyForm({ initialData }: CompanyFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing] = useState(!!initialData);
  const queryClient = useQueryClient();

  const form = useForm<Company>({
    resolver: zodResolver(CompanyInputSchema),
    defaultValues: initialData || {
      name: "",
      tradingName: "",
      director: "",
      phone: "",
      abn: "",
      address: "",
      website: "",
      sbsStatus: "NOT_APPROVED",
      associatedClients: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
      toast({
        variant: "default",
        title: `Registered`,
        description: "Company Registered successfully",
      });
      form.reset();
      router.push("/dashboard/companies");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Registration`,
        description: `${error.message}`,
      });
      form.reset();
      router.push("/dashboard/companies");
    },
  });

  const { isPending } = createMutation;

  const updateMutation = useMutation({
    mutationFn: (params: { id: string; data: Partial<Company> }) =>
      updateCompany(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        variant: "default",
        title: `Updated`,
        description: "Customer Updated successfully",
      });
      form.reset();
      router.push("/dashboard/companies");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Registration`,
        description: `${error.message}`,
      });
      form.reset();
      router.push("/dashboard/companies");
    },
  });

  const handleFormSubmit = useCallback(
    (data: Company) => {
      console.log(data);
      try {
        if (isEditing && initialData?.id) {
          updateMutation.mutate({ id: initialData.id, data: data });
        } else {
          createMutation.mutate(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          return {
            error: error.message,
          };
        } else {
          return {
            error: "An unknown error occurred",
          };
        }
      }
    },
    [isEditing, initialData, updateMutation, createMutation],
  );
  return (
    <div className="w-full">
      <CardHeader className="pt-0">
        <Link href={"/dashboard/companies"}>
          <Button variant={"link"} className="self-start px-0 flex gap-2 py-8">
            <ArrowLeft size={"15"} /> Back
          </Button>
        </Link>
        <CardTitle>{isEditing ? "Edit Customer" : "Create Customer"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the details of the customer."
            : "Fill in the details to create a new customer."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? undefined} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tradingName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Trading Name{" "}
                      <span className="text-red-500" title="Required">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="director"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Director{" "}
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="abn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ABN{" "}
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email{" "}
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  </FormLabel>
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
                  <FormLabel>
                    Address{" "}
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Link</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? undefined} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sbsStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Visa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select current Visa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="APPROVED">APPROVED</SelectItem>
                        <SelectItem value="NOT_APPROVED">
                          NOT_APPROVED
                        </SelectItem>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="associatedClients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No of Clients</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value ?? 0}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value ? Number(value) : undefined);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full py-2" disabled={isPending}>
              {isEditing ? "Update Company" : "Register Company"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
