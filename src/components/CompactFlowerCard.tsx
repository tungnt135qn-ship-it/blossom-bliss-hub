import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface CompactFlowerCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  id?: string;
}

export const CompactFlowerCard = ({
  image,
  name,
  price,
  rating,
  id = "1",
}: CompactFlowerCardProps) => {
  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="relative bg-gradient-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Price overlay - always visible */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="text-white font-bold text-base">
              {price.toLocaleString("vi-VN")}đ
            </span>
          </div>
          
          {/* Hover overlay with additional info */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
            <h4 className="font-semibold text-sm text-white mb-2 line-clamp-2">
              {name}
            </h4>
            <div className="flex items-center gap-1 text-white/90 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {rating}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
