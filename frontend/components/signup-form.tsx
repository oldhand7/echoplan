"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Building2, Globe, Palette, Upload, Users, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import Image from "next/image";

// Zod schema for form validation
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  createOrg: z.boolean(),
  orgName: z.string().optional(),
  orgType: z.string().optional(),
  orgSize: z.string().optional(),
  orgLocation: z.string().optional(),
  orgSlug: z.string().min(3, "URL must be at least 3 characters").optional(),
  orgBrandColor: z.string().optional(),
  orgLogo: z.any().optional(),
}).refine(
  (data) =>
    !data.createOrg ||
    (data.orgName && data.orgType && data.orgSize && data.orgLocation && data.orgSlug),
  {
    message: "All organization fields are required when creating an organization",
    path: ["orgName"],
  }
);

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface OrgData {
  name: string;
  type: string;
  size: string;
  location: string;
  brandColor: string;
  logo: File | null;
}

interface SignupFormProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  orgData: OrgData;
  setOrgData: React.Dispatch<React.SetStateAction<OrgData>>;
  isCreateOrg: boolean;
  setIsCreateOrg: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  slugAvailable: boolean | null;
  setSlugAvailable: React.Dispatch<React.SetStateAction<boolean | null>>;
  isCheckingSlug: boolean;
  setIsCheckingSlug: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentForm: (currentForm: "login" | "signup" | "verify") => void;
}

