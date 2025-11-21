import { Heart, Cake, Church, FlowerIcon, Gift, PartyPopper } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Hoa Tình Yêu",
    icon: Heart,
    items: [
      { name: "Hoa hồng đỏ", description: "Tình yêu đắm say", price: "Từ 350.000đ" },
      { name: "Hoa tulip hồng", description: "Yêu thương ngọt ngào", price: "Từ 420.000đ" },
      { name: "Hoa mix romance", description: "Lãng mạn tinh tế", price: "Từ 580.000đ" },
    ],
  },
  {
    name: "Hoa Chúc Mừng",
    icon: PartyPopper,
    items: [
      { name: "Lẵng khai trương", description: "Thành công rực rỡ", price: "Từ 850.000đ" },
      { name: "Giỏ chúc mừng", description: "Niềm vui tràn đầy", price: "Từ 620.000đ" },
      { name: "Hoa mix cao cấp", description: "Sang trọng đẳng cấp", price: "Từ 980.000đ" },
    ],
  },
  {
    name: "Hoa Sinh Nhật",
    icon: Cake,
    items: [
      { name: "Bó hoa sinh nhật", description: "Tuổi mới hạnh phúc", price: "Từ 380.000đ" },
      { name: "Giỏ hoa tone pastel", description: "Ngọt ngào dễ thương", price: "Từ 450.000đ" },
      { name: "Hộp hoa surprise", description: "Bất ngờ thú vị", price: "Từ 520.000đ" },
    ],
  },
  {
    name: "Hoa Cưới",
    icon: Church,
    items: [
      { name: "Bó hoa cưới", description: "Hạnh phúc vĩnh cửu", price: "Từ 1.200.000đ" },
      { name: "Hoa cài áo", description: "Tinh tế sang trọng", price: "Từ 150.000đ" },
      { name: "Hoa trang trí", description: "Không gian lãng mạn", price: "Từ 2.500.000đ" },
    ],
  },
  {
    name: "Hoa Chia Buồn",
    icon: FlowerIcon,
    items: [
      { name: "Vòng hoa chia buồn", description: "Thương tiếc vô hạn", price: "Từ 850.000đ" },
      { name: "Lẵng hoa trắng", description: "An nghỉ thanh thản", price: "Từ 750.000đ" },
      { name: "Kệ hoa chia buồn", description: "Tưởng nhớ chân thành", price: "Từ 1.500.000đ" },
    ],
  },
  {
    name: "Hoa Tặng Đặc Biệt",
    icon: Gift,
    items: [
      { name: "Hoa 20/10", description: "Tôn vinh phụ nữ", price: "Từ 320.000đ" },
      { name: "Hoa 8/3", description: "Ngày của mẹ", price: "Từ 380.000đ" },
      { name: "Hoa Valentine", description: "Tình yêu bất tận", price: "Từ 450.000đ" },
    ],
  },
];

export function FlowerMenu() {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex-wrap justify-center gap-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger className="h-11 gap-2 text-sm font-medium hover:text-primary data-[state=open]:text-primary">
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <a
                              href="#"
                              className={cn(
                                "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                              )}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="text-sm font-semibold leading-none mb-1 group-hover:text-primary transition-colors">
                                    {item.name}
                                  </div>
                                  <p className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                                <div className="text-xs font-semibold text-primary whitespace-nowrap">
                                  {item.price}
                                </div>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
