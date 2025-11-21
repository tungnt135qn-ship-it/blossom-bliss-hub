import { Link } from "react-router-dom";
import { Star, ZoomIn } from "lucide-react";
import { useState } from "react";

interface StoryFlowerCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
  id?: string;
}

export const StoryFlowerCard = ({
  image,
  name,
  price,
  rating,
  id = "1",
}: StoryFlowerCardProps) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <Link 
        to={`/product/${id}`} 
        className="block group relative"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        <div className="relative bg-gradient-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
          <div className="aspect-[3/4] overflow-hidden">
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
              <ZoomIn className="w-8 h-8 text-white mb-2" />
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

      {/* Large Preview on Hover */}
      {showPreview && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none animate-scale-in">
          <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border-2 border-primary/20 w-[320px]">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-lg text-foreground line-clamp-2">
                {name}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  {price.toLocaleString("vi-VN")}đ
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
