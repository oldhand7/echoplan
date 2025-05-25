export type AIPhase = "inactive" | "initializing" | "listening" | "speaking";

export interface ConversationState {
  phase: AIPhase;
  currentResponse: string;
  userMessage: string;
  bookingDetails: {
    name: string | null;
    email: string | null;
    time: string | null;
  };
  isSessionActive: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}
