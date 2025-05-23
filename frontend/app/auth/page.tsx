"use client";

import React, { useState } from "react";
import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";
import VerificationForm from "@/components/verification-form";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AuthPage() {
  const [currentForm, setCurrentForm] = useState<"login" | "signup" | "verify">(
    "login",
  );
  const [email, setEmail] = useState("");
  const [isCreateOrg, setIsCreateOrg] = useState(false);
  const [slug, setSlug] = useState("");
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [orgData, setOrgData] = useState({
    name: "",
    type: "",
    size: "",
    location: "",
    brandColor: "#6366f1",
    logo: null as File | null,
  });

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header hideCTA />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto w-full pt-24 px-4">
          {currentForm == "login" && (
            <LoginForm
              email={email}
              setEmail={setEmail}
              setCurrentForm={setCurrentForm}
            />
          )}
          {currentForm == "signup" && (
            <SignupForm
              userData={userData}
              setUserData={setUserData}
              orgData={orgData}
              setOrgData={setOrgData}
              isCreateOrg={isCreateOrg}
              setIsCreateOrg={setIsCreateOrg}
              slug={slug}
              setSlug={setSlug}
              slugAvailable={slugAvailable}
              setSlugAvailable={setSlugAvailable}
              isCheckingSlug={isCheckingSlug}
              setIsCheckingSlug={setIsCheckingSlug}
              setCurrentForm={setCurrentForm}
            />
          )}
          {currentForm == "verify" && (
            <VerificationForm
              email={email}
              userData={userData}
              setCurrentForm={setCurrentForm}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
