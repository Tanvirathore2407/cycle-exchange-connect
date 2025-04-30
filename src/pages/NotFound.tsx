
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
          <Construction className="h-10 w-10 text-secondary-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">This feature is under development</h1>
        <p className="text-muted-foreground mb-6">Stay tuned!</p>
        <Button onClick={() => window.history.back()} variant="outline" className="mr-2">
          Go Back
        </Button>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
