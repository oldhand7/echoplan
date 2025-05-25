import { AIPhase } from "@/types/assistant";

interface AssistantControlProps {
  phase: AIPhase;
  isActive: boolean;
  currentResponse?: string;
  onClick: () => void;
  className?: string;
}
const PHASE_CONFIG = {
  listening: {
    label: "Listening...",
    base: "bg-primary/20 border-primary",
    pulse: "animate-pulse-gentle bg-primary/20",
    textColor: "text-primary",
  },
  thinking: {
    label: "Thinking",
    base: "bg-amber-500 border-amber-400 hover:bg-amber-600",
    pulse: "animate-spin bg-amber-400",
    textColor: "text-white",
  },
  speaking: {
    label: "AI Speaking...",
    base: "bg-accent/20 border-accent",
    pulse: "animate-pulse-strong bg-accent/20",
    textColor: "text-accent-foreground",
  },
  initializing: {
    label: "Initializing...",
    base: "bg-slate-500 border-slate-400 hover:bg-slate-600",
    pulse: "animate-pulse bg-slate-400",
    textColor: "text-white",
  },
  inactive: {
    label: "Click to Start",
    base: "bg-background border-primary/40 hover:border-primary/70",
    pulse: "",
    textColor: "text-primary",
  },
} as const;

export default function AssistantControl({
  phase,
  isActive,
  currentResponse = "",
  onClick,
  className = "",
}: AssistantControlProps) {
  const config = PHASE_CONFIG[phase];
  const isPaused =
    !isActive && phase === "inactive" && currentResponse.includes("paused");
  const label = isPaused ? "Paused" : config.label;
  const showPulse = isActive && config.pulse;

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        relative group rounded-full w-48 h-48 md:w-60 md:h-60 
        flex items-center justify-center transition-all duration-300 
        border-2 shadow-2xl focus:outline-none focus:ring-4 
        focus:ring-offset-2 focus:ring-primary/70
        ${config.base} ${className}
      `}
    >
      {/* Animated background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent animate-spin-slow" />

      {/* Dynamic pulse effect */}
      {showPulse && (
        <div
          className={`absolute inset-0 rounded-full ${config.pulse} opacity-60`}
        />
      )}

      {/* Content */}
      <span
        className={`relative z-10 font-medium text-base md:text-lg ${config.textColor}`}
      >
        {label}
      </span>
    </button>
  );
}
