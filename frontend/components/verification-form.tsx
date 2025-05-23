"use client";

import React, { useState } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface VerificationFormProps {
  email: string;
  userData: { email: string };
  setCurrentForm: (currentForm : "login" | "signup" | "verify") => void;
}

export default function VerificationForm({
  email,
  userData,
  setCurrentForm,
}: VerificationFormProps) {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );

  const handleVerificationInput = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-gray-200">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Check your email
        </CardTitle>
        <CardDescription>
          We sent a magic code to{" "}
          <span className="font-semibold text-gray-900">
            {email || userData.email}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <Label className="block text-center">
              Enter your 6-digit magic code
            </Label>
            <div className="flex gap-3 justify-center">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) =>
                    handleVerificationInput(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold"
                  maxLength={1}
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={verificationCode.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            Verify & Continue
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Didn't receive the code?</p>
          <Button
            variant="link"
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Resend magic code
          </Button>
        </div>

        <Button
          variant="link"
          onClick={() => setCurrentForm(email ? "login" : "signup")}
          className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {email ? "login" : "signup"}
        </Button>

        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 w-full">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-emerald-900 mb-1">
                Almost there!
              </h3>
              <p className="text-sm text-emerald-700">
                Your magic code expires in 10 minutes. Check your spam folder if
                you don't see it.
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
