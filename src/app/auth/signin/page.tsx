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
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import FormError from "@/app/components/form-error";
import { signInUser } from "@/features/actions/auth/signin";
import { resendVerificationEmail } from "@/features/actions/auth/resendVerificationEmail";
import { useCountdown } from "usehooks-ts";
import LoadingSpinner from "@/app/components/loading-spinner";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  useEffect(() => {
    if (count == 0) {
      stopCountdown();
      resetCountdown();
    }
  },[count]);

  const [showPassword, setShowPassword] = useState(false);
  const [showResendVerificationEmail, setShowResendVerificationEmail] =
    useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInInput) {
    const res = await signInUser(data);
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
      if (res.key === "email_not_verified") {
        setShowResendVerificationEmail(true);
      }
    } else if (res.success) {
      toast({
        variant: "default",
        title:`🙏Welcome, ${data.email.split('@')[0].charAt(0).toUpperCase() + data.email.split('@')[0].slice(1)} Boss`,
        description: "Signed in successfully",
      });
      reset();
      router.push("/dashboard");
    }
  }

  const onResendVerificationEmail = async () => {
    const email = getValues("email");
    const res = await resendVerificationEmail(email);

    if (res?.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
      
    } else {
      toast({
        variant: "default",
        description: "Verification email sent!",
      });
      startCountdown();
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your <b>Hamro Khata</b> account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
                  <Link
                    href="forgot-password"
                    className="ml-auto inline-block text-sm underline"
                    prefetch={false}
                  >
                    Forgot your password?
                  </Link>
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
              {showResendVerificationEmail && (
                <Button
                  type="button"
                  variant={"link"}
                  className="w-full"
                  onClick={onResendVerificationEmail}
                  disabled={count > 0 && count < 60}
                >
                  Send verification email {(count > 0 && count < 60) && `in ${count}s` }
                </Button>
              )}
              <Button type="submit" className="w-full flex gap-4" disabled={isSubmitting}>
              {isSubmitting && <LoadingSpinner />}  Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="signup" className="underline">
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
