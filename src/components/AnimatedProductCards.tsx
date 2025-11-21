import { ProductCard } from "./ProductCard";

export const AnimatedProductCards = () => {
  const products = [
    {
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400",
      name: "Hoa Hồng Phấn",
      price: 420000,
      distance: "1.1km",
      rating: 4.8,
      tags: ["Sinh nhật"],
      soldCount: 234,
    },
    {
      image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400",
      name: "Tulip Vàng",
      price: 550000,
      distance: "0.9km",
      rating: 4.9,
      tags: ["Khai trương"],
      soldCount: 189,
    },
    {
      image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400",
      name: "Hoa Ly Trắng",
      price: 380000,
      distance: "1.4km",
      rating: 4.7,
      tags: ["Thanh lịch"],
      soldCount: 156,
    },
    {
      image: "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=400",
      name: "Cẩm Chướng Mix",
      price: 320000,
      distance: "2.0km",
      rating: 4.6,
      tags: ["Chúc mừng"],
      soldCount: 298,
    },
    {
      image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400",
      name: "Hoa Baby Mix",
      price: 280000,
      distance: "1.8km",
      rating: 4.5,
      tags: ["Dễ thương"],
      soldCount: 312,
    },
    {
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
      name: "Đồng Tiền",
      price: 450000,
      distance: "1.5km",
      rating: 4.8,
      tags: ["Sang trọng"],
      soldCount: 178,
    },
  ];

  const leftProducts = products.slice(0, 3);
  const rightProducts = products.slice(3, 6);

  return (
    <div className="relative w-full h-full flex gap-2 lg:gap-3 justify-center items-center">
      {/* Left Column with Live Badge */}
      <div className="flex flex-col gap-2 lg:gap-2.5 relative">
        <div className="absolute -top-5 lg:-top-6 left-0 flex items-center gap-2 bg-gradient-to-r from-destructive to-destructive/80 backdrop-blur-sm text-destructive-foreground px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-semibold shadow-glow z-10">
          <span className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-white rounded-full animate-pulse" />
          Live
        </div>
        <div className="flex flex-col gap-2 lg:gap-2.5 animate-scroll-up">
          {[...leftProducts, ...leftProducts].map((product, idx) => (
            <div
              key={`left-${idx}`}
              className="w-36 lg:w-44 xl:w-48 bg-gradient-to-br from-card to-card/80 rounded-xl lg:rounded-2xl overflow-hidden shadow-medium hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border border-primary/10"
            >
              <div className="aspect-[3/4] overflow-hidden relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-1.5 lg:top-2 right-1.5 lg:right-2 bg-background/90 backdrop-blur-sm px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-[10px] lg:text-xs font-semibold flex items-center gap-1">
                  ⭐ {product.rating}
                </div>
              </div>
              <div className="p-2 lg:p-2.5">
                <h3 className="font-semibold text-[10px] lg:text-xs text-foreground line-clamp-1 mb-1 lg:mb-1.5">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-xs lg:text-sm">
                    {product.price.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-[9px] lg:text-[10px] text-muted-foreground">
                    Đã bán {product.soldCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-2 lg:gap-2.5 mt-8 lg:mt-12">
        <div className="flex flex-col gap-2 lg:gap-2.5 animate-scroll-up-delayed">
          {[...rightProducts, ...rightProducts].map((product, idx) => (
            <div
              key={`right-${idx}`}
              className="w-36 lg:w-44 xl:w-48 bg-gradient-to-br from-card to-card/80 rounded-xl lg:rounded-2xl overflow-hidden shadow-medium hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border border-primary/10"
            >
              <div className="aspect-[3/4] overflow-hidden relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-1.5 lg:top-2 right-1.5 lg:right-2 bg-background/90 backdrop-blur-sm px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-[10px] lg:text-xs font-semibold flex items-center gap-1">
                  ⭐ {product.rating}
                </div>
              </div>
              <div className="p-2 lg:p-2.5">
                <h3 className="font-semibold text-[10px] lg:text-xs text-foreground line-clamp-1 mb-1 lg:mb-1.5">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-xs lg:text-sm">
                    {product.price.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-[9px] lg:text-[10px] text-muted-foreground">
                    Đã bán {product.soldCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
