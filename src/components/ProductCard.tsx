import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  distance: string;
  rating: number;
  tags: string[];
  discount?: string;
  soldCount?: number;
  id?: string;
}

export const ProductCard = ({
  image,
  name,
  price,
  originalPrice,
  distance,
  rating,
  tags,
  discount,
  soldCount,
  id = "1",
}: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="block">
      <div className="relative bg-gradient-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="p-4 space-y-2">
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-secondary/50 text-secondary-foreground text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  {price.toLocaleString("vi-VN")}đ
                </span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {distance}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  {rating}
                </span>
              </div>
              {soldCount && (
                <div className="text-xs text-muted-foreground mt-1">
                  Đã bán: {soldCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
