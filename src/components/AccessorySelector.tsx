import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { Accessory } from "@/contexts/CartContext";

interface AccessoryOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface AccessoryCategory {
  id: string;
  name: string;
  basePrice: number;
  options: AccessoryOption[];
}

interface AccessorySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: AccessoryCategory | null;
  onConfirm: (accessory: Accessory & { message?: string }) => void;
}

export function AccessorySelector({ open, onOpenChange, category, onConfirm }: AccessorySelectorProps) {
  const [selectedOption, setSelectedOption] = useState<AccessoryOption | null>(null);
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    if (!category || !selectedOption) return;
    
    onConfirm({
      id: `${category.id}-${selectedOption.id}`,
      name: selectedOption.name,
      price: selectedOption.price,
      message: message || undefined,
    });
    
    // Reset state
    setSelectedOption(null);
    setMessage("");
    onOpenChange(false);
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Chọn {category.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Options Grid */}
          <div>
            <Label className="text-sm mb-3 block">Chọn sản phẩm:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {category.options.map((option) => {
                const isSelected = selectedOption?.id === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img 
                      src={option.image} 
                      alt={option.name}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white text-xs font-medium line-clamp-1">{option.name}</p>
                      <p className="text-white text-sm font-bold">
                        +{option.price.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Input */}
          <div>
            <Label htmlFor="message" className="text-sm mb-2 block">
              Lời nhắn (tùy chọn):
            </Label>
            <Textarea
              id="message"
              placeholder="Viết lời nhắn của bạn tại đây..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Lời nhắn sẽ được in trên {category.name.toLowerCase()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button 
              className="flex-1 bg-primary"
              onClick={handleConfirm}
              disabled={!selectedOption}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
