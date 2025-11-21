import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StoryFlowerCard } from "@/components/StoryFlowerCard";
import { ArrowLeft, Calendar, User, Heart, Share2 } from "lucide-react";
import siinLogo from "@/assets/siin-logo.png";

interface Story {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  image: string;
  content: string[];
  relatedProducts: Array<{
    image: string;
    name: string;
    price: number;
    rating: number;
  }>;
}

const stories: Record<string, Story> = {
  "autumn-hanoi": {
    id: "autumn-hanoi",
    title: "Hoa và Thu Hà Nội",
    subtitle: "Câu chuyện về mùa thu thơ mộng cùng hương hoa sữa",
    category: "Câu chuyện mùa thu",
    author: "Minh Anh",
    date: "15/11/2025",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    content: [
      "Mùa thu Hà Nội, những cánh hoa sữa trắng muốt rơi nhè nhẹ trên phố. Hương thơm ngào ngạt lan tỏa khắp phố phường, mang theo bao kỷ niệm đẹp đẽ của một mùa thu thơ mộng.",
      "Hoa sữa không chỉ là biểu tượng của mùa thu Hà Nội, mà còn là nỗi nhớ của bao người xa quê. Mỗi khi thu về, hương hoa sữa lại len lỏi vào từng ngõ ngách, khiến lòng người xao xuyến.",
      "Những cánh hoa nhỏ bé, trắng tinh khôi, nhưng hương thơm lại nồng nàn đến lạ. Có người yêu mùi này, có người lại không chịu nổi. Nhưng dù thế nào, hoa sữa vẫn là một phần không thể thiếu của mùa thu Thủ đô.",
      "Bên cạnh hoa sữa, mùa thu Hà Nội còn có những loài hoa khác không kém phần quyến rũ. Hoa cúc họa mi vàng rực rỡ bên bờ Hồ Tây, hoa sen trắng tinh khôi dưới ánh nắng chiều, hay những bó hoa hồng đỏ thắm trong tay người yêu.",
      "Mỗi loài hoa mang một ý nghĩa riêng, nhưng tất cả đều góp phần tạo nên một Hà Nội mùa thu đầy màu sắc và cảm xúc. Đó là mùa của những câu chuyện tình đẹp, của những kỷ niệm khó quên, và của những món quà hoa tươi thắm gửi đến người thân yêu."
    ],
    relatedProducts: [
      {
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400",
        name: "Bó Hoa Hồng Đỏ Sang Trọng",
        price: 520000,
        rating: 4.8
      },
      {
        image: "https://images.unsplash.com/photo-1606634589103-68f8f5605c9e?w=400",
        name: "Lẵng Hoa Mix Mùa Thu",
        price: 850000,
        rating: 4.9
      },
      {
        image: "https://images.unsplash.com/photo-1599289794265-39dd5a6c2d21?w=400",
        name: "Bó Hoa Cúc Họa Mi Vàng",
        price: 380000,
        rating: 4.7
      }
    ]
  },
  "winter-romance": {
    id: "winter-romance",
    title: "Hoa & Mùa Đông",
    subtitle: "Vẻ đẹp rực rỡ của hoa trong tiết trời lạnh giá",
    category: "Câu chuyện mùa đông",
    author: "Thu Hà",
    date: "20/11/2025",
    image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800",
    content: [
      "Mùa đông đến, những bông hoa vẫn nở rộ khắp phố phường. Hương thơm ngào ngạt của hoa lan, sự tinh khôi của hoa loa kèn, và vẻ đẹp sang trọng của hoa hồng Ecuador.",
      "Dù trời lạnh, nhưng tình yêu thì luôn ấm áp. Những bó hoa tươi thắm được trao tận tay người thương trong tiết trời se lạnh, mang theo thông điệp yêu thương và sự quan tâm chân thành.",
      "Hoa lan với sắc trắng tinh khôi, tượng trưng cho sự thanh cao và cao quý. Hoa loa kèn với hình dáng độc đáo, mang đến may mắn và thịnh vượng. Còn hoa hồng Ecuador với cánh hoa to và thơm đặc biệt, là biểu tượng của tình yêu mãnh liệt.",
      "Mùa đông là thời điểm của những lễ hội, của Giáng sinh và Tết Nguyên Đán. Đó cũng là mùa của những món quà hoa đẹp nhất, được trao gửi với những lời chúc tốt đẹp nhất.",
      "Dù mùa đông lạnh lẽo, nhưng với hoa tươi, mọi khoảnh khắc đều trở nên ấm áp và đáng nhớ hơn."
    ],
    relatedProducts: [
      {
        image: "https://images.unsplash.com/photo-1600378948832-fde35b2501fc?w=400",
        name: "Bó Hoa Lily Trắng Thanh Nhã",
        price: 390000,
        rating: 4.7
      },
      {
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400",
        name: "Hoa Hồng Ecuador Đỏ Thắm",
        price: 680000,
        rating: 4.9
      },
      {
        image: "https://images.unsplash.com/photo-1522057384400-681b421cfebc?w=400",
        name: "Giỏ Hoa Mix Mùa Đông",
        price: 620000,
        rating: 4.8
      }
    ]
  },
  "teachers-day": {
    id: "teachers-day",
    title: "Hoa Tri Ân Thầy Cô",
    subtitle: "Gửi lời cảm ơn đến người thầy qua những đóa hoa",
    category: "Ngày Nhà Giáo",
    author: "Lan Phương",
    date: "18/11/2025",
    image: "https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=800",
    content: [
      "Ngày 20 tháng 11, ngày Nhà giáo Việt Nam - một dịp đặc biệt để chúng ta bày tỏ lòng biết ơn sâu sắc đến những người thầy, người cô đã dành trọn tâm huyết để truyền đạt kiến thức và dạy dỗ chúng ta.",
      "Hoa không chỉ là món quà, mà còn là lời tri ân chân thành nhất. Những bông hoa hồng đỏ tượng trưng cho tình thương và lòng kính trọng. Hoa lily trắng thể hiện sự trong sáng và cao quý của nghề dạy học.",
      "Mỗi đóa hoa trong bó hoa tri ân đều mang theo một thông điệp: 'Cảm ơn thầy cô đã dạy dỗ chúng con, đã kiên nhẫn và tận tâm trong suốt những năm tháng qua.'",
      "Không cần quà đắt tiền, một bó hoa tươi thắm được trao tận tay với nụ cười chân thành và lời cảm ơn từ đáy lòng, đó là điều mà thầy cô trân trọng nhất.",
      "Hãy để những đóa hoa nói lên tất cả tình cảm mà lời nói không thể diễn tả. Ngày 20/11 này, đừng quên gửi tặng thầy cô một món quà ý nghĩa nhất - tình yêu thương và lòng biết ơn của học trò."
    ],
    relatedProducts: [
      {
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400",
        name: "Bó Hoa Hồng Tri Ân",
        price: 420000,
        rating: 4.8
      },
      {
        image: "https://images.unsplash.com/photo-1600378948832-fde35b2501fc?w=400",
        name: "Bó Hoa Lily Trắng",
        price: 380000,
        rating: 4.7
      },
      {
        image: "https://images.unsplash.com/photo-1588363034908-f5cd3b6e5d21?w=400",
        name: "Giỏ Hoa Mix Nhà Giáo",
        price: 550000,
        rating: 4.9
      }
    ]
  }
};

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const story = id ? stories[id] : null;

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Không tìm thấy câu chuyện</h1>
          <Button onClick={() => navigate("/")}>Về trang chủ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <img src={siinLogo} alt="SIIN Store" className="h-8 w-auto" />
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SIIN Store
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <Badge className="bg-primary/20 text-primary border-0 mb-3">
            {story.category}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
            {story.title}
          </h1>
          <p className="text-xl text-muted-foreground">{story.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            {story.content.map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed mb-6 text-base lg:text-lg">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Related Products */}
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {story.relatedProducts.map((product, idx) => (
                <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <StoryFlowerCard {...product} />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90"
              onClick={() => navigate("/")}
            >
              Khám phá thêm câu chuyện
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
