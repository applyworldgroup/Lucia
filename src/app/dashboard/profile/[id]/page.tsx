// import { Button } from "@/components/ui/button";// import { signOut } from "@/features/actions/auth/signout";// import { getUserById } from "@/features/actions/profile/actions";// import { validateServerProtectedRoute } from "@/lib/validate-server-protected-route";// export default async function Profile() {//   const { user } = await validateServerProtectedRoute();//   const { data } = await getUserById(user.id);
//   return (
//     <div>
//       <b>Dashboard</b>
//       <p>{JSON.stringify(data, null, 2)}</p>
//       <form action={signOut}>
//         <Button type="submit">Sign out</Button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import { signOut } from "@/features/actions/auth/signout";
// import React from "react";
// import { ValidateClientProtectedRoute } from "@/lib/validate-client-protected-route";

// export default function Dashboard() {
//   const {user} = ValidateClientProtectedRoute()
//   return (
//     <div>
//       <b>Dashboard</b>
//       <p>Hi, this is client page</p>
//       <p>{JSON.stringify(user, null, 2)}</p>
//       <Button type="submit" onClick={() => signOut()}>
//         Sign out
//       </Button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ValidateClientProtectedRoute } from "@/lib/validate-client-protected-route";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  role: z.string(),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }),
});

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    role: "Migration Agent",
    bio: "Experienced migration agent with a passion for helping people achieve their dreams of studying and living abroad.",
  });

  ValidateClientProtectedRoute();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userInfo,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setUserInfo(values);
      setIsOpen(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }, 2000);
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/placeholder.svg?height=80&width=80"
              alt="Profile picture"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-2xl">{userInfo.fullName}</CardTitle>
            <CardDescription>{userInfo.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Email</h3>
          <p className="text-sm text-muted-foreground">{userInfo.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Phone</h3>
          <p className="text-sm text-muted-foreground">{userInfo.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold">Address</h3>
          <p className="text-sm text-muted-foreground">{userInfo.address}</p>
        </div>
        <div>
          <h3 className="font-semibold">Bio</h3>
          <p className="text-sm text-muted-foreground">{userInfo.bio}</p>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>Edit Profile</Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Edit Profile</SheetTitle>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
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
                        <Input
                          placeholder="123 Main St, City, Country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Migration Agent">
                            Migration Agent
                          </SelectItem>
                          <SelectItem value="Education Counselor">
                            Education Counselor
                          </SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Support Staff">
                            Support Staff
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Your role determines your permissions within the CRM.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be displayed on your public profile. Max 500
                        characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}
