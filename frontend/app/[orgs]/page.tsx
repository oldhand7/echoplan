"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mic,
  MicOff,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

// Zod schema for booking form
const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  time: z.string().nonempty("Please select a time"),
});

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Welcome to EchoPlan! I'm your AI scheduling assistant, here to help you book appointments seamlessly. Just say 'book an appointment' or ask about availability, and I'll guide you through the process.",
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [callStatus, setCallStatus] = useState("Connected");
  const [waveform, setWaveform] = useState<number[]>([10, 10, 10, 10, 10]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Booking form setup
  const bookingForm = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      time: "",
    },
  });

  const quickActions: QuickAction[] = [
    {
      id: "book",
      label: "Book Appointment",
      icon: <Calendar className="h-4 w-4" />,
      prompt: "I want to book an appointment",
    },
    {
      id: "availability",
      label: "Check Availability",
      icon: <Clock className="h-4 w-4" />,
      prompt: "What times are available today?",
    },
    {
      id: "services",
      label: "Our Services",
      icon: <User className="h-4 w-4" />,
      prompt: "What services do you offer?",
    },
    {
      id: "contact",
      label: "Contact Info",
      icon: <Phone className="h-4 w-4" />,
      prompt: "What are your contact details?",
    },
  ];

  // Simulate waveform animation during listening
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveform(Array.from({ length: 5 }, () => Math.random() * 20 + 10));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        if (event.results[event.results.length - 1].isFinal) {
          handleUserMessage(transcript, true);
          stopListening();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        toast({
          title: "Speech Recognition Error",
          description: "Unable to process voice input. Please try again.",
          variant: "destructive",
        });
        stopListening();
      };
    }
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        processVoiceInput(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      recognitionRef.current?.start();
      setIsListening(true);
      setCallStatus("Listening");
      // Simulate call connection sound
      new Audio(
        "https://cdn.pixabay.com/audio/2022/03/24/audio_d6e6fbed68.mp3"
      ).play();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Error",
        description:
          "Unable to access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      recognitionRef.current?.stop();
      setIsListening(false);
      setIsProcessing(true);
      setCallStatus("Processing");
    }
  };

  const processVoiceInput = async (audioBlob: Blob) => {
    // Simulate voice processing
    setTimeout(() => {
      const transcribedText =
        "I'd like to book an appointment for tomorrow afternoon";
      handleUserMessage(transcribedText, true);
      setIsProcessing(false);
      setCallStatus("Connected");
    }, 2000);
  };

  const handleUserMessage = (content: string, isVoice = false) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
      isVoice,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Check for booking intent
    if (
      content.toLowerCase().includes("book") ||
      content.toLowerCase().includes("appointment")
    ) {
      setShowBookingModal(true);
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (audioEnabled) {
        speakText(aiResponse);
      }
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("book") || input.includes("appointment")) {
      return "I'd be happy to help you book an appointment. I have openings tomorrow at 2:00 PM, 3:30 PM, or 4:00 PM. Please provide your name and email in the booking form, or say your details now.";
    } else if (input.includes("available") || input.includes("time")) {
      return "We have slots available today at 11:00 AM, 2:30 PM, and 4:00 PM. Tomorrow has more openings throughout the day. Would you like to book one of these slots?";
    } else if (input.includes("service") || input.includes("offer")) {
      return "We offer consultations, project planning sessions, and follow-up meetings. Would you like to book a specific service?";
    } else if (
      input.includes("contact") ||
      input.includes("phone") ||
      input.includes("address")
    ) {
      return "You can reach us at (555) 987-6543 or email us at contact@echoplan.ai. We're available Monday to Friday, 9 AM to 5 PM.";
    } else if (input.includes("cancel")) {
      setShowBookingModal(false);
      return "Booking cancelled. How else can I assist you today?";
    } else {
      return "I'm here to help with scheduling! You can book an appointment, check availability, or ask about our services. Just say what you need!";
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      setCallStatus("Speaking");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.lang = "en-US";
      utterance.voice =
        speechSynthesis
          .getVoices()
          .find((voice) => voice.name.includes("Natural")) || null;

      utterance.onend = () => {
        setIsSpeaking(false);
        setCallStatus("Connected");
      };

      speechSynthesis.speak(utterance);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    handleUserMessage(action.prompt);
  };

  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast({
      title: "Appointment Booked",
      description: `Your appointment is confirmed for ${data.time}, ${data.name}! A confirmation email has been sent to ${data.email}.`,
      className: "bg-green-500 text-white",
    });
    setShowBookingModal(false);
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 2).toString(),
        type: "ai",
        content: `Appointment confirmed for ${data.time}, ${data.name}! You'll receive a confirmation email at ${data.email}. Anything else I can help with?`,
        timestamp: new Date(),
      },
    ]);
    bookingForm.reset();
  };

  // Voice input for booking form
  const handleVoiceBookingInput = (
    field: keyof z.infer<typeof bookingSchema>,
    value: string
  ) => {
    bookingForm.setValue(field, value);
    bookingForm.trigger(field);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-gray-100 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
              EP
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">EchoPlan</h1>
              <p className="text-sm text-blue-600">
                AI Voice Assistant • {callStatus}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="text-blue-900 hover:bg-blue-50"
            >
              {audioEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
              {callStatus}
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-5xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm transition-all duration-300 ${
                message.type === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-white text-blue-900 border border-blue-100"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.type === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="h-3 w-3 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.isVoice && (
                      <Badge
                        variant="outline"
                        className="text-xs border-blue-200 text-blue-600"
                      >
                        <Mic className="h-2 w-2 mr-1" />
                        Voice
                      </Badge>
                    )}
                    {message.type === "user" && (
                      <CheckCircle className="h-3 w-3 opacity-70" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white text-blue-900 border border-blue-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center">
                  <MessageSquare className="h-3 w-3 text-white" />
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-blue-500">Processing...</span>
              </div>
            </div>
          </div>
        )}

        {isSpeaking && (
          <div className="flex justify-center">
            <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-900">AI is speaking...</span>
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                  <div
                    className="w-1 h-6 bg-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-4 bg-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Input */}
      <div className="p-4 bg-white border-t border-blue-100">
        <div className="max-w-5xl mx-auto">
          {isListening ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <button
                  onClick={stopListening}
                  className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-all duration-300 animate-pulse"
                >
                  <MicOff className="h-8 w-8 text-white" />
                </button>
                <div className="absolute inset-0 rounded-full border-4 border-red-600 animate-ping"></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-blue-900">
                  Listening to you...
                </p>
                <p className="text-xs text-blue-600">
                  Tap to stop or say "stop" to end
                </p>
              </div>
              <div className="flex gap-2">
                {waveform.map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-blue-600 rounded-full transition-all duration-200"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={startListening}
                disabled={isProcessing}
                className="h-12 w-12 rounded-full bg-blue-900 flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mic className="h-6 w-6 text-white" />
              </button>
              <div className="flex-1">
                <p className="text-sm text-blue-600 text-center">
                  Say "book an appointment" or tap the mic to start
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-blue-900">
              Book Your Appointment
            </DialogTitle>
          </DialogHeader>
          <Form {...bookingForm}>
            <form
              onSubmit={bookingForm.handleSubmit(handleBookingSubmit)}
              className="space-y-4"
            >
              <FormField
                control={bookingForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name or say it"
                        className="border-blue-200 focus:border-blue-600 focus:ring-blue-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={bookingForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email or say it"
                        className="border-blue-200 focus:border-blue-600 focus:ring-blue-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={bookingForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">
                      Preferred Time
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border border-blue-200 rounded-md p-2 focus:border-blue-600 focus:ring-blue-600"
                      >
                        <option value="">Select a time</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:30 PM">3:30 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBookingModal(false)}
                  className="border-blue-200 text-blue-900 hover:bg-blue-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-blue-900 hover:bg-blue-800 text-white"
                >
                  Confirm Booking
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="p-2 text-center">
        <p className="text-xs text-blue-600">
          Powered by <span className="font-medium text-blue-900">EchoPlan</span>{" "}
          AI Assistant
        </p>
      </div>
    </div>
  );
}
