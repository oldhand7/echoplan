"use client";

import React, { useEffect } from "react";
import { ArrowLeft, Building2, Globe, Palette, Upload, Users, Info, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  setCurrentForm: (currentForm : "login" | "signup" | "verify") => void;
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
  useEffect(() => {
    if (orgData.name && isCreateOrg) {
      const generatedSlug = orgData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generatedSlug);
    }
  }, [orgData.name, isCreateOrg, setSlug]);

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

  return (
    <Card className="w-full max-w-4xl mx-auto border-gray-200">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 9.143M15 3v4m-2-2h4" />
          </svg>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Create your account
        </CardTitle>
        <CardDescription>
          Join thousands of users building better experiences
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentForm("verify");
          }}
          className="space-y-8"
        >
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  placeholder="john@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  id="createOrg"
                  checked={isCreateOrg}
                  onCheckedChange={(checked) => setIsCreateOrg(!!checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="createOrg"
                      className="text-lg font-semibold text-indigo-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Create an organization
                      </div>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-indigo-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Perfect for businesses, teams, or communities
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-indigo-700 mt-1">
                    Set up your organization to collaborate with your team and
                    customize your experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {isCreateOrg && (
            <Card className="bg-white border-gray-200 shadow-sm animate-in slide-in-from-top duration-300">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      type="text"
                      value={orgData.name}
                      onChange={(e) =>
                        setOrgData({ ...orgData, name: e.target.value })
                      }
                      placeholder="Prime Barbers"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgType">Organization Type</Label>
                    <Select
                      value={orgData.type}
                      onValueChange={(value) =>
                        setOrgData({ ...orgData, type: value })
                      }
                      required
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgSize">Size</Label>
                      <Select
                        value={orgData.size}
                        onValueChange={(value) =>
                          setOrgData({ ...orgData, size: value })
                        }
                        required
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgLocation">Location</Label>
                      <Input
                        id="orgLocation"
                        type="text"
                        value={orgData.location}
                        onChange={(e) =>
                          setOrgData({ ...orgData, location: e.target.value })
                        }
                        placeholder="New York, NY"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Organization URL
                    </Label>
                    <div className="flex items-center border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500">
                      <span className="px-4 py-3 text-gray-500 bg-gray-50 rounded-l-xl border-r">
                        echoplan.com/
                      </span>
                      <Input
                        type="text"
                        value={slug}
                        onChange={(e) =>
                          setSlug(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, "")
                          )
                        }
                        className="flex-1 border-none focus:ring-0"
                        placeholder="prime-barbers"
                        required
                      />
                      <div className="px-3">
                        {isCheckingSlug ? (
                          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                        ) : slugAvailable === true ? (
                          <Check className="w-5 h-5 text-emerald-500" />
                        ) : slugAvailable === false ? (
                          <X className="w-5 h-5 text-red-500" />
                        ) : null}
                      </div>
                    </div>
                    {slugAvailable === false && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        This URL is not available. Try a different one.
                      </p>
                    )}
                    {slugAvailable === true && (
                      <p className="text-sm text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Great! This URL is available.
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Brand Color
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="color"
                        value={orgData.brandColor}
                        onChange={(e) =>
                          setOrgData({ ...orgData, brandColor: e.target.value })
                        }
                        className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer"
                      />
                      <div className="grid grid-cols-6 gap-2">
                        {[
                          "#6366f1",
                          "#10b981",
                          "#f59e0b",
                          "#ef4444",
                          "#8b5cf6",
                          "#06b6d4",
                        ].map((color) => (
                          <Button
                            key={color}
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setOrgData({ ...orgData, brandColor: color })
                            }
                            className="w-8 h-8 p-0 rounded-lg border-2 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Logo (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-indigo-300 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag & drop your logo here, or click to browse
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          setOrgData({
                            ...orgData,
                            logo: e.target.files ? e.target.files[0] : null,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:pl-8">
                  <div className="sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Preview
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                      <div
                        className="rounded-xl p-6 text-center shadow-lg"
                        style={{
                          backgroundColor: orgData.brandColor + "15",
                          borderColor: orgData.brandColor + "30",
                        }}
                      >
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                          style={{ backgroundColor: orgData.brandColor }}
                        >
                          {orgData.name
                            ? orgData.name.substring(0, 2).toUpperCase()
                            : "YO"}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {orgData.name || "Your Organization"}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {orgData.type
                            ? orgData.type.charAt(0).toUpperCase() +
                              orgData.type.slice(1)
                            : "Organization"}
                        </p>
                        <div className="text-sm text-gray-500">
                          echoplan.com/{slug || "your-organization"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            onClick={() => setCurrentForm("login")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Create Account
          </Button>
        </div>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Button
            variant="link"
            onClick={() => setCurrentForm("login")}
            className="text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Sign in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}