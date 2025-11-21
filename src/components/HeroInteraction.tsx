import { ChatBot } from "./ChatBot";
import { Sparkles } from "lucide-react";

export const HeroInteraction = () => {
  return (
    <div className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl rounded-xl lg:rounded-2xl border border-primary/30 shadow-soft overflow-hidden max-h-[420px] lg:max-h-[480px] flex flex-col">
      <div className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 border-b border-border/30 bg-primary/5 flex-shrink-0">
        <Sparkles className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-primary animate-pulse" />
        <span className="font-semibold text-xs lg:text-sm text-foreground">Trợ lý tìm hoa AI</span>
      </div>
      <div className="p-3 lg:p-4 overflow-auto flex-1">
        <ChatBot />
      </div>
    </div>
  );
};
