import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Mic,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 font-bold text-xl">
              <span className="text-primary">Echo</span>
              <span>Plan</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#demo"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Demo
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#login"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Login
            </Link>
            <Button asChild>
              <Link href="#signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
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
                <Link href="#signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                <Link href="#demo">Try Demo</Link>
                </Button>
              </div>
              </div>
              <div className="flex items-center justify-center">
              <div className="mx-auto max-w-md rounded-xl border bg-background p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  PB
                  </div>
                  <h2 className="text-xl font-bold">
                  Prime Barbers
                  </h2>
                </div>
                </div>

                <div className="space-y-4 mb-6">
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                  AI Assistant
                  </p>
                  <p>
                  Welcome to Prime Barbers! How can I help you today? You
                  can book an appointment, check your upcoming bookings,
                  or ask about our services.
                  </p>
                </div>

                <div className="bg-primary/10 rounded-lg p-4 shadow-sm ml-auto max-w-[80%]">
                  <p className="text-sm text-muted-foreground">You</p>
                  <p>
                  I&apos;d like to book a haircut for tomorrow
                  </p>
                </div>

                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">
                  AI Assistant
                  </p>
                  <p>
                  Great! We have several barbers available tomorrow. Would
                  you prefer morning or afternoon?
                  </p>
                </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                <button className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                  <Mic className="h-8 w-8 text-primary-foreground" />
                </button>
                <div className="flex gap-2">
                  <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-primary"></span>
                  <span
                  className="animate-pulse inline-block h-2 w-2 rounded-full bg-primary"
                  style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                  className="animate-pulse inline-block h-2 w-2 rounded-full bg-primary"
                  style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tap to speak with your AI assistant
                </p>
                </div>
              </div>
              </div>
            </div>
            </div>
        </section>

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
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
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
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm"
              >
                <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border-2 flex items-center justify-center text-primary font-semibold">
                    {testimonial.company
                    .split(' ')
                    .filter(word => !['&'].includes(word))
                    .map(word => word[0])
                    .join('')}
                    </div>
                  <div>
                  <h3 className="font-bold">{testimonial.company}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.industry}
                  </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {testimonial.quote}
                </p>
                </div>
                <div className="mt-4 flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-primary/40 ${
                    i < testimonial.stars ? "fill-primary/20" : ""
                    }`}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  ))}
                </div>
              </div>
              ))}
            </div>
          </div>
        </section>

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
                  <Link href="#signup">Sign Up Now</Link>
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
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 font-bold text-xl">
              <span className="text-primary">Echo</span>
              <span>Plan</span>
            </div>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
            <Link
              href="#privacy"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Terms
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
        <div className="container py-4 text-center text-sm text-muted-foreground">
          <p>© 2025 EchoPlan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const testimonials = [
  {
    company: "Prime Barbers",
    industry: "Barbershop",
    quote:
      "EchoPlan saved us 20 hours a week in appointment scheduling and reduced no-shows by 75%.",
    stars: 5,
  },
  {
    company: "HealthyCare Clinic",
    industry: "Medical Practice",
    quote:
      "Our patients love the natural voice experience. It's like having a dedicated receptionist 24/7.",
    stars: 5,
  },
  {
    company: "Zen Spa & Wellness",
    industry: "Spa Services",
    quote:
      "The AI assistant handles all our bookings flawlessly, allowing our staff to focus on client care.",
    stars: 4,
  },
];
