"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, RefreshCw, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

// Zod schema for form validation
const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 characters")
    .regex(/^[a-zA-Z0-9]{6}$/, "Code must contain only letters and numbers"),
});

interface VerificationFormProps {
  email: string;
  userData: { email: string };
  setCurrentForm: (currentForm: "login" | "signup" | "verify") => void;
}

export default function VerificationForm({
  email,
  userData,
  setCurrentForm,
}: VerificationFormProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Initialize form with Zod schema
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof verificationSchema>) => {
    toast.success("Verification Successful", {
      description: "Redirecting to dashboard...",
      className: "bg-green-500 text-white",
    });
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  // Handle paste event to fill code inputs
  const handlePaste = (
    e: React.ClipboardEvent,
    setValue: (value: string) => void
  ) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^[a-zA-Z0-9]{6}$/.test(pastedData)) {
      setValue(pastedData);
      form.trigger("code");
      // Focus last input after paste
      document.getElementById("code-5")?.focus();
    } else {
      toast.error("Invalid Code", {
        description: "Please paste a valid 6-character code",
      });
    }
  };

  // Handle resend code
  const handleResend = () => {
    setIsResending(true);
    setResendCountdown(30);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      toast.success("Code Resent", {
        description: `New verification code sent to ${email || userData.email}`,
      });
    }, 1000);
  };

  // Countdown timer effect
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCountdown]);

  // Auto-focus first input on mount
  useEffect(() => {
    document.getElementById("code-0")?.focus();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
          <Mail className="w-8 h-8 text-secondary" />
        </div>
        <CardTitle className="text-3xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We sent a 6-character code to{" "}
          <span className="font-semibold">{email || userData.email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center justify-center gap-2">
                    Enter your 6-character code
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2 justify-center">
                      {Array(6)
                        .fill(0)
                        .map((_, index) => (
                          <Input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={field.value[index] || ""}
                            onChange={(e) => {
                              const newValue = e.target.value.replace(
                                /[^a-zA-Z0-9]/g,
                                ""
                              );
                              if (newValue.length <= 1) {
                                const currentCode = field.value || "";
                                const updatedCode =
                                  currentCode.slice(0, index) +
                                  newValue +
                                  currentCode.slice(index + 1);
                                field.onChange(updatedCode);
                                if (newValue && index < 5) {
                                  document
                                    .getElementById(`code-${index + 1}`)
                                    ?.focus();
                                }
                              }
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === "Backspace" &&
                                !field.value[index] &&
                                index > 0
                              ) {
                                document
                                  .getElementById(`code-${index - 1}`)
                                  ?.focus();
                              }
                            }}
                            onPaste={(e) => handlePaste(e, field.onChange)}
                            className="w-12 h-12 text-center text-xl font-semibold transition-colors focus:ring-2 focus:ring-primary"
                          />
                        ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              disabled={!form.formState.isValid}
            >
              Verify & Continue
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            Didn't receive the code?
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-primary hover:text-primary/80 font-medium"
            onClick={handleResend}
            disabled={isResending || resendCountdown > 0}
          >
            {isResending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                Sending...
              </>
            ) : resendCountdown > 0 ? (
              `Resend in ${resendCountdown}s`
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 mR-1 inline" /> Resend code
              </>
            )}
          </Button>
        </div>

        <Button
          variant="link"
          onClick={() => setCurrentForm("login")}
          className="w-full flex items-center justify-center gap-2 font-semibold text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-[1.02]"
        >
          <LogOut className="w-4 h-4" />
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
}
