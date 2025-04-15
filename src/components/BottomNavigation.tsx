
import { Home, PlusSquare, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 z-50">
      <div className="flex items-center justify-around">
        <Button variant="ghost" className="nav-button active" size="sm">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        
        <Button variant="ghost" className="nav-button" size="sm">
          <PlusSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Add Post</span>
        </Button>
        
        <Button variant="ghost" className="nav-button" size="sm">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
        
        <Button variant="ghost" className="nav-button" size="sm">
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Messages</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
