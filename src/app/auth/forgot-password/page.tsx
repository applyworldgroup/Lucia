"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FormError from "@/app/components/form-error";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { forgotPassword } from "@/features/actions/auth/forgot-password";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export type emailInput = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<emailInput>({
    resolver: zodResolver(forgotSchema),
  });

  async function onSubmit(data: emailInput){
    const res = await forgotPassword(data)
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
        title: "📧 Sent",
        variant: "default",
        description: res.message,
      })
      router.push("/")
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
   <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
             Enter your email below to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link href="signin" className="underline" prefetch={false}>
              Back to Login
            </Link>
          </div>
        </form>
 
  </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}