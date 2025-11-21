import { useState } from "react";
import { Flower2, Heart, Gift, PartyPopper, Cloud, Star } from "lucide-react";
import { Button } from "./ui/button";

const categories = [
  {
    id: "wedding",
    name: "Hoa Cưới",
    icon: Heart,
    gradient: "from-rose-500/20 to-pink-500/20",
    products: [
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
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400",
        name: "Bó Cưới Hoa Hồng Trắng",
        price: 1350000,
        distance: "1.2km",
        rating: 4.9,
        tags: ["Hoa cưới", "Sang trọng"],
        soldCount: 123,
      },
    ],
  },
  {
    id: "congratulations",
    name: "Hoa Chúc Mừng",
    icon: PartyPopper,
    gradient: "from-yellow-500/20 to-orange-500/20",
    products: [
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
        image: "https://images.unsplash.com/photo-1606634589103-68f8f5605c9e?w=400",
        name: "Lẵng Hoa Khai Trương Mix",
        price: 850000,
        distance: "0.9km",
        rating: 4.9,
        tags: ["Khai trương", "Sang trọng"],
        soldCount: 189,
      },
    ],
  },
  {
    id: "love",
    name: "Hoa Tình Yêu",
    icon: Heart,
    gradient: "from-red-500/20 to-rose-500/20",
    products: [
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
        image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400",
        name: "Bó Hoa Hồng Pastel Lãng Mạn",
        price: 480000,
        distance: "1.3km",
        rating: 4.7,
        tags: ["Tình yêu", "Dễ thương"],
        soldCount: 201,
      },
    ],
  },
  {
    id: "birthday",
    name: "Hoa Sinh Nhật",
    icon: Gift,
    gradient: "from-purple-500/20 to-pink-500/20",
    products: [
      {
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
        name: "Giỏ Hoa Sinh Nhật Tươi Vui",
        price: 420000,
        distance: "2.0km",
        rating: 4.7,
        tags: ["Sinh nhật", "Vui vẻ"],
        soldCount: 298,
      },
      {
        image: "https://images.unsplash.com/photo-1588363034908-f5cd3b6e5d21?w=400",
        name: "Bó Hoa Tulip Hồng Pastel",
        price: 480000,
        distance: "1.8km",
        rating: 4.6,
        tags: ["Sinh nhật", "Ngọt ngào"],
        soldCount: 312,
      },
    ],
  },
  {
    id: "condolence",
    name: "Hoa Chia Buồn",
    icon: Cloud,
    gradient: "from-gray-500/20 to-slate-500/20",
    products: [
      {
        image: "https://images.unsplash.com/photo-1600378948832-fde35b2501fc?w=400",
        name: "Bó Hoa Lily Trắng Thanh Nhã",
        price: 390000,
        distance: "1.3km",
        rating: 4.7,
        tags: ["Chia buồn", "Tinh tế"],
        soldCount: 267,
      },
      {
        image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400",
        name: "Vòng Hoa Chia Buồn Trang Nghiêm",
        price: 580000,
        distance: "1.1km",
        rating: 4.8,
        tags: ["Chia buồn", "Trang trọng"],
        soldCount: 145,
      },
    ],
  },
];

export const FlowerCategories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div className="flex items-center gap-2">
          <Flower2 className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Danh mục hoa</h2>
        </div>
        <p className="text-muted-foreground hidden md:block">Khám phá các dòng hoa đặc biệt</p>
      </div>
      
      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {categories.map((category, idx) => {
          const CategoryIcon = category.icon;
          const isActive = activeCategory === idx;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow scale-105' 
                  : 'bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              <CategoryIcon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Products Showcase */}
      <div className="relative">
        {categories.map((category, catIdx) => {
          const isActive = activeCategory === catIdx;
          
          return (
            <div
              key={category.id}
              className={`transition-all duration-500 ${
                isActive 
                  ? 'opacity-100 scale-100 block animate-fade-in' 
                  : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {category.products.map((product, pIdx) => (
                  <div
                    key={pIdx}
                    className="group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-glow transition-all duration-500 hover:scale-[1.02] bg-card border border-border animate-fade-in"
                    style={{ animationDelay: `${pIdx * 0.1}s` }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-semibold text-sm">{product.rating}</span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {product.price.toLocaleString('vi-VN')}đ
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Đã bán {product.soldCount}
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold px-6 rounded-xl shadow-glow transition-all hover:scale-105"
                        >
                          Đặt ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
