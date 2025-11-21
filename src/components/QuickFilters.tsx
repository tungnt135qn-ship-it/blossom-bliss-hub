import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export const QuickFilters = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground mb-3 text-sm">Đặt hoa nhanh chóng</h3>
      
      {/* Đặt hoa giao ngay */}
      <Button 
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-primary-foreground font-semibold h-14 rounded-2xl shadow-glow group transition-all hover:scale-[1.02]"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="font-bold">Đặt hoa giao ngay</div>
            <div className="text-xs opacity-90">Giao trong 2 giờ</div>
          </div>
        </div>
      </Button>

      {/* Đặt lịch tặng hoa */}
      <Button 
        variant="outline"
        className="w-full border-2 border-primary/30 hover:bg-primary/5 text-foreground font-semibold h-14 rounded-2xl group transition-all hover:scale-[1.02] hover:border-primary/50"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <div className="font-bold">Đặt lịch tặng hoa</div>
            <div className="text-xs text-muted-foreground">Chọn ngày giao</div>
          </div>
        </div>
      </Button>

      {/* Additional info */}
      <div className="pt-3 border-t border-border/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span>Miễn phí giao hàng trong 3km</span>
        </div>
      </div>
    </div>
  );
};
