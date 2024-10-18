"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/app/components/form-error";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signUpUser } from "@/features/actions/auth/signup";
import LoadingSpinner from "@/app/components/loading-spinner";

// enum ROLE {
//   ADMIN = "ADMIN",
//   USER = "USER",
// }

const signUpSchema = z.object({
  firstName: z.string().min(3, "Name should be atleast 3 characters long."),
  lastName: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpInput) {
    const res = await signUpUser(data);
    if (!res)
      return toast({
        variant: "destructive",
        description: "Something went wrong in server.",
      });
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({
        title: "Sign Up Successful",
        variant: "default",
        description:
          "We have sent an verification email, please verify your email before signing in.",
      });
      reset();
      router.push("/auth/signin");
    }
  }
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create a <b>Hamro Khata</b> account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John Doe"
                  required
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <FormError error={errors.firstName.message} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="John Doe"
                  required
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <FormError error={errors.lastName.message} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && <FormError error={errors.email.message} />}
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("password")}
                    />
                    <Button
                      variant={"ghost"}
                      size="icon"
                      type="button"
                      className="absolute bottom-1 right-1 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <FormError error={errors.password.message} />
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full flex gap-4"
                disabled={isSubmitting}
              >
                {isSubmitting && <LoadingSpinner />} Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={"signin"} className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
