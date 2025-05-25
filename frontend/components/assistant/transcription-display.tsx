import React from "react";
import { ConversationState } from "@/types/assistant";

interface TranscriptionDisplayProps {
  conversation: ConversationState;
  isSessionActive: boolean;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({
  conversation,
  isSessionActive,
}) => {
  return (
    <div className="mt-8 text-center w-full max-w-xl lg:max-w-2xl space-y-3 px-2">
      <p className="text-muted-foreground text-sm md:text-base italic min-h-[1.5em] transition-opacity duration-300">
        {conversation.userMessage ||
          (conversation.phase === "listening" && isSessionActive
            ? "Listening..."
            : "\u00A0")}
      </p>
      <p className="text-lg md:text-xl font-semibold text-foreground min-h-[2.5em] md:min-h-[3em] transition-opacity duration-300">
        {conversation.currentResponse}
      </p>
    </div>
  );
};

export default TranscriptionDisplay;
