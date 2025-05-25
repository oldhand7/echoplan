import { ConversationState } from "@/types/assistant";

export default function TranscriptionDisplay({
  conversation,
}: {
  conversation: ConversationState;
}) {
  const { userMessage, currentResponse, phase, isSessionActive } = conversation;

  const userText =
    userMessage ||
    (phase === "listening" && isSessionActive ? "Listening..." : "\u00A0");

  return (
    <div className="mt-8 text-center w-full max-w-xl lg:max-w-2xl space-y-3 px-2">
      <p className="text-muted-foreground text-sm md:text-base italic min-h-[1.5em] transition-opacity duration-300">
        {userText}
      </p>
      <p className="text-lg md:text-xl font-semibold text-foreground min-h-[2.5em] md:min-h-[3em] transition-opacity duration-300">
        {currentResponse}
      </p>
    </div>
  );
}