export default function SignupForm({
  userData,
  setUserData,
  orgData,
  setOrgData,
  isCreateOrg,
  setIsCreateOrg,
  slug,
  setSlug,
  slugAvailable,
  setSlugAvailable,
  isCheckingSlug,
  setIsCheckingSlug,
  setCurrentForm,
}: SignupFormProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Initialize form with Zod schema
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      createOrg: isCreateOrg,
      orgName: orgData.name,
      orgType: orgData.type,
      orgSize: orgData.size,
      orgLocation: orgData.location,
      orgSlug: slug,
      orgBrandColor: orgData.brandColor || "#3b82f6",
      orgLogo: null,
    },
  });

  // Handle slug generation
  useEffect(() => {
    if (orgData.name && isCreateOrg) {
      const generatedSlug = orgData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generatedSlug);
      form.setValue("orgSlug", generatedSlug);
    }
  }, [orgData.name, isCreateOrg, setSlug, form]);

  // Simulate slug availability check
  useEffect(() => {
    if (slug && slug.length >= 3) {
      setIsCheckingSlug(true);
      const timer = setTimeout(() => {
        setSlugAvailable(Math.random() > 0.3);
        setIsCheckingSlug(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setSlugAvailable(null);
    }
  }, [slug, setSlugAvailable, setIsCheckingSlug]);

  // Handle logo preview
  useEffect(() => {
    if (orgData.logo) {
      const url = URL.createObjectURL(orgData.logo);
      setLogoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoPreview(null);
    }
  }, [orgData.logo]);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "",
    });
    if (data.createOrg) {
      setOrgData({
        name: data.orgName || "",
        type: data.orgType || "",
        size: data.orgSize || "",
        location: data.orgLocation || "",
        brandColor: data.orgBrandColor || "#3b82f6",
        logo: data.orgLogo || null,
      });
    }
    setIsCreateOrg(data.createOrg);
    toast.success("Account Created", {
      description: "Proceeding to verification...",
      className: "bg-primary text-secondary",
    });
    setTimeout(() => {
      setCurrentForm("verify");
    }, 1000);
  };

  // Handle logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File Too Large", {
          description: "Logo must be under 5MB",
          className: "bg-destructive text-destructive-foreground",
        });
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid File Type", {
          description: "Please upload an image file",
          className: "bg-destructive text-destructive-foreground",
        });
        return;
      }
      setOrgData({ ...orgData, logo: file });
      form.setValue("orgLogo", file);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
          <Users className="w-8 h-8 text-secondary" />
        </div>
        <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
        <CardDescription>
          Join us to start building better experiences
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <FormField
              control={form.control}
              name="createOrg"
              render={({ field }) => (
                <FormItem className="flex items-start gap-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="flex-1">
                    <FormLabel className="text-lg font-semibold flex items-center gap-2 cursor-pointer">
                      <Building2 className="w-5 h-5" />
                      Create an organization
                    </FormLabel>
                    <p className="text-sm text-muted-foreground mt-1">
                      Set up your organization to collaborate with your team and customize your experience.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {form.watch("createOrg") && (
              <Card className="border-none shadow-none">
                <CardHeader className="px-0">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Organization Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="orgName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Prime Barbers" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orgType"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Organization Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="nonprofit">Non-profit</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="government">Government</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="orgSize"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-10">1-10 people</SelectItem>
                                  <SelectItem value="11-50">11-50 people</SelectItem>
                                  <SelectItem value="51-200">51-200 people</SelectItem>
                                  <SelectItem value="201-1000">201-1000 people</SelectItem>
                                  <SelectItem value="1000+">1000+ people</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="orgLocation"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="New York, NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="orgSlug"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Organization URL
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center border border-muted rounded-lg focus-within:ring-2 focus-within:ring-primary">
                              <span className="px-3 py-2 text-muted-foreground bg-muted rounded-l-lg">
                                echoplan.com/
                              </span>
                              <Input
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9-]/g, "");
                                  field.onChange(value);
                                  setSlug(value);
                                }}
                                className="border-none focus:ring-0"
                                placeholder="prime-barbers"
                              />
                              <div className="px-3">
                                {isCheckingSlug ? (
                                  <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                                ) : slugAvailable === true ? (
                                  <Check className="w-5 h-5 text-primary" />
                                ) : slugAvailable === false ? (
                                  <X className="w-5 h-5 text-destructive" />
                                ) : null}
                              </div>
                            </div>
                          </FormControl>
                          {slugAvailable === false && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <X className="w-4 h-4" />
                              This URL is not available. Try a different one.
                            </p>
                          )}
                          {slugAvailable === true && (
                            <p className="text-sm text-primary flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              Great! This URL is available.
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orgBrandColor"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Brand Color
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-4">
                              <div className="grid grid-cols-6 gap-2">
                                {[
                                  "#3b82f6", // blue-500
                                  "#10b981", // green-500
                                  "#f59e0b", // yellow-500
                                  "#ef4444", // red-500
                                  "#8b5cf6", // purple-500
                                  "#06b6d4", // cyan-500
                                ].map((color) => (
                                  <Button
                                    key={color}
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      field.onChange(color);
                                      setOrgData({ ...orgData, brandColor: color });
                                    }}
                                    className={`w-10 h-10 p-0 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
                                      field.value === color ? "ring-2 ring-primary" : ""
                                    }`}
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="text"
                                  placeholder="#3b82f6"
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                    setOrgData({ ...orgData, brandColor: e.target.value });
                                  }}
                                  className="w-24"
                                />
                                <div
                                  className="w-10 h-10 rounded-lg border border-muted"
                                  style={{ backgroundColor: field.value }}
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="orgLogo"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Logo (Optional)
                          </FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors">
                              {logoPreview ? (
                                <div className="relative">
                                  <Image
                                    src={logoPreview}
                                    alt="Logo Preview"
                                    className="max-h-24 mx-auto mb-2 object-contain"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      setOrgData({ ...orgData, logo: null });
                                      field.onChange(null);
                                    }}
                                    className="absolute top-0 right-0"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-sm text-muted-foreground">
                                    Drag & drop your logo here, or click to browse (max 5MB)
                                  </p>
                                </>
                              )}
                              <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="lg:pl-8">
                    <div className="sticky top-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Preview
                      </h3>
                      <div className="bg-muted rounded-lg p-6 border border-muted-foreground/20">
                        <div className="text-center">
                          {logoPreview ? (
                            <Image
                              src={logoPreview}
                              alt="Logo Preview"
                              className="w-16 h-16 rounded-full mx-auto mb-4 object-contain"
                            />
                          ) : (
                            <div
                              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                              style={{ backgroundColor: orgData.brandColor || "#3b82f6" }}
                            >
                              {orgData.name
                                ? orgData.name.substring(0, 2).toUpperCase()
                                : "YO"}
                            </div>
                          )}
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {orgData.name || "Your Organization"}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {orgData.type
                              ? orgData.type.charAt(0).toUpperCase() + orgData.type.slice(1)
                              : "Organization"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            echoplan.com/{slug || "your-organization"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            onClick={() => setCurrentForm("login")}
            className="flex items-center gap-2 hover:scale-[1.02] transition-transform duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
          <Button
            type="submit"
            className="flex-1 transition-all duration-200 hover:scale-[1.02]"
            disabled={!form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            Next
          </Button>
        </div>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Button
            variant="link"
            onClick={() => setCurrentForm("login")}
            className="font-semibold text-primary hover:text-primary/80"
          >
            Sign in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}