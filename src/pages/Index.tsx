import { useState } from "react";
import { LocationSelector } from "@/components/LocationSelector";
import { AnimatedProductCards } from "@/components/AnimatedProductCards";
import { HeroInteraction } from "@/components/HeroInteraction";
import { ProductCard } from "@/components/ProductCard";
import { CompactFlowerCard } from "@/components/CompactFlowerCard";
import { StoryFlowerCard } from "@/components/StoryFlowerCard";
import { AnimatedStoryChat } from "@/components/AnimatedStoryChat";
import { FlowerCategories } from "@/components/FlowerCategories";
import { SimpleFlowerMenu } from "@/components/SimpleFlowerMenu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Gift, Heart, Star, Clock, Calendar, Sparkles, Flower2, Users, Baby } from "lucide-react";
import siinLogo from "@/assets/siin-logo.png";

const Index = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const featuredProducts = [
    {
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400",
      name: "Bó Hoa Hồng Đỏ Sang Trọng",
      price: 520000,
      distance: "1.1km",
      rating: 4.8,
      tags: ["Tình yêu", "Cao cấp"],
      soldCount: 234,
    },
    {
      image: "https://images.unsplash.com/photo-1606634589103-68f8f5605c9e?w=400",
      name: "Lẵng Hoa Khai Trương Mix",
      price: 850000,
      originalPrice: 1000000,
      distance: "0.9km",
      rating: 4.9,
      tags: ["Khai trương", "Sang trọng"],
      discount: "-15%",
      soldCount: 189,
    },
    {
      image: "https://images.unsplash.com/photo-1599289794265-39dd5a6c2d21?w=400",
      name: "Bó Hoa Cưới Trắng Tinh Khôi",
      price: 1200000,
      distance: "1.4km",
      rating: 4.9,
      tags: ["Hoa cưới", "Thanh lịch"],
      soldCount: 156,
    },
    {
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
      name: "Giỏ Hoa Sinh Nhật Tươi Vui",
      price: 420000,
      originalPrice: 520000,
      distance: "2.0km",
      rating: 4.7,
      tags: ["Sinh nhật", "Vui vẻ"],
      discount: "-20%",
      soldCount: 298,
    },
    {
      image: "https://images.unsplash.com/photo-1588363034908-f5cd3b6e5d21?w=400",
      name: "Bó Hoa Tulip Hồng Pastel",
      price: 480000,
      distance: "1.8km",
      rating: 4.6,
      tags: ["Dễ thương", "Ngọt ngào"],
      soldCount: 312,
    },
    {
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400",
      name: "Lẵng Hoa Chúc Mừng Rực Rỡ",
      price: 750000,
      distance: "1.5km",
      rating: 4.8,
      tags: ["Chúc mừng", "Sang trọng"],
      soldCount: 178,
    },
    {
      image: "https://images.unsplash.com/photo-1600378948832-fde35b2501fc?w=400",
      name: "Bó Hoa Lily Trắng Thanh Nhã",
      price: 390000,
      originalPrice: 480000,
      distance: "1.3km",
      rating: 4.7,
      tags: ["Thanh lịch", "Tinh tế"],
      discount: "-19%",
      soldCount: 267,
    },
    {
      image: "https://images.unsplash.com/photo-1522057384400-681b421cfebc?w=400",
      name: "Giỏ Hoa Mix Phong Cách",
      price: 620000,
      distance: "2.1km",
      rating: 4.9,
      tags: ["Đa dạng", "Hiện đại"],
      soldCount: 143,
    },
  ];

  const nearbyStores = [
    { name: "Flower Paradise", distance: "0.5km", rating: 4.9, image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=400" },
    { name: "Blooming Garden", distance: "1.2km", rating: 4.8, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
    { name: "Rose Valley", distance: "1.8km", rating: 4.7, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <LocationSelector onLocationSelect={setDeliveryAddress} />
      
      {/* Header with Menu */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <img src={siinLogo} alt="SIIN Store" className="h-8 w-auto" />
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SIIN Store
              </h1>
            </div>
            {deliveryAddress && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="max-w-xs truncate">{deliveryAddress}</span>
              </div>
            )}
          </div>
          {/* Navigation Menu */}
          <SimpleFlowerMenu />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-accent opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center max-w-7xl mx-auto">
            {/* Left Column - Animated Product Cards */}
            <div className="relative lg:flex hidden min-h-[500px] max-h-[600px] items-center justify-center animate-fade-in">
              <AnimatedProductCards />
            </div>

            {/* Right Column - Content */}
            <div className="space-y-4 lg:space-y-5 max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
                    Gửi Yêu Thương,
                  </span>
                  <br />
                  <span className="text-foreground">Nở Hạnh Phúc</span>
                </h1>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Hệ thống điện hoa với <span className="font-semibold text-primary">1000+ cửa hàng</span> trên toàn quốc. Giao hoa tươi trong <span className="font-semibold text-primary">2 giờ</span> 🌸
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-primary-foreground font-semibold h-12 lg:h-14 rounded-xl shadow-glow group transition-all hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 lg:w-5 h-4 lg:h-5" />
                    <div className="text-left">
                      <div className="font-bold text-xs lg:text-sm">Giao ngay</div>
                      <div className="text-[10px] lg:text-xs opacity-90">Trong 2 giờ</div>
                    </div>
                  </div>
                </Button>

                <Button 
                  variant="outline"
                  className="border-2 border-primary/30 hover:bg-primary/5 text-foreground font-semibold h-12 lg:h-14 rounded-xl group transition-all hover:scale-[1.02] hover:border-primary/50 animate-fade-in"
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
                    <div className="text-left">
                      <div className="font-bold text-xs lg:text-sm">Đặt lịch</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Chọn ngày</div>
                    </div>
                  </div>
                </Button>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <HeroInteraction />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voucher Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative bg-gradient-primary rounded-3xl p-8 shadow-glow hover:scale-105 transition-all duration-300 overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Badge className="bg-white text-primary font-bold px-4 py-1.5 text-sm animate-pulse">🔥 HOT SALE</Badge>
                  <h3 className="text-3xl font-bold text-primary-foreground">Giảm 30%</h3>
                  <p className="text-xl font-semibold text-primary-foreground">Đơn đầu tiên</p>
                  <p className="text-primary-foreground/90 text-sm">Cho khách hàng mới, đơn tối thiểu 300k</p>
                </div>
                <Button size="lg" variant="secondary" className="shrink-0 font-bold shadow-soft">Lấy mã</Button>
              </div>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent rounded-3xl p-8 shadow-soft hover:scale-105 transition-all duration-300 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Badge className="bg-accent text-accent-foreground font-bold px-4 py-1.5 text-sm">✨ MỚI</Badge>
                  <h3 className="text-3xl font-bold text-foreground">Freeship 0đ</h3>
                  <p className="text-xl font-semibold text-foreground">Miễn phí giao hàng</p>
                  <p className="text-muted-foreground text-sm">Bán kính 3km, đơn từ 200k</p>
                </div>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0 font-bold shadow-soft">Lấy mã</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sản phẩm bán chạy */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Sản phẩm bán chạy</h2>
          <Badge className="bg-primary/10 text-primary border-0 ml-2">🔥 HOT</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* Flower Story 3 - Hanoi Autumn */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl p-6 lg:p-8 overflow-hidden relative animate-fade-in">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Left: Story Content + Chat */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-accent/20 text-accent border-0 text-xs mb-3">Câu chuyện mùa thu</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Hoa và Thu Hà Nội</h3>
                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                  Mùa thu Hà Nội, những cánh hoa sữa trắng muốt rơi nhè nhẹ trên phố. Hương thơm ngào ngạt lan tỏa khắp phố phường, mang theo bao kỷ niệm đẹp đẽ của một mùa thu thơ mộng...
                </p>
              </div>
              
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <AnimatedStoryChat />
              </div>

              <Button 
                className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground hover:opacity-90 w-full lg:w-auto"
                onClick={() => window.location.href = '/story/autumn-hanoi'}
              >
                Khám phá
              </Button>
            </div>

            {/* Right: Products - 2 rows x 3 columns */}
            <div className="grid grid-cols-3 gap-3 auto-rows-min">
              {featuredProducts.slice(1, 7).map((product, idx) => (
                <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <StoryFlowerCard 
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hoa Tình Yêu */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Hoa Tình Yêu</h2>
          <Badge className="bg-primary/10 text-primary border-0 ml-2">Bán chạy</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* Flower Story 1 - Winter Romance */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 lg:p-8 overflow-hidden relative animate-fade-in">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Left: Story Content + Chat */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-primary/20 text-primary border-0 text-xs mb-3">Câu chuyện mùa đông</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Hoa & Mùa Đông</h3>
                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                  Mùa đông đến, những bông hoa vẫn nở rộ khắp phố phường. Hương thơm ngào ngạt của hoa lan, sự tinh khôi của hoa loa kèn, và vẻ đẹp sang trọng của hoa hồng Ecuador...
                </p>
              </div>
              
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <AnimatedStoryChat />
              </div>

              <Button 
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 w-full lg:w-auto"
                onClick={() => window.location.href = '/story/winter-romance'}
              >
                Khám phá
              </Button>
            </div>

            {/* Right: Products - 2 rows x 3 columns */}
            <div className="grid grid-cols-3 gap-3 auto-rows-min">
              {featuredProducts.slice(0, 6).map((product, idx) => (
                <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <StoryFlowerCard 
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hoa Chúc Mừng */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Gift className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Hoa Chúc Mừng</h2>
          <Badge className="bg-secondary/10 text-secondary border-0 ml-2">Phổ biến</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(1, 5).map((product, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* Flower Story 2 - Teacher's Day */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-6 lg:p-8 overflow-hidden relative animate-fade-in">
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Left: Products - 2 rows x 3 columns */}
            <div className="grid grid-cols-3 gap-3 auto-rows-min">
              {featuredProducts.slice(0, 6).map((product, idx) => (
                <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <StoryFlowerCard 
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                  />
                </div>
              ))}
            </div>

            {/* Right: Story Content + Chat */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-secondary/20 text-secondary border-0 text-xs mb-3">Câu chuyện 20/11</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Hoa Tri Ân Thầy Cô</h3>
                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                  Ngày 20/11 là dịp để chúng ta bày tỏ lòng biết ơn sâu sắc đến những người thầy, người cô đã dày công dạy dỗ. Một bó hoa tươi thắm chính là món quà ý nghĩa nhất.
                </p>
              </div>
              
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <AnimatedStoryChat />
              </div>

              <Button 
                className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:opacity-90 w-full lg:w-auto"
                onClick={() => window.location.href = '/story/teachers-day'}
              >
                Xem bộ sưu tập
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hoa Sinh Nhật */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Baby className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Hoa Sinh Nhật</h2>
          <Badge className="bg-accent/10 text-accent border-0 ml-2">Yêu thích</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(2, 6).map((product, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* Hoa Cưới */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Flower2 className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Hoa Cưới</h2>
          <Badge className="bg-primary/10 text-primary border-0 ml-2">Cao cấp</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* Flower Categories - New Section */}
      <FlowerCategories />


      {/* Flower Stories - Magazine Style */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Câu chuyện hoa</h2>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Xem tất cả →
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { 
              title: "Hoa hồng đỏ", 
              subtitle: "Tình yêu bất diệt",
              excerpt: "Hoa hồng đỏ luôn là biểu tượng của tình yêu chân thành và đam mê. Mỗi cánh hoa là một lời thì thầm của trái tim...",
              image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
              color: "rose"
            },
            { 
              title: "Hoa tulip", 
              subtitle: "Khởi đầu mới",
              excerpt: "Tulip mang ý nghĩa của sự khởi đầu hoàn hảo và niềm hy vọng. Những đóa tulip tươi thắm như lời chúc phúc cho hành trình mới...",
              image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400",
              color: "yellow"
            },
            { 
              title: "Hoa lan", 
              subtitle: "Sang trọng quý phái",
              excerpt: "Lan là biểu tượng của sự thanh lịch, quyền lực và vẻ đẹp tinh tế. Mỗi cành lan là một tác phẩm nghệ thuật của tự nhiên...",
              image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
              color: "purple"
            },
          ].map((story, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-medium transition-all duration-500 cursor-pointer animate-slide-up bg-card"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="inline-block bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                  <span className="text-xs font-medium text-primary-foreground">{story.subtitle}</span>
                </div>
                <h3 className="font-bold text-xl text-white mb-2">{story.title}</h3>
                <p className="text-sm text-white/80 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{story.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Khách hàng nói gì về chúng tôi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Nguyễn Thu Hà",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
              rating: 5,
              review: "Hoa rất tươi và đẹp! Giao hàng nhanh chóng, đóng gói cẩn thận. Sẽ ủng hộ shop lâu dài.",
              date: "2 ngày trước"
            },
            {
              name: "Trần Minh Anh",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
              rating: 5,
              review: "Đặt hoa sinh nhật cho vợ, bó hoa đẹp hơn mong đợi. Vợ rất thích, cảm ơn shop!",
              date: "5 ngày trước"
            },
            {
              name: "Lê Phương Anh",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
              rating: 5,
              review: "Chất lượng hoa tuyệt vời, giá cả hợp lý. Nhân viên tư vấn nhiệt tình. 10/10!",
              date: "1 tuần trước"
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-gradient-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{review.review}</p>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Store Map */}
      <section className="container mx-auto px-4 py-12 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Cửa hàng gần bạn</h2>
        </div>
        <div className="bg-card rounded-3xl overflow-hidden shadow-medium border border-border">
          <div className="aspect-[21/9] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096825931971!2d105.78253247503176!3d21.028809880629744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86cece9ac5%3A0x8f7433fc9d91fb2d!2zSOG7kyBHxrDGoW0!5e0!3m2!1svi!2s!4v1704967200000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-0 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="grid md:grid-cols-3 gap-4">
              {nearbyStores.map((store, idx) => (
                <div key={idx} className="bg-card rounded-xl p-4 shadow-soft hover:shadow-medium transition-all duration-300">
                  <h4 className="font-semibold text-foreground mb-2">{store.name}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {store.distance}
                    </span>
                    <Badge variant="secondary" className="bg-secondary/50">
                      ⭐ {store.rating}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 FlowerShop. Mang yêu thương đến mọi nhà.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
