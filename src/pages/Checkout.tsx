import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, CreditCard, Wallet, Building, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Tên phải có ít nhất 2 ký tự").max(100, "Tên không được quá 100 ký tự"),
  phone: z.string().trim().regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  address: z.string().trim().min(10, "Địa chỉ phải có ít nhất 10 ký tự").max(500, "Địa chỉ không được quá 500 ký tự"),
  note: z.string().max(500, "Ghi chú không được quá 500 ký tự").optional(),
});

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingFee = 0;
  const finalTotal = total + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    try {
      checkoutSchema.parse(formData);
      setErrors({});

      // Process order
      toast({
        title: "Đặt hàng thành công! 🎉",
        description: `Đơn hàng của bạn sẽ được giao trong ${deliveryTime === "asap" ? "2 giờ" : "thời gian bạn chọn"}.`,
      });

      clearCart();
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Vui lòng kiểm tra lại thông tin",
          description: "Có một số trường chưa hợp lệ",
          variant: "destructive",
        });
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold">Giỏ hàng trống</h2>
          <p className="text-muted-foreground">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục</p>
          <Button onClick={() => navigate("/")}>Quay về trang chủ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Thanh toán</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Info */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Thông tin giao hàng
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Họ và tên người nhận *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912345678"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      rows={3}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <Label htmlFor="note">Ghi chú</Label>
                    <Textarea
                      id="note"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Lời nhắn cho người bán, yêu cầu đặc biệt..."
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              {/* Delivery Time */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Thời gian giao hàng</h2>
                <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value="asap" id="asap" />
                    <Label htmlFor="asap" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Giao ngay (trong 2 giờ)</div>
                      <p className="text-sm text-muted-foreground">Nhanh nhất có thể</p>
                    </Label>
                    <Badge className="bg-primary/10 text-primary border-0">Khuyến nghị</Badge>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value="schedule" id="schedule" />
                    <Label htmlFor="schedule" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Đặt lịch giao</div>
                      <p className="text-sm text-muted-foreground">Chọn ngày giờ cụ thể</p>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Phương thức thanh toán
                </h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        <span className="font-semibold">Thanh toán khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">Tiền mặt hoặc quẹt thẻ</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span className="font-semibold">Chuyển khoản ngân hàng</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">Miễn phí, nhận hàng nhanh</p>
                    </Label>
                    <Badge className="bg-primary/10 text-primary border-0">-2%</Badge>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-pink-500" />
                        <span className="font-semibold">Ví MoMo</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">Thanh toán qua ví điện tử</p>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
              
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h4>
                      <p className="text-sm font-semibold text-primary">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính:</span>
                  <span className="font-semibold">{total.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển:</span>
                  <span className="font-semibold text-primary">Miễn phí</span>
                </div>
                {paymentMethod === "bank" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Giảm giá (-2%):</span>
                    <span className="font-semibold text-primary">
                      -{Math.round(total * 0.02).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Tổng cộng:</span>
                <span className="text-2xl font-bold text-primary">
                  {paymentMethod === "bank"
                    ? Math.round(finalTotal * 0.98).toLocaleString("vi-VN")
                    : finalTotal.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
                onClick={handleSubmit}
              >
                Đặt hàng
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của chúng tôi
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
