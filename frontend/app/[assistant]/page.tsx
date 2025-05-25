"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { CalendarPlus, Clock, Briefcase, PhoneCall } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/layout/header";
import RippleButton from "@/components/assistant/assistant-control";
import TranscriptionDisplay from "@/components/assistant/transcription-display";
import QuickActions from "@/components/assistant/quick-action";
import { ConversationState, QuickAction } from "@/types/assistant";

const quickActions: QuickAction[] = [
  {
    id: "book",
    label: "New Appointment",
    icon: <CalendarPlus className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
    prompt: "I want to book an appointment",
  },
  {
    id: "availability",
    label: "Check Availability",
    icon: <Clock className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
    prompt: "What times are available?",
  },
  {
    id: "services",
    label: "Our Services",
    icon: <Briefcase className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
    prompt: "What services do you offer?",
  },
  {
    id: "contact",
    label: "Contact Info",
    icon: <PhoneCall className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />,
    prompt: "How can I contact you?",
  },
];

export default function AssistantPage() {
  const [conversation, setConversation] = useState<ConversationState>({
    phase: "inactive",
    currentResponse:
      "Welcome! Click the central orb to begin your voice-first scheduling session.",
    userMessage: "",
    bookingDetails: { name: null, email: null, time: null },
    isSessionActive: false,
  });
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [audioOutputEnabled] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const conversationRef = useRef(conversation);

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      speechSynthesis.cancel();
    };
  }, []);

  const speakText = useCallback(
    (text: string, onEndCallback?: () => void) => {
      if (!audioOutputEnabled || !("speechSynthesis" in window)) {
        toast.error("Speech synthesis not available or disabled.");
        setConversation((prev) => ({
          ...prev,
          phase: "listening",
          currentResponse: text,
        }));
        onEndCallback?.();
        return;
      }

      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.98;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;

      setConversation((prev) => ({
        ...prev,
        phase: "speaking",
        currentResponse: text,
        userMessage: "",
      }));

      utterance.onend = () => {
        if (conversationRef.current.phase === "speaking") {
          setConversation((prev) => ({ ...prev, phase: "listening" }));
          if (isSessionActive && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.warn("Recognition restart failed:", e);
            }
          }
        }
        onEndCallback?.();
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        toast.error("Failed to articulate the response.");
        setConversation((prev) => ({ ...prev, phase: "listening" }));
        onEndCallback?.();
      };

      speechSynthesis.speak(utterance);
    },
    [audioOutputEnabled, isSessionActive],
  );

  const processUserSpeech = useCallback(
    (transcript: string) => {
      const currentBookingDetails = conversationRef.current.bookingDetails;
      let aiResponse = "";
      let updatedBookingDetails = { ...currentBookingDetails };
      const input = transcript.toLowerCase().trim();

      const isBookingConfirmationPending =
        updatedBookingDetails.name &&
        updatedBookingDetails.email &&
        updatedBookingDetails.time &&
        updatedBookingDetails.name !== "" &&
        updatedBookingDetails.email !== "" &&
        updatedBookingDetails.time !== "";

      if (
        input.startsWith("book") ||
        input.startsWith("schedule") ||
        input.includes("appointment") ||
        (updatedBookingDetails.name === "" && !isBookingConfirmationPending) ||
        (updatedBookingDetails.email === "" && !isBookingConfirmationPending) ||
        (updatedBookingDetails.time === "" && !isBookingConfirmationPending)
      ) {
        if (
          updatedBookingDetails.name === null ||
          (input.startsWith("book") && updatedBookingDetails.name !== "")
        ) {
          aiResponse =
            "Sure, I can help with that. May I have your full name, please?";
          updatedBookingDetails = { name: "", email: null, time: null };
        } else if (
          updatedBookingDetails.name === "" &&
          updatedBookingDetails.email === null
        ) {
          updatedBookingDetails.name = transcript;
          aiResponse = `Got it, ${transcript}. What's your email address?`;
          updatedBookingDetails.email = "";
        } else if (
          updatedBookingDetails.email === "" &&
          updatedBookingDetails.time === null
        ) {
          updatedBookingDetails.email = input;
          aiResponse = `Thanks! And for what date and time would you like to book the appointment?`;
          updatedBookingDetails.time = "";
        } else if (updatedBookingDetails.time === "") {
          updatedBookingDetails.time = transcript;
          aiResponse = `Okay, I have a booking for ${updatedBookingDetails.name}, email ${updatedBookingDetails.email}, for ${updatedBookingDetails.time}. Is that correct? Please say yes or no.`;
        } else if (isBookingConfirmationPending) {
          if (input.includes("yes")) {
            aiResponse = `Great! Your appointment for ${updatedBookingDetails.time} is booked. Thank you, ${updatedBookingDetails.name}! Anything else?`;
            updatedBookingDetails = { name: null, email: null, time: null };
          } else if (input.includes("no")) {
            aiResponse =
              "Okay, let's try booking that again. What's your full name, please?";
            updatedBookingDetails = { name: "", email: null, time: null };
          } else {
            aiResponse = `Sorry, I didn't catch a 'yes' or 'no'. Is the booking for ${updatedBookingDetails.name} at ${updatedBookingDetails.time} correct?`;
          }
        } else {
          if (updatedBookingDetails.name === "")
            aiResponse =
              "Sorry, I was expecting your name. Could you please provide your full name?";
          else if (updatedBookingDetails.email === "")
            aiResponse =
              "My apologies, I was waiting for your email address. Could you please provide it?";
          else if (updatedBookingDetails.time === "")
            aiResponse =
              "Sorry, I needed the date and time for the appointment. Could you provide that?";
          else
            aiResponse =
              "I'm a bit confused. Could you clarify what you'd like to do with the booking?";
        }
      } else if (input.includes("yes") && isBookingConfirmationPending) {
        aiResponse = `Great! Your appointment for ${updatedBookingDetails.time} is booked. Thank you, ${updatedBookingDetails.name}! Is there anything else I can help you with today?`;
        updatedBookingDetails = { name: null, email: null, time: null };
      } else if (input.includes("no") && isBookingConfirmationPending) {
        aiResponse =
          "Okay, let's start over with the booking. What's your full name, please?";
        updatedBookingDetails = { name: "", email: null, time: null };
      } else if (input.includes("hello") || input.includes("hi")) {
        aiResponse = "Hello! How can I assist you with your scheduling today?";
      } else if (
        input.includes("available times") ||
        input.includes("check availability")
      ) {
        aiResponse =
          "We have openings on Monday at 10 AM, Wednesday at 2 PM, and Friday at 11 AM. Would any of those work for you?";
      } else if (
        input.includes("services") ||
        input.includes("what do you offer")
      ) {
        aiResponse =
          "We offer AI-powered voice scheduling, consultation call booking, and automated reminders. Would you like to book something or check availability?";
      } else if (input.includes("thank you") || input.includes("thanks")) {
        aiResponse = "You're very welcome! Is there anything else?";
      } else if (
        input.includes("bye") ||
        input.includes("goodbye") ||
        input.includes("stop")
      ) {
        aiResponse = "Goodbye! Have a great day.";
        setIsSessionActive(false);
        if (recognitionRef.current) recognitionRef.current.stop();
        setConversation((prev) => ({
          ...prev,
          phase: "inactive",
          currentResponse: "Session ended. Click the orb to start a new one.",
        }));
        return;
      } else {
        aiResponse =
          "I can help with booking appointments or checking availability. What would you like to do?";
      }

      setConversation((prev) => ({
        ...prev,
        bookingDetails: updatedBookingDetails,
      }));
      speakText(aiResponse);
    },
    [speakText],
  );

  const initializeSpeechRecognition = useCallback(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      speakText(
        "Speech recognition is not supported in your browser. Please try a different browser like Chrome or Edge.",
      );
      setConversation((prev) => ({ ...prev, phase: "inactive" }));
      setIsSessionActive(false);
      return false;
    }

    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }

    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }

      const currentFullTranscript = interimTranscript + finalTranscript;
      setConversation((prev) => ({
        ...prev,
        userMessage: currentFullTranscript,
      }));

      if (
        currentFullTranscript.trim() &&
        conversationRef.current.phase === "speaking"
      ) {
        console.log("User interruption detected.");
        speechSynthesis.cancel();
        setConversation((prev) => ({ ...prev, phase: "listening" }));
      }

      if (finalTranscript.trim()) {
        console.log("Final transcript:", finalTranscript.trim());
        processUserSpeech(finalTranscript.trim());
      }
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error, event.message);
      let errorMsg = "An unexpected speech error occurred.";
      if ((event.error as string) === "no-speech") {
        return;
      } else if (event.error === "audio-capture") {
        errorMsg = "Microphone issue. Please check connection and permissions.";
        setIsSessionActive(false);
      } else if (event.error === "not-allowed") {
        errorMsg =
          "Microphone access denied. Please enable it in your browser settings.";
        setIsSessionActive(false);
        setConversation((prev) => ({
          ...prev,
          phase: "inactive",
          currentResponse: errorMsg,
        }));
        return;
      }
      if ((event.error as string) !== "no-speech") {
        speakText(errorMsg, () => {
          setConversation((prev) => ({
            ...prev,
            phase: isSessionActive ? "listening" : "inactive",
          }));
        });
      }
    };

    recognitionRef.current.onend = () => {
      console.log("Speech recognition ended.");
      if (isSessionActive && conversationRef.current.phase === "listening") {
        try {
          recognitionRef.current?.start();
        } catch (e) {
          console.warn("Could not restart recognition:", e);
        }
      }
    };
    return true;
  }, [speakText, processUserSpeech, isSessionActive]);

  const startSession = async () => {
    setConversation((prev) => ({
      ...prev,
      phase: "initializing",
      currentResponse: "Connecting to voice services...",
    }));
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      const initialized = initializeSpeechRecognition();
      if (initialized && recognitionRef.current) {
        setIsSessionActive(true); // Set active only if fully initialized
        recognitionRef.current.start();
        speakText(
          "Welcome! I'm ready to assist. How can I help you schedule today?",
          () => {
            setConversation((prev) => ({ ...prev, phase: "listening" }));
          },
        );
      } else {
        // Initialization failed or recognitionRef is not available.
        stream.getTracks().forEach((track) => track.stop()); // Use the stream by stopping its tracks
        setIsSessionActive(false); // Ensure session is not active

        // If initializeSpeechRecognition returned false, it should have handled user feedback.
        // Provide a fallback message if the phase still indicates 'initializing',
        // meaning initializeSpeechRecognition didn't set a specific error message and inactive phase.
        if (conversationRef.current.phase === "initializing") {
          setConversation((prev) => ({
            ...prev,
            phase: "inactive",
            currentResponse:
              "Voice service initialization failed. Please try again.",
          }));
        }
      }
    } catch (error: unknown) {
      console.error("Microphone access error:", error);
      let message = "Microphone access required. Please grant permission.";
      if (error instanceof Error && error.name === "NotAllowedError") {
        message =
          "Microphone access denied. Please enable it in your browser settings.";
      } else if (error instanceof Error && error.name === "NotFoundError") {
        message = "No microphone found. Please connect one and try again.";
      }
      setConversation((prev) => ({
        ...prev,
        phase: "inactive",
        currentResponse: message,
      }));
      setIsSessionActive(false);
    }
  };

  const pauseSession = () => {
    setIsSessionActive(false);
    speechSynthesis.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    setConversation((prev) => ({
      ...prev,
      phase: "inactive",
      currentResponse: "Session paused. Click the orb to resume.",
      userMessage: "",
    }));
  };

  const resumeSession = () => {
    setIsSessionActive(true);
    setConversation((prev) => ({
      ...prev,
      phase: "listening",
      currentResponse: "Resumed. Listening...",
    }));
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Error resuming recognition:", e);
        initializeSpeechRecognition();
        recognitionRef.current?.start();
      }
    } else {
      toast.error(
        "Speech recognition not initialized. Please start a new session.",
      );
    }
  };

  const handleCentralButtonClick = () => {
    if (
      !isSessionActive &&
      conversation.phase === "inactive" &&
      !conversation.currentResponse.includes("paused")
    ) {
      startSession();
    } else if (isSessionActive) {
      pauseSession();
    } else if (
      !isSessionActive &&
      conversation.phase === "inactive" &&
      conversation.currentResponse.includes("paused")
    ) {
      resumeSession();
    } else {
      pauseSession();
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    if (!isSessionActive) {
      toast.info(
        "Please start or resume the voice session to use quick actions.",
      );
      return;
    }
    if (conversation.phase === "speaking") {
      speechSynthesis.cancel();
    }
    setConversation((prev) => ({
      ...prev,
      userMessage: `Quick action: ${action.label}`,
      phase: "listening",
    }));
    processUserSpeech(action.prompt);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-1 item-center justify-center">
        <div className="relative flex flex-col items-center justify-center space-y-6 w-full">
          <RippleButton
            phase={conversation.phase}
            isActive={isSessionActive}
            currentResponse={conversation.currentResponse}
            onClick={handleCentralButtonClick}
          />
          <TranscriptionDisplay conversation={conversation} />
        </div>
      </main>
      <QuickActions
        quickActions={quickActions}
        isSessionActive={isSessionActive}
        currentResponse={conversation.currentResponse}
        onQuickAction={handleQuickAction}
      />
    </div>
  );
}
