import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, MessageSquare, ShieldCheck } from "lucide-react";
import Header from "@/components/header";
import DemoPreview from "@/components/demo-preview";
import TestimonialCarousel from "@/components/testimonial-carousel";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header showNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-20 lg:py-28 xl:py-44">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Automate Your Business with EchoPlan&apos;s AI Voice
                    Assistant
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Schedule appointments, check orders, and delight customers
                    with our intelligent voice assistant tailored for your
                    business.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/auth">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#demo">Try Demo</Link>
                  </Button>
                </div>
              </div>
              <DemoPreview />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Features that transform your business
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our AI voice assistant streamlines your operations and
                  enhances customer experience
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multi-tenant AI</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Isolated data for each business with custom branding and voice
                  personality
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Voice-first scheduling</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Natural, interruptible conversations for seamless appointment
                  booking
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Easy admin setup</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Manage staff, prompts, and recordings with an intuitive
                  dashboard
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Scalable and secure</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Securely-hosted, open-source solution that grows with your
                  business
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by businesses like yours
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See how EchoPlan is transforming customer service and
                  appointment scheduling
                </p>
              </div>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to transform your business?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Join hundreds of businesses already saving time and delighting
                  customers with EchoPlan
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth">Sign Up Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link href="#demo">Try Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
