"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function TestimonialCarousel() {
  const testimonials = [
    {
      company: "Elite Dental Care",
      industry: "Dental Practice",
      quote:
        "EchoPlan reduced our missed appointments by 80% and improved patient satisfaction scores dramatically.",
      stars: 5,
    },
    {
      company: "StyleHouse Salon",
      industry: "Hair Salon",
      quote:
        "We've doubled our booking efficiency and our stylists love how the AI handles scheduling conflicts.",
      stars: 5,
    },
    {
      company: "Wellness Center Plus",
      industry: "Health & Wellness",
      quote:
        "The voice assistant's natural conversation flow has impressed our clients. It's like having a professional receptionist 24/7.",
      stars: 5,
    },
    {
      company: "Premier Auto Service",
      industry: "Auto Repair",
      quote:
        "EchoPlan has streamlined our service scheduling and follow-ups. Customer wait times dropped by 60%.",
      stars: 4,
    },
    {
      company: "Fresh Fitness",
      industry: "Gym & Fitness",
      quote:
        "Class bookings have increased 40% since implementing EchoPlan. The automated reminders are a game-changer.",
      stars: 5,
    },
    {
      company: "Urban Massage",
      industry: "Massage Therapy",
      quote:
        "Our therapists can focus on treatments while EchoPlan handles all scheduling and client communication perfectly.",
      stars: 5,
    },
    {
      company: "Pet Care Plus",
      industry: "Veterinary Services",
      quote:
        "The custom voice personality matches our brand perfectly. Pet owners love the friendly booking experience.",
      stars: 4,
    },
    {
      company: "Smith & Associates",
      industry: "Legal Services",
      quote:
        "Client consultation scheduling is seamless now. The system has paid for itself in saved administrative hours.",
      stars: 5,
    },
    {
      company: "Clear Vision Optometry",
      industry: "Eye Care",
      quote:
        "EchoPlan's integration was smooth and our patients adapted quickly. Booking efficiency up by 45%.",
      stars: 5,
    },
    {
      company: "Healing Hands Clinic",
      industry: "Physical Therapy",
      quote:
        "The AI assistant manages complex scheduling requirements effortlessly. Outstanding ROI for our practice.",
      stars: 4,
    },
  ];

  return (
    <Carousel
      opts={{
      align: "start",
      loop: true,
      dragFree: true,
      slidesToScroll: 1
      }}
      plugins={[
      Autoplay({
        delay: 3000,
      }),
      ]}
      className="w-full mt-12"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {testimonials.map((testimonial, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <div className="h-full flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 border-2 flex items-center justify-center text-primary font-semibold">
                    {testimonial.company
                      .split(" ")
                      .filter((word) => !["&"].includes(word))
                      .map((word) => word[0])
                      .join("")}
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
                      className={`text-primary/80 ${
                        i < testimonial.stars ? "fill-primary/40" : ""
                      }`}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
