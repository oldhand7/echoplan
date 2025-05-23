  "use client";

  import React from "react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  import { Mail, ScanFace } from "lucide-react";
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

  // Zod schema for form validation
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
  });

  interface LoginFormProps {
    email: string;
    setEmail: (email: string) => void;
    setCurrentForm: (currentForm: "login" | "signup" | "verify") => void;
  }

  export default function LoginForm({
    email,
    setEmail,
    setCurrentForm,
  }: LoginFormProps) {
    // Initialize form with Zod schema
    const form = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email,
      },
    });

    // Handle form submission
    const onSubmit = (data: z.infer<typeof loginSchema>) => {
      setEmail(data.email);
      setCurrentForm("verify");
    };

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
            <ScanFace className="w-8 h-8 text-secondary" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to continue your journey with us.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Continue
              </Button>

              <div className="relative flex items-center">
                <span className="flex-grow border-t border-muted"></span>
                <span className="px-4 text-muted-foreground">or</span>
                <span className="flex-grow border-t border-muted"></span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Don&apos;t have an account?{" "}
            </span>
            <Button
              variant="link"
              onClick={() => setCurrentForm("signup")}
              className="font-semibold p-2"
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
