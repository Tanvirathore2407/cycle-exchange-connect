
import { Home, PlusSquare, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 z-50">
      <div className="flex items-center justify-around">
        <Button 
          variant="ghost" 
          className={`nav-button ${path === '/' ? 'active' : ''}`} 
          size="sm"
          asChild
        >
          <Link to="/">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`nav-button ${path === '/add-post' ? 'active' : ''}`} 
          size="sm"
          asChild
        >
          <Link to="/add-post">
            <PlusSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Add Post</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`nav-button ${path === '/profile' ? 'active' : ''}`} 
          size="sm"
          asChild
        >
          <Link to="/profile">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`nav-button ${path === '/messages' ? 'active' : ''}`} 
          size="sm"
          asChild
        >
          <Link to="/messages">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
