import React from "react";
import { Button } from "@/components/ui/button";
import { QuickAction } from "@/types/assistant";

interface QuickActionsFooterProps {
  quickActions: QuickAction[];
  isSessionActive: boolean;
  currentResponse: string;
  handleQuickAction: (action: QuickAction) => void;
}

const QuickActionsFooter: React.FC<QuickActionsFooterProps> = ({
  quickActions,
  isSessionActive,
  currentResponse,
  handleQuickAction,
}) => {
  return (
    (isSessionActive ||
      currentResponse.includes("paused") ||
      currentResponse.includes("ended")) && (
      <footer className="container mx-auto px-4 py-4 sm:py-6 fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground border-secondary/30 py-3 px-2 text-xs sm:text-sm justify-center items-center h-auto focus:ring-secondary"
              onClick={() => handleQuickAction(action)}
              disabled={!isSessionActive && !currentResponse.includes("paused")}
            >
              {action.icon}
              <span className="ml-1 sm:ml-1.5">{action.label}</span>
            </Button>
          ))}
        </div>
      </footer>
    )
  );
};

export default QuickActionsFooter;
