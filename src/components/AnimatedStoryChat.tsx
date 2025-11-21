import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  sender: "left" | "right";
  text: string;
  avatar: string;
}

interface ChatScenario {
  messages: Message[];
}

const chatScenarios: ChatScenario[] = [
  {
    messages: [
      { id: 1, sender: "left", text: "Em ơi, hôm nay là kỷ niệm 1 năm yêu nhau đấy!", avatar: "👨" },
      { id: 2, sender: "right", text: "Anh nhớ à? Em tưởng anh quên rồi 😊", avatar: "👩" },
      { id: 3, sender: "left", text: "Làm sao quên được! Anh đã chuẩn bị món quà đặc biệt rồi", avatar: "👨" },
      { id: 4, sender: "right", text: "Là gì thế? Em tò mò quá!", avatar: "👩" },
      { id: 5, sender: "left", text: "Một bó hoa hồng đỏ thắm, như tình yêu của anh dành cho em 🌹", avatar: "👨" },
    ],
  },
  {
    messages: [
      { id: 1, sender: "left", text: "Chị ơi, ngày mai là sinh nhật mẹ rồi!", avatar: "👦" },
      { id: 2, sender: "right", text: "Ừa, em định mua quà gì cho mẹ?", avatar: "👧" },
      { id: 3, sender: "left", text: "Em nghĩ mua hoa. Mẹ thích hoa lắm mà", avatar: "👦" },
      { id: 4, sender: "right", text: "Ý hay đấy! Mua hoa lily trắng đi, thanh lịch lắm", avatar: "👧" },
      { id: 5, sender: "left", text: "Ok, để anh đặt ngay. Mẹ sẽ vui lắm!", avatar: "👦" },
    ],
  },
  {
    messages: [
      { id: 1, sender: "right", text: "Anh ơi, shop của chị Lan khai trương tuần sau", avatar: "👩" },
      { id: 2, sender: "left", text: "Vậy à? Mình nên tặng gì đây?", avatar: "👨" },
      { id: 3, sender: "right", text: "Tặng lẵng hoa đi anh, vừa đẹp vừa sang", avatar: "👩" },
      { id: 4, sender: "left", text: "Ý hay! Lẵng hoa khai trương to và rực rỡ nhé", avatar: "👨" },
      { id: 5, sender: "right", text: "Ừ, để em đặt lẵng mix nhiều màu, chắc chị ấy thích lắm!", avatar: "👩" },
    ],
  },
];

export const AnimatedStoryChat = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset when scenario changes
    setVisibleMessages([]);
    setIsComplete(false);

    const scenario = chatScenarios[currentScenario];
    let messageIndex = 0;
    let isActive = true;

    const showNextMessage = () => {
      if (!isActive || messageIndex >= scenario.messages.length) {
        return;
      }

      const message = scenario.messages[messageIndex];
      if (!message) {
        return;
      }

      setVisibleMessages(prev => [...prev, message.id]);
      messageIndex++;
      
      if (messageIndex < scenario.messages.length) {
        // Random delay between 3-5 seconds
        const delay = 3000 + Math.random() * 2000;
        setTimeout(showNextMessage, delay);
      } else {
        // All messages shown, mark as complete
        setIsComplete(true);
        
        // Wait 10 seconds before switching to next scenario
        setTimeout(() => {
          if (isActive) {
            setCurrentScenario((prev) => (prev + 1) % chatScenarios.length);
          }
        }, 10000);
      }
    };

    // Start showing messages after a brief delay
    setTimeout(showNextMessage, 500);

    return () => {
      isActive = false;
    };
  }, [currentScenario]);

  const scenario = chatScenarios[currentScenario];

  return (
    <div className="space-y-3">
      {scenario.messages.map((message) => {
        const isVisible = visibleMessages.includes(message.id);
        
        return (
          <div
            key={message.id}
            className={cn(
              "flex gap-2 items-start transition-all duration-500",
              message.sender === "right" ? "flex-row-reverse" : "flex-row",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <div className="text-2xl shrink-0">{message.avatar}</div>
            <div
              className={cn(
                "rounded-2xl px-4 py-2 max-w-[80%] shadow-sm",
                message.sender === "left"
                  ? "bg-muted text-foreground rounded-tl-none"
                  : "bg-primary text-primary-foreground rounded-tr-none"
              )}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
