import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Mock data - replace with real data
const categoryData: Record<string, { title: string; description: string }> = {
  "tinh-yeu": { title: "Hoa Tình Yêu", description: "Gửi gắm tình cảm chân thành" },
  "chuc-mung": { title: "Hoa Chúc Mừng", description: "Chia sẻ niềm vui thành công" },
  "sinh-nhat": { title: "Hoa Sinh Nhật", description: "Chúc mừng tuổi mới hạnh phúc" },
  "cuoi": { title: "Hoa Cưới", description: "Kiến tạo hạnh phúc vĩnh cửu" },
  "chia-buon": { title: "Hoa Chia Buồn", description: "Chia sẻ nỗi buồn mất mát" },
  "dac-biet": { title: "Hoa Tặng Đặc Biệt", description: "Dành cho những dịp đặc biệt" },
};

const featuredProducts = [
  { id: "1", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946", name: "Bó hồng đỏ cao cấp", price: 450000 },
  { id: "2", image: "https://images.unsplash.com/photo-1518895312237-a9e23508077d", name: "Tulip hồng pastel", price: 380000 },
  { id: "3", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd", name: "Hoa mix lãng mạn", price: 520000 },
];

const allProducts = [
  { id: "1", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946", name: "Bó hồng đỏ cao cấp", price: 450000, distance: "2.5km", rating: 4.8, tags: ["Tình yêu", "Cao cấp"] },
  { id: "2", image: "https://images.unsplash.com/photo-1518895312237-a9e23508077d", name: "Tulip hồng pastel", price: 380000, distance: "1.8km", rating: 4.9, tags: ["Pastel", "Nhẹ nhàng"] },
  { id: "3", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd", name: "Hoa mix lãng mạn", price: 520000, distance: "3.2km", rating: 4.7, tags: ["Mix", "Lãng mạn"] },
  { id: "4", image: "https://images.unsplash.com/photo-1487070183336-b863922373d4", name: "Hồng trắng tinh khôi", price: 420000, distance: "2.1km", rating: 4.8, tags: ["Trắng", "Tinh khôi"] },
  { id: "5", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364", name: "Hoa lily thanh lịch", price: 480000, distance: "2.8km", rating: 4.6, tags: ["Lily", "Thanh lịch"] },
  { id: "6", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11", name: "Bó hoa baby đáng yêu", price: 320000, distance: "1.5km", rating: 4.9, tags: ["Baby", "Đáng yêu"] },
  { id: "7", image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d", name: "Hoa cẩm chướng ngọt ngào", price: 350000, distance: "2.3km", rating: 4.7, tags: ["Cẩm chướng", "Ngọt ngào"] },
  { id: "8", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a", name: "Mix hoa đồng quê", price: 390000, distance: "2.9km", rating: 4.8, tags: ["Mix", "Đồng quê"] },
];

const priceRanges = [
  { id: "under-300", label: "Dưới 300.000đ", min: 0, max: 300000 },
  { id: "300-500", label: "300.000đ - 500.000đ", min: 300000, max: 500000 },
  { id: "500-800", label: "500.000đ - 800.000đ", min: 500000, max: 800000 },
  { id: "above-800", label: "Trên 800.000đ", min: 800000, max: Infinity },
];

const ageGroups = ["Tuổi teen", "20-30 tuổi", "30-40 tuổi", "Trên 40 tuổi"];
const styles = ["Hiện đại", "Cổ điển", "Tối giản", "Sang trọng", "Tự nhiên"];
const trends = ["Pastel", "Vintage", "Rustic", "Bohemian", "Minimalist"];

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);

  const category = categoryData[slug || "tinh-yeu"] || categoryData["tinh-yeu"];

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Khoảng giá</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox
                id={range.id}
                checked={selectedPrices.includes(range.id)}
                onCheckedChange={(checked) => {
                  setSelectedPrices(
                    checked
                      ? [...selectedPrices, range.id]
                      : selectedPrices.filter((p) => p !== range.id)
                  );
                }}
              />
              <Label htmlFor={range.id} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Độ tuổi</h3>
        <div className="space-y-2">
          {ageGroups.map((age) => (
            <div key={age} className="flex items-center space-x-2">
              <Checkbox
                id={age}
                checked={selectedAges.includes(age)}
                onCheckedChange={(checked) => {
                  setSelectedAges(
                    checked
                      ? [...selectedAges, age]
                      : selectedAges.filter((a) => a !== age)
                  );
                }}
              />
              <Label htmlFor={age} className="text-sm cursor-pointer">
                {age}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Phong cách</h3>
        <div className="space-y-2">
          {styles.map((style) => (
            <div key={style} className="flex items-center space-x-2">
              <Checkbox
                id={style}
                checked={selectedStyles.includes(style)}
                onCheckedChange={(checked) => {
                  setSelectedStyles(
                    checked
                      ? [...selectedStyles, style]
                      : selectedStyles.filter((s) => s !== style)
                  );
                }}
              />
              <Label htmlFor={style} className="text-sm cursor-pointer">
                {style}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Xu hướng</h3>
        <div className="space-y-2">
          {trends.map((trend) => (
            <div key={trend} className="flex items-center space-x-2">
              <Checkbox
                id={trend}
                checked={selectedTrends.includes(trend)}
                onCheckedChange={(checked) => {
                  setSelectedTrends(
                    checked
                      ? [...selectedTrends, trend]
                      : selectedTrends.filter((t) => t !== trend)
                  );
                }}
              />
              <Label htmlFor={trend} className="text-sm cursor-pointer">
                {trend}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedPrices([]);
          setSelectedAges([]);
          setSelectedStyles([]);
          setSelectedTrends([]);
        }}
      >
        Xóa bộ lọc
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {category.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm font-bold">{product.price.toLocaleString("vi-VN")}đ</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Sort */}
      <section className="border-b border-border bg-card/30 sticky top-[57px] z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm hoa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Phổ biến nhất</SelectItem>
                <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
                <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Bộ lọc
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Bộ lọc</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Products Grid with Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
            {/* Desktop Filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-[145px] bg-card rounded-xl p-6 shadow-soft">
                <h2 className="text-lg font-bold text-foreground mb-6">Bộ lọc</h2>
                <FilterSection />
              </div>
            </aside>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Hiển thị {allProducts.length} sản phẩm
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
