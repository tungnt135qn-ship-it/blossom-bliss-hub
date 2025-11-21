import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface FloatingCartProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function FloatingCart({ isOpen: controlledOpen, onClose }: FloatingCartProps = {}) {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled 
    ? (value: boolean) => !value && onClose?.()
    : setInternalOpen;

  if (itemCount === 0 && !isControlled) return null;

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-glow bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 group"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 bg-destructive text-destructive-foreground animate-pulse">
                {itemCount}
              </Badge>
            </div>
          </Button>
        </SheetTrigger>
      )}

      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Giỏ hàng của bạn
            <Badge variant="secondary">{itemCount} sản phẩm</Badge>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card rounded-lg p-4 shadow-soft">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                  {item.variant && (
                    <p className="text-xs text-muted-foreground">{item.variant}</p>
                  )}
                  {item.accessories && item.accessories.length > 0 && (
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {item.accessories.map((acc) => (
                        <div key={acc.id} className="flex items-center justify-between">
                          <span>+ {acc.name}</span>
                          <span>+{acc.price.toLocaleString("vi-VN")}đ</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">
                      {item.price.toLocaleString("vi-VN")}đ
                      {item.accessories && item.accessories.length > 0 && (
                        <span className="text-xs ml-1">
                          (+{item.accessories.reduce((sum, acc) => sum + acc.price, 0).toLocaleString("vi-VN")}đ)
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-right">
                    Tổng: {((item.price + (item.accessories?.reduce((sum, acc) => sum + acc.price, 0) || 0)) * item.quantity).toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border px-6 py-4 space-y-4 bg-muted/30">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính:</span>
              <span className="font-semibold">{total.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Phí vận chuyển:</span>
              <span className="font-semibold text-primary">Miễn phí</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Tổng cộng:</span>
              <span className="font-bold text-2xl text-primary">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            onClick={handleCheckout}
          >
            Thanh toán ({itemCount})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
