
import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full">
      <div className="flex flex-col">
        <div className="relative w-full h-48 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
            alt="Men's fashion banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="absolute bottom-4 left-4 md:left-8 text-white">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold tracking-tight">
              Swap Cycle
            </h1>
            <p className="text-sm md:text-base opacity-90">Share, borrow and connect.</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search items..." 
              className="pl-9 bg-secondary/50 border-0"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
