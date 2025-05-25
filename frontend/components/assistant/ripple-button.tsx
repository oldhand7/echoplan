import React from "react";
import { RippleConfig } from "@/types/assistant";

interface RippleButtonProps {
  phase: string;
  isSessionActive: boolean;
  currentResponse: string;
  onClick: () => void;
  rippleConfig: Record<string, RippleConfig>;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  phase,
  isSessionActive,
  currentResponse,
  onClick,
  rippleConfig,
}) => {
  const currentRippleConfig = rippleConfig[phase] || rippleConfig.inactive;
  const displayLabel =
    !isSessionActive &&
    phase === "inactive" &&
    currentResponse.includes("paused")
      ? "Paused"
      : currentRippleConfig.label;

  return (
    <button
      onClick={onClick}
      aria-label={displayLabel}
      className={`relative rounded-full w-48 h-48 md:w-60 md:h-60 flex items-center justify-center transition-all duration-300 ease-in-out border-2 shadow-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary/70 ${currentRippleConfig.base} group`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-50 animate-spin-slow group-hover:opacity-75 transition-opacity" />
      {isSessionActive && currentRippleConfig.pulseEffect && (
        <div
          className={`absolute inset-0 rounded-full ${currentRippleConfig.base} ${currentRippleConfig.pulseEffect} opacity-50`}
        />
      )}
      <div className="absolute inset-2 rounded-full bg-background/80 backdrop-blur-sm" />
      <span
        className={`relative z-10 text-center text-base md:text-lg font-medium px-2 ${currentRippleConfig.textColor}`}
      >
        {displayLabel}
      </span>
    </button>
  );
};

export default RippleButton;
