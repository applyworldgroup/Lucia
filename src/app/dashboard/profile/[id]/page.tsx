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
import { Bell, Loader2, Save, User } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  role: z.string(),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
});

export default function UserProfileSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    role: "Migration Agent",
    bio: "Experienced migration agent with a passion for helping people achieve their dreams of studying and living abroad.",
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: userInfo,
  });

  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: true,
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setUserInfo(values);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }, 2000);
  }

  function onNotificationSubmit(values: z.infer<typeof notificationSchema>) {
    console.log(values);
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  }

  return (
    <div className=" mx-auto ">
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
        <CardContent>
          <Tabs defaultValue="profile" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2 mb-6  ">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={profileForm.control}
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
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
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
                    control={profileForm.control}
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
                    control={profileForm.control}
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
                    control={profileForm.control}
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
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="notifications">
              <Form {...notificationForm}>
                <form
                  onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Email Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive notifications via email.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Push Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive push notifications on your device.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationForm.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            SMS Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive notifications via SMS.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save Notification Preferences</Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
