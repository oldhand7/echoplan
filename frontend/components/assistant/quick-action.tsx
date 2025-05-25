import React from "react";
import { Button } from "@/components/ui/button";
import { QuickAction } from "@/types/assistant";

interface QuickActionsProps {
  quickActions: QuickAction[];
  isSessionActive: boolean;
  currentResponse: string;
  onQuickAction: (action: QuickAction) => void;
}

export default function QuickActions({
  quickActions,
  isSessionActive,
  currentResponse,
  onQuickAction,
}: QuickActionsProps) {
  const isSessionPaused = currentResponse.includes("paused");
  const isSessionEnded = currentResponse.includes("ended");
  const shouldShowFooter = isSessionActive || isSessionPaused || isSessionEnded;
  const isActionEnabled = isSessionActive || isSessionPaused;

  if (!shouldShowFooter || !quickActions.length) {
    return null;
  }

  return (
    <footer className="container mx-auto px-4 py-4 sm:py-6 fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground border-secondary/30 py-3 px-2 text-xs sm:text-sm justify-center items-center h-auto focus:ring-secondary"
            onClick={() => onQuickAction(action)}
            disabled={!isActionEnabled}
          >
            {action.icon}
            <span className="ml-1 sm:ml-1.5">{action.label}</span>
          </Button>
        ))}
      </div>
    </footer>
  );
}
