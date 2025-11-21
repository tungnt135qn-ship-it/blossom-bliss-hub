import { Heart, Cake, Church, FlowerIcon, Gift, PartyPopper } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Hoa Tình Yêu",
    icon: Heart,
    slug: "tinh-yeu",
  },
  {
    name: "Hoa Chúc Mừng",
    icon: PartyPopper,
    slug: "chuc-mung",
  },
  {
    name: "Hoa Sinh Nhật",
    icon: Cake,
    slug: "sinh-nhat",
  },
  {
    name: "Hoa Cưới",
    icon: Church,
    slug: "cuoi",
  },
  {
    name: "Hoa Chia Buồn",
    icon: FlowerIcon,
    slug: "chia-buon",
  },
  {
    name: "Hoa Tặng Đặc Biệt",
    icon: Gift,
    slug: "dac-biet",
  },
];

export function SimpleFlowerMenu() {
  const location = useLocation();
  
  return (
    <nav className="flex items-center justify-center gap-1.5 overflow-x-auto">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = location.pathname === `/category/${category.slug}`;
        
        return (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
