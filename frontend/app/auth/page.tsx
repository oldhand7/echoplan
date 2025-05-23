"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organizationName: "",
    subdomain: "",
    brandColor: "#4F46E5",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && isBusinessOwner) {
      setStep(2);
    } else {
      // Submit form logic would go here
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header hideCTA/>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create your account</h1>
              <p className="text-muted-foreground">
                {step === 1
                  ? "Sign up to get started with EchoPlan"
                  : "Set up your organization"}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isBusinessOwner"
                    checked={isBusinessOwner}
                    onCheckedChange={(checked) =>
                      setIsBusinessOwner(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="isBusinessOwner"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I want to create an organization
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  {isBusinessOwner ? "Next" : "Sign Up"}
                </Button>
              </form>
            ) : (
              <div className="grid md:grid-cols-[1fr_300px] gap-6">
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      placeholder="Prime Barbers"
                      required
                      value={formData.organizationName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <div className="flex items-center">
                      <Input
                        id="subdomain"
                        name="subdomain"
                        placeholder="prime-barbers"
                        required
                        value={formData.subdomain}
                        onChange={handleInputChange}
                      />
                      <span className="ml-2 text-sm text-muted-foreground">
                        .echoplan.com
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandColor">Brand Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="brandColor"
                        name="brandColor"
                        type="color"
                        className="w-12 h-10 p-1"
                        value={formData.brandColor}
                        onChange={handleInputChange}
                      />
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          "#4F46E5",
                          "#10B981",
                          "#F59E0B",
                          "#EF4444",
                          "#8B5CF6",
                        ].map((color) => (
                          <button
                            key={color}
                            type="button"
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: color }}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                brandColor: color,
                              }))
                            }
                            aria-label={`Select color ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo (Optional)</Label>
                    <Input id="logo" type="file" />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Organization
                  </Button>
                </form>

                <div className="hidden md:block">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium mb-2">Preview</h3>
                      <div
                        className="rounded-lg p-4 flex flex-col items-center gap-2"
                        style={{ backgroundColor: formData.brandColor + "10" }}
                      >
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: formData.brandColor }}
                        >
                          {formData.organizationName
                            ? formData.organizationName
                                .substring(0, 2)
                                .toUpperCase()
                            : "PB"}
                        </div>
                        <h4 className="font-bold text-center">
                          {formData.organizationName || "Your Organization"}
                        </h4>
                        <button
                          className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 mt-2"
                          style={{ backgroundColor: formData.brandColor }}
                        >
                          <Mic className="h-6 w-6 text-white" />
                        </button>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          {formData.subdomain || "your-domain"}.echoplan.com
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
