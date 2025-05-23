import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Mic,
  Calendar,
  Users,
  Settings,
  BarChart,
  FileText,
} from "lucide-react";

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 font-bold text-xl"
            >
              <span className="text-primary">Echo</span>
              <span>Plan</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/auth">Sign Up Now</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Experience EchoPlan Demo
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Try our AI voice assistant for &quot;Prime Barbers&quot; and
                  see how it can transform your business
                </p>
              </div>
            </div>

            <Tabs defaultValue="customer" className="mt-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="customer">Customer View</TabsTrigger>
                <TabsTrigger value="admin">Admin Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="mt-6">
                <div className="mx-auto max-w-md rounded-xl border bg-[#FAF7F2] p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-white font-bold">
                        PB
                      </div>
                      <h2 className="text-xl font-bold text-[#1C1917]">
                        Prime Barbers
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-muted-foreground">
                        AI Assistant
                      </p>
                      <p className="text-[#1C1917]">
                        Welcome to Prime Barbers! How can I help you today? You
                        can book an appointment, check your upcoming bookings,
                        or ask about our services.
                      </p>
                    </div>

                    <div className="bg-[#FBBF24]/10 rounded-lg p-4 shadow-sm ml-auto max-w-[80%]">
                      <p className="text-sm text-muted-foreground">You</p>
                      <p className="text-[#1C1917]">
                        I&apos;d like to book a haircut for tomorrow
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-muted-foreground">
                        AI Assistant
                      </p>
                      <p className="text-[#1C1917]">
                        Great! We have several barbers available tomorrow. Would
                        you prefer morning or afternoon?
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <button className="h-16 w-16 rounded-full bg-[#FBBF24] flex items-center justify-center shadow-lg hover:bg-[#F59E0B] transition-all duration-300 hover:scale-105">
                      <Mic className="h-8 w-8 text-white" />
                    </button>
                    <div className="flex gap-2">
                      <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-[#FBBF24]"></span>
                      <span
                        className="animate-pulse inline-block h-2 w-2 rounded-full bg-[#FBBF24]"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="animate-pulse inline-block h-2 w-2 rounded-full bg-[#FBBF24]"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tap to speak with your AI assistant
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <div className="mx-auto max-w-4xl rounded-xl border bg-background p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-64 space-y-4">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="h-10 w-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-white font-bold">
                          PB
                        </div>
                        <h2 className="text-xl font-bold">Prime Barbers</h2>
                      </div>

                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <BarChart className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Staff Management
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          AI Configuration
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Recordings
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Analytics
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-4">
                        Welcome to Prime Barbers Admin
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="rounded-lg border bg-card p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Appointments Today
                          </h4>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Customer Satisfaction
                          </h4>
                          <p className="text-2xl font-bold">95%</p>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Recent Recordings
                          </h4>
                          <p className="text-2xl font-bold">3 new</p>
                        </div>
                      </div>

                      <div className="rounded-lg border bg-card p-4 mb-6">
                        <h4 className="font-medium mb-4">
                          Staff Availability Today
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  JD
                                </span>
                              </div>
                              <span>John Doe</span>
                            </div>
                            <span className="text-sm text-green-500">
                              Available
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  MS
                                </span>
                              </div>
                              <span>Mike Smith</span>
                            </div>
                            <span className="text-sm text-green-500">
                              Available
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  AJ
                                </span>
                              </div>
                              <span>Alex Johnson</span>
                            </div>
                            <span className="text-sm text-red-500">Booked</span>
                          </div>
                        </div>
                      </div>

                      <Button asChild>
                        <Link href="/demo">Preview Customer UI</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Love what you see?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Create your organization today and start delighting your
                  customers with AI-powered scheduling
                </p>
              </div>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          <p>© 2025 EchoPlan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
