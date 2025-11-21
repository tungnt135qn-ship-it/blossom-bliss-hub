import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Map as MapIcon, Navigation, X, ChevronRight, Search } from "lucide-react";
import { APIProvider, Map, Marker, MapMouseEvent } from '@vis.gl/react-google-maps';

interface Location {
  id: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  timestamp: number;
}

interface LocationSelectorProps {
  onLocationSelect: (address: string) => void;
}

export const LocationSelector = ({ onLocationSelect }: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'welcome' | 'history' | 'map' | 'manual'>('welcome');
  const [address, setAddress] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [history, setHistory] = useState<Location[]>([]);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 21.0278, lng: 105.8342 }); // Hanoi
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem("deliveryAddress");
    if (!savedLocation) {
      setOpen(true);
    } else {
      onLocationSelect(savedLocation);
    }

    const savedHistory = localStorage.getItem("addressHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedApiKey = localStorage.getItem("googleMapsApiKey");
    if (savedApiKey) {
      setGoogleMapsApiKey(savedApiKey);
      setShowTokenInput(false);
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, [onLocationSelect]);

  const geocodeAddress = async (addressToGeocode: string) => {
    if (!googleMapsApiKey || !addressToGeocode.trim()) return;
    
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressToGeocode)}&key=${googleMapsApiKey}`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const formattedAddress = data.results[0].formatted_address;
        
        setMapCenter({ lat: location.lat, lng: location.lng });
        setMarkerPosition({ lat: location.lat, lng: location.lng });
        setAddress(formattedAddress);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    } finally {
      setIsGeocoding(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    if (!googleMapsApiKey) return;
    
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    if (event.detail.latLng) {
      const lat = event.detail.latLng.lat;
      const lng = event.detail.latLng.lng;
      
      setMarkerPosition({ lat, lng });
      reverseGeocode(lat, lng);
    }
  }, [googleMapsApiKey]);

  const handleTokenSubmit = () => {
    if (googleMapsApiKey.trim()) {
      localStorage.setItem("googleMapsApiKey", googleMapsApiKey);
      setShowTokenInput(false);
      setStep('history');
    }
  };

  const handleSubmit = () => {
    if (address.trim()) {
      localStorage.setItem("deliveryAddress", address);
      
      const newLocation: Location = {
        id: Date.now().toString(),
        address,
        coordinates: markerPosition || undefined,
        timestamp: Date.now(),
      };
      const updatedHistory = [newLocation, ...history.filter(h => h.address !== address)].slice(0, 5);
      localStorage.setItem("addressHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      
      onLocationSelect(address);
      setOpen(false);
    }
  };

  const selectFromHistory = (loc: Location) => {
    setAddress(loc.address);
    if (loc.coordinates) {
      setMapCenter(loc.coordinates);
      setMarkerPosition(loc.coordinates);
    }
    localStorage.setItem("deliveryAddress", loc.address);
    onLocationSelect(loc.address);
    setOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    geocodeAddress(searchAddress);
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-8 animate-fade-in">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Chào mừng đến SIIN Store! 🌸
        </h2>
        <p className="text-muted-foreground">
          Chọn địa chỉ giao hàng để xem các cửa hàng gần bạn
        </p>
      </div>

      {/* Map Preview */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-soft w-full max-w-2xl">
        <div className="aspect-[16/9] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3240947746184!2d106.66424107451796!3d10.786935589363246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed189791a93%3A0x56bd40253a59dc03!2sHCMC!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      
      {showTokenInput ? (
        <div className="w-full max-w-md space-y-4 bg-muted/30 p-6 rounded-2xl">
          <p className="text-sm text-muted-foreground">
            Để sử dụng bản đồ, vui lòng nhập Google Maps API Key tại{" "}
            <a 
              href="https://console.cloud.google.com/google/maps-apis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
          <Input
            placeholder="Nhập Google Maps API Key..."
            value={googleMapsApiKey}
            onChange={(e) => setGoogleMapsApiKey(e.target.value)}
            className="bg-background"
          />
          <Button 
            onClick={handleTokenSubmit}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Tiếp tục
          </Button>
        </div>
      ) : (
        <Button 
          onClick={() => setStep('history')}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-glow group"
        >
          Bắt đầu
          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="h-full flex flex-col p-8 animate-slide-in">
      <button
        onClick={() => setStep('welcome')}
        className="absolute top-6 left-6 p-2 hover:bg-muted rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-foreground">Chọn địa chỉ</h3>
          <p className="text-muted-foreground">Chọn một trong các cách bên dưới</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setStep('map')}
            className="group relative bg-gradient-card border-2 border-border hover:border-primary rounded-2xl p-6 text-left transition-all hover:shadow-medium"
          >
            <MapIcon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-semibold text-foreground mb-2">Chọn trên bản đồ</h4>
            <p className="text-sm text-muted-foreground">Chọn chính xác vị trí giao hàng</p>
          </button>

          <button
            onClick={() => setStep('manual')}
            className="group relative bg-gradient-card border-2 border-border hover:border-primary rounded-2xl p-6 text-left transition-all hover:shadow-medium"
          >
            <Navigation className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-semibold text-foreground mb-2">Nhập thủ công</h4>
            <p className="text-sm text-muted-foreground">Gõ địa chỉ của bạn</p>
          </button>
        </div>

        {history.length > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Địa chỉ đã dùng gần đây</span>
            </div>
            <div className="space-y-2">
              {history.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => selectFromHistory(loc)}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/10 border border-border hover:border-accent transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-foreground flex-1">{loc.address}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="h-full flex flex-col animate-slide-in">
      <div className="flex items-center justify-between p-6 border-b border-border bg-card/80 backdrop-blur-sm">
        <button
          onClick={() => setStep('history')}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        <h3 className="text-xl font-bold text-foreground">Chọn vị trí trên bản đồ</h3>
        <div className="w-9"></div>
      </div>

      {/* Search bar on map */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm địa chỉ..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="pl-12 pr-4 py-6 text-base bg-card shadow-medium border-2 border-border"
          />
          {isGeocoding && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </form>
      </div>

      <div className="flex-1 relative">
        <APIProvider apiKey={googleMapsApiKey}>
          <Map
            defaultCenter={mapCenter}
            center={mapCenter}
            defaultZoom={14}
            onClick={handleMapClick}
            mapId="flower-shop-map"
            gestureHandling="greedy"
            disableDefaultUI={false}
            className="w-full h-full"
          >
            {markerPosition && (
              <Marker
                position={markerPosition}
                title="Vị trí giao hàng"
              />
            )}
          </Map>
        </APIProvider>

        {address && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card shadow-medium rounded-2xl p-4 max-w-md w-full mx-4 border border-border">
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Địa chỉ đã chọn:</p>
                <p className="text-sm text-foreground font-medium">{address}</p>
              </div>
            </div>
            <Button 
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Xác nhận địa chỉ này
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderManual = () => (
    <div className="h-full flex flex-col justify-center p-8 animate-slide-in">
      <button
        onClick={() => setStep('history')}
        className="absolute top-6 left-6 p-2 hover:bg-muted rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h3 className="text-3xl font-bold text-foreground">Nhập địa chỉ</h3>
          <p className="text-muted-foreground">Gõ địa chỉ giao hàng của bạn</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Số nhà, tên đường, quận/huyện, thành phố..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="pl-12 py-6 text-lg bg-background border-2 border-border focus:border-primary"
            />
          </div>
          
          {address.trim() && (
            <Button 
              onClick={() => {
                geocodeAddress(address);
                setStep('map');
              }}
              variant="outline"
              className="w-full border-2 border-accent text-accent hover:bg-accent/10"
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Xem trên bản đồ
            </Button>
          )}

          <Button 
            onClick={handleSubmit} 
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 text-lg shadow-glow"
            disabled={!address.trim()}
          >
            Xác nhận địa chỉ
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 bg-gradient-hero border-2 border-border overflow-hidden">
        <div className="h-full relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
          
          {/* Content */}
          <div className="relative h-full">
            {step === 'welcome' && renderWelcome()}
            {step === 'history' && renderHistory()}
            {step === 'map' && renderMap()}
            {step === 'manual' && renderManual()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
