import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductCard } from "@/components/ProductCard";

type Step = "purpose" | "recipient" | "demographics" | "type" | "suggestions" | "done";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  options?: string[];
  products?: any[];
}

const suggestedProducts = [
  {
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400",
    name: "Bó Hoa Hồng Phấn Ngọt Ngào",
    price: 420000,
    distance: "1.1km",
    rating: 4.8,
    tags: ["Sinh nhật", "Dễ thương"],
    soldCount: 234,
  },
  {
    image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400",
    name: "Giỏ Hoa Tulip Vàng Rực Rỡ",
    price: 550000,
    originalPrice: 650000,
    distance: "0.9km",
    rating: 4.9,
    tags: ["Khai trương"],
    discount: "-15%",
    soldCount: 189,
  },
  {
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400",
    name: "Bó Hoa Hướng Dương Rạng Rỡ",
    price: 390000,
    originalPrice: 480000,
    distance: "1.3km",
    rating: 4.7,
    tags: ["Năng động"],
    discount: "-19%",
    soldCount: 267,
  },
];

export const ChatBot = () => {
  const [step, setStep] = useState<Step>("purpose");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! 🌸 Tôi sẽ giúp bạn tìm bó hoa hoàn hảo. Bạn muốn tặng hoa nhân dịp gì?",
      isBot: true,
      options: ["Sinh nhật", "Khai trương", "Cảm ơn", "Xin lỗi", "Tỏ tình", "Chia buồn"],
    },
  ]);

  const handleOptionClick = (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let botMessage: Message;
      
      if (step === "purpose") {
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: "Tuyệt vời! Bạn muốn tặng cho ai?",
          isBot: true,
          options: ["Người yêu", "Bạn bè", "Gia đình", "Đồng nghiệp", "Tổ chức/Doanh nghiệp"],
        };
        setStep("recipient");
      } else if (step === "recipient") {
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: "Người nhận là nam hay nữ, và độ tuổi khoảng bao nhiêu?",
          isBot: true,
          options: ["Nam 18-30", "Nam 30-50", "Nam 50+", "Nữ 18-30", "Nữ 30-50", "Nữ 50+", "Không xác định"],
        };
        setStep("demographics");
      } else if (step === "demographics") {
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: "Bạn thích loại hoa nào?",
          isBot: true,
          options: ["Hoa hồng", "Hoa tulip", "Hoa ly", "Hoa lan", "Hoa hướng dương", "Hoa hỗn hợp"],
        };
        setStep("type");
      } else if (step === "type") {
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: "Hoàn tất! 🎉 Dựa trên thông tin bạn cung cấp, tôi gợi ý các bó hoa phù hợp nhất:",
          isBot: true,
          products: suggestedProducts,
        };
        setStep("suggestions");
      } else if (step === "suggestions") {
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: "Bạn có muốn thay đổi hoa hoặc phong cách không?",
          isBot: true,
          options: ["Thay đổi loại hoa", "Thay đổi phong cách", "Tìm lại từ đầu", "Hoàn tất đặt hàng"],
        };
        setStep("done");
      } else {
        // Handle post-suggestion choices
        if (option === "Tìm lại từ đầu") {
          setMessages([
            {
              id: "restart",
              text: "Xin chào! 🌸 Tôi sẽ giúp bạn tìm bó hoa hoàn hảo. Bạn muốn tặng hoa nhân dịp gì?",
              isBot: true,
              options: ["Sinh nhật", "Khai trương", "Cảm ơn", "Xin lỗi", "Tỏ tình", "Chia buồn"],
            },
          ]);
          setStep("purpose");
          return;
        } else {
          botMessage = {
            id: (Date.now() + 1).toString(),
            text: "Tuyệt vời! Chúng tôi sẽ giúp bạn hoàn tất đơn hàng. Cảm ơn bạn đã tin tưởng SIIN Store! 💐",
            isBot: true,
          };
        }
      }
      
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[350px] lg:h-[400px]">
      <ScrollArea className="flex-1 pr-1 lg:pr-2">
        <div className="space-y-3 lg:space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2 lg:space-y-3 animate-fade-in">
              <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] rounded-xl lg:rounded-2xl px-3 lg:px-4 py-2 lg:py-3 ${
                    message.isBot
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 text-foreground border border-primary/20"
                      : "bg-gradient-primary text-primary-foreground shadow-soft"
                  }`}
                >
                  <p className="text-xs lg:text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>

              {message.products && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 lg:gap-2 my-2 lg:my-3">
                  {message.products.map((product, idx) => (
                    <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="relative bg-gradient-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-1.5 lg:p-2 space-y-0.5 lg:space-y-1">
                          <h3 className="font-semibold text-[10px] lg:text-xs text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs lg:text-sm font-bold text-primary">
                              {product.price.toLocaleString("vi-VN")}đ
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] lg:text-xs text-muted-foreground line-through">
                                {product.originalPrice.toLocaleString("vi-VN")}đ
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {message.options && (
                <div className="flex flex-wrap gap-1.5 lg:gap-2">
                  {message.options.map((option, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      variant="outline"
                      size="sm"
                      className="text-[10px] lg:text-xs h-7 lg:h-9 px-2 lg:px-3 rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary transition-all"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
