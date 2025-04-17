import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type BorrowedItem = {
  id: string;
  name: string;
  owner: string;
  image: string;
  description: string;
  borrowDate: string;
  returnDate: string;
};

type RecentItem = {
  id: string;
  name: string;
  owner: string;
  image: string;
  description: string;
  postedDate: string;
};

type ItemType = BorrowedItem | RecentItem;

const ItemView = () => {
  const { itemId, source } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const getItemDetails = (): ItemType | null => {
    if (source === "borrowed") {
      const borrowedItems: BorrowedItem[] = [
        {
          id: "1",
          name: "Programming Textbook",
          owner: "Alex Chen",
          image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "A comprehensive guide to modern programming techniques and best practices. Covers multiple languages including JavaScript, Python, and Java.",
          borrowDate: "Apr 10, 2025",
          returnDate: "Apr 25, 2025"
        },
        {
          id: "2",
          name: "Wireless Headphones",
          owner: "Jamie Smith",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Noise-cancelling wireless headphones with up to 20 hours of battery life. Great for studying in noisy environments.",
          borrowDate: "Apr 8, 2025",
          returnDate: "Apr 22, 2025"
        },
        {
          id: "3",
          name: "Tennis Racket",
          owner: "Taylor Roberts",
          image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Professional grade tennis racket, barely used. Perfect for beginners and intermediate players.",
          borrowDate: "Apr 5, 2025",
          returnDate: "Apr 19, 2025"
        },
        {
          id: "4",
          name: "Scientific Calculator",
          owner: "Jordan Lee",
          image: "https://images.unsplash.com/photo-1573791388430-171408c2e831?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Graphing calculator with all functions needed for advanced math and science courses.",
          borrowDate: "Apr 3, 2025",
          returnDate: "Apr 17, 2025"
        }
      ];
      return borrowedItems.find(item => item.id === itemId) || null;
    } else if (source === "recent") {
      const recentItems: RecentItem[] = [
        {
          id: "1",
          name: "Leather Jacket",
          owner: "Casey Morgan",
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Classic brown leather jacket, size M. Perfect for fall and spring weather.",
          postedDate: "Apr 14, 2025"
        },
        {
          id: "2",
          name: "Biology Textbook",
          owner: "Riley Johnson",
          image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Latest edition biology textbook, covers all material for BIO101 and BIO102 courses.",
          postedDate: "Apr 13, 2025"
        },
        {
          id: "3",
          name: "Smart Watch",
          owner: "Quinn Davis",
          image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Smart watch with fitness tracking, message notifications, and long battery life.",
          postedDate: "Apr 12, 2025"
        },
        {
          id: "4",
          name: "Basketball",
          owner: "Avery Wilson",
          image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          description: "Official size basketball, barely used. Great condition.",
          postedDate: "Apr 11, 2025"
        }
      ];
      return recentItems.find(item => item.id === itemId) || null;
    }
    return null;
  };

  const item = getItemDetails();
  
  if (!item) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header />
        <main className="p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2 pl-0"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="text-center py-10">
            <h2 className="text-xl font-medium">Item not found</h2>
            <p className="text-muted-foreground mt-2">The requested item doesn't exist or has been removed.</p>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  const handleContactOwner = () => {
    navigate("/messages");
    toast({
      title: "Message started",
      description: `You've started a conversation with ${item.owner}`,
    });
  };

  const handleReturnItem = () => {
    toast({
      title: "Return requested",
      description: "A return request has been sent to the owner.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main>
        <div className="px-4 py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2 pl-0"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <div className="mb-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h1 className="text-2xl font-bold font-playfair">{item.name}</h1>
                
                <div className="flex items-center mt-3">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>
                      {item.owner.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">From <span className="font-medium">{item.owner}</span></span>
                </div>
                
                <div className="mt-4 mb-2">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                {source === "borrowed" && item && 'borrowDate' in item && (
                  <Card className="mt-4 bg-secondary/30">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Borrowing Details</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Borrowed on</p>
                          <p className="font-medium">{item.borrowDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Return by</p>
                          <p className="font-medium">{item.returnDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {source === "recent" && item && 'postedDate' in item && (
                  <Card className="mt-4 bg-secondary/30">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Item Details</h3>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Posted on</p>
                        <p className="font-medium">{item.postedDate}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    className="flex-1" 
                    onClick={handleContactOwner}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact {source === "borrowed" ? "Owner" : ""}
                  </Button>
                  
                  {source === "borrowed" && (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleReturnItem}
                    >
                      Return Item
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default ItemView;
