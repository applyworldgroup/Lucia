"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import FormError from "@/app/components/form-error";
import { useSearchParams } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/features/actions/auth/reset-password";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type resetInput = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const tokenParam = useSearchParams();
  const token = tokenParam.get("token");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetInput>({
    resolver: zodResolver(resetSchema),
  });

  if (!token) {
        return ( <div>Token not found</div> )
    }

  async function onSubmit(data: resetInput){
    console.log(data);
    const res = await resetPassword(data, token);
    if(!res) return toast({
      variant: "destructive",
      description: "Something went wrong in server."
    })
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      })
    } else if (res.success) {
      toast({
        title: "👌 Password reset Successful!",
        variant: "default",
        description: res.message,
      })
      router.push("/auth/signin")
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
   <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            Enter a new password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">New Password</Label>
            </div>
            <div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
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
              {errors.password && <FormError error={errors.password.message} />}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your new password"
              {...register("confirmPassword")}
              required
            />
            {errors.confirmPassword && (
              <FormError error={errors.confirmPassword.message} />
            )}
          </div>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}