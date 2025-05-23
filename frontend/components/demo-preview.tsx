import { Mic } from "lucide-react"; // Assuming you're using lucide-react for icons

export default function DemoPreview() {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto max-w-md rounded-xl border bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              PB
            </div>
            <h2 className="text-xl font-bold">Prime Barbers</h2>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">AI Assistant</p>
            <p>
              Welcome to Prime Barbers! How can I help you today? You can book
              an appointment, check your upcoming bookings, or ask about our
              services.
            </p>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 shadow-sm ml-auto max-w-[80%]">
            <p className="text-sm text-muted-foreground">You</p>
            <p>I&apos;d like to book a haircut for tomorrow</p>
          </div>

          <div className="bg-card rounded-lg p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">AI Assistant</p>
            <p>
              Great! We have several barbers available tomorrow. Would you
              prefer morning or afternoon?
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
  );
}
