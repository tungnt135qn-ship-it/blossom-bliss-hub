import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, Star, Heart, Share2, ArrowLeft, ShoppingCart, 
  Clock, CheckCircle, Gift, Truck, Phone, MessageCircle, Check 
} from "lucide-react";
import { useCart, Accessory } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { FloatingCart } from "@/components/FloatingCart";
import { AccessorySelector } from "@/components/AccessorySelector";

// Mock product data - trong thực tế sẽ fetch từ API
const mockProducts = {
  "1": {
    id: "1",
    name: "Bó Hoa Hồng Đỏ Sang Trọng",
    price: 520000,
    originalPrice: 650000,
    images: [
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800",
      "https://images.unsplash.com/photo-1566003094697-63d2e6b73227?w=800",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800",
      "https://images.unsplash.com/photo-1606034998374-4effdddbf48a?w=800",
    ],
    rating: 4.8,
    reviewCount: 156,
    soldCount: 234,
    distance: "1.1km",
    tags: ["Tình yêu", "Cao cấp", "Bán chạy"],
    description: "Bó hoa hồng đỏ cao cấp Ecuador nhập khẩu, tượng trưng cho tình yêu nồng cháy. Hoa tươi 100%, được chăm sóc cẩn thận từ khâu chọn lọc đến đóng gói. Thích hợp làm quà tặng cho người yêu, vợ trong các dịp đặc biệt.",
    features: [
      "15-20 bông hoa hồng đỏ Ecuador cao cấp",
      "Giấy gói sang trọng, thiệp chúc mừng miễn phí",
      "Độ tươi đảm bảo 5-7 ngày",
      "Giao hàng nhanh trong 2 giờ",
      "Hỗ trợ đổi trả trong 24h nếu không hài lòng"
    ],
    storeName: "Flower Paradise",
    storeRating: 4.9,
    deliveryImages: [
      "https://images.unsplash.com/photo-1606800052052-3d9472d20a77?w=400",
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400",
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400",
      "https://images.unsplash.com/photo-1566003094697-63d2e6b73227?w=400",
    ],
    reviews: [
      {
        id: 1,
        name: "Nguyễn Thu Hà",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        rating: 5,
        date: "2 ngày trước",
        comment: "Hoa rất tươi và đẹp! Giao hàng nhanh, đóng gói cẩn thận. Người yêu rất thích!",
        images: ["https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200"]
      },
      {
        id: 2,
        name: "Trần Minh Anh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        rating: 5,
        date: "5 ngày trước",
        comment: "Chất lượng tuyệt vời, đúng như mô tả. Sẽ ủng hộ shop lâu dài!",
        images: []
      },
      {
        id: 3,
        name: "Lê Phương Anh",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        rating: 4,
        date: "1 tuần trước",
        comment: "Hoa đẹp, giá hợp lý. Chỉ tiếc là giao hơi muộn 30 phút.",
        images: []
      }
    ]
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, itemCount } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedAccessories, setSelectedAccessories] = useState<(Accessory & { message?: string })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [accessorySelectorOpen, setAccessorySelectorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const accessoryCategories = [
    {
      id: "card",
      name: "Thiệp chúc mừng",
      basePrice: 15000,
      options: [
        { id: "card-1", name: "Thiệp hoa hồng", price: 15000, image: "https://images.unsplash.com/photo-1543949806-2c9935e6aa78?w=300" },
        { id: "card-2", name: "Thiệp sang trọng", price: 20000, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300" },
        { id: "card-3", name: "Thiệp thiết kế đặc biệt", price: 25000, image: "https://images.unsplash.com/photo-1520923376567-231d9d4ab936?w=300" },
      ]
    },
    {
      id: "decoration",
      name: "Phụ kiện trang trí",
      basePrice: 30000,
      options: [
        { id: "deco-1", name: "Nơ lụa cao cấp", price: 30000, image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300" },
        { id: "deco-2", name: "Phụ kiện kim tuyến", price: 40000, image: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=300" },
        { id: "deco-3", name: "Set trang trí đặc biệt", price: 50000, image: "https://images.unsplash.com/photo-1511499008188-de491bbbae98?w=300" },
      ]
    },
    {
      id: "teddy",
      name: "Gấu bông",
      basePrice: 120000,
      options: [
        { id: "teddy-1", name: "Gấu bông 20cm", price: 120000, image: "https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=300" },
        { id: "teddy-2", name: "Gấu bông 30cm", price: 180000, image: "https://images.unsplash.com/photo-1551515240-3b9d8fc07e35?w=300" },
        { id: "teddy-3", name: "Gấu bông 40cm cao cấp", price: 250000, image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=300" },
      ]
    },
  ];

  // Get product data
  const product = mockProducts[id as keyof typeof mockProducts] || mockProducts["1"];

  // Auto-switch images
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [product.images.length]);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setAccessorySelectorOpen(true);
  };

  const handleAccessoryConfirm = (accessory: Accessory & { message?: string }) => {
    setSelectedAccessories(prev => {
      // Remove any existing accessory from same category
      const filtered = prev.filter(a => !a.id.startsWith(selectedCategory.id));
      return [...filtered, accessory];
    });
  };

  const removeAccessory = (id: string) => {
    setSelectedAccessories(prev => prev.filter(a => a.id !== id));
  };

  const accessoriesTotal = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
  const totalPrice = product.price + accessoriesTotal;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      accessories: selectedAccessories.length > 0 ? selectedAccessories : undefined
    });
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.name}`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Chi tiết sản phẩm</h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 text-sm font-bold">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
              <Badge className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 text-sm">
                {selectedImage + 1}/{product.images.length}
              </Badge>
            </div>

            <AccessorySelector
              open={accessorySelectorOpen}
              onOpenChange={setAccessorySelectorOpen}
              category={selectedCategory}
              onConfirm={handleAccessoryConfirm}
            />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Số lượng:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4"
                  >
                    -
                  </Button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ
                </Button>
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80"
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <Button variant="outline" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>100% hoa tươi, nguồn gốc rõ ràng</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Giao hàng nhanh trong 2 giờ</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-5 h-5 text-primary" />
                  <span>Thiệp chúc mừng miễn phí</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Miễn phí giao hàng bán kính 3km</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Mô tả sản phẩm</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="store">Cửa hàng</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6 mt-6">
            {/* Delivery Images Gallery */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Hình ảnh giao hoa thực tế</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hình ảnh hoa được chụp khi giao đến tay khách hàng
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.deliveryImages?.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square rounded-lg overflow-hidden border border-border hover:shadow-md transition-all cursor-pointer group"
                  >
                    <img 
                      src={img} 
                      alt={`Giao hoa ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Thông tin chi tiết</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
              <h4 className="font-semibold mb-3">Đặc điểm nổi bật:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-1">{product.rating}</div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-secondary text-secondary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">{product.reviewCount} đánh giá</div>
                </div>
                <Separator orientation="vertical" className="h-16" />
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm w-12">{stars} sao</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{
                            width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {product.reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-secondary text-secondary" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-3">{review.comment}</p>
                    {review.images.length > 0 && (
                      <div className="flex gap-2">
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Review ${idx + 1}`}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="store" className="mt-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {product.storeName[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{product.storeName}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-semibold">{product.storeRating}</span>
                    <span className="text-muted-foreground">(500+ đánh giá)</span>
                  </div>
                </div>
                <Button>Xem cửa hàng</Button>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center py-4 border-t border-b border-border">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">1.2k</div>
                  <div className="text-sm text-muted-foreground">Sản phẩm</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">15k</div>
                  <div className="text-sm text-muted-foreground">Đã bán</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Phản hồi</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <FloatingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
