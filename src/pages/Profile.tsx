
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItemSection from "@/components/ItemSection";
import { Edit, Settings } from "lucide-react";
import { PostItem, Item } from "@/types/item";

const borrowedItems = [
  {
    id: "1",
    name: "Programming Textbook",
    owner: "Alex Chen",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "2",
    name: "Wireless Headphones",
    owner: "Jamie Smith",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState<Item[]>([]);
  
  useEffect(() => {
    // Load user posts from localStorage
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      const posts = JSON.parse(savedPosts) as PostItem[];
      
      const formattedPosts = posts.map(post => ({
        id: `post-${post.id}`,  // Prefix with post- to identify user posts
        name: post.name,
        owner: "You",
        image: post.image,
        description: post.description,
        postedDate: new Date(post.createdAt).toLocaleDateString(),
        category: post.category
      }));
      
      setMyItems(formattedPosts);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main>
        <div className="bg-white p-6 flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground h-7 w-7"
            >
              <Edit className="h-3 w-3" />
            </Button>
          </div>
          <h2 className="text-xl font-bold mt-4">John Doe</h2>
          <p className="text-sm text-muted-foreground">Computer Science - Year 3</p>
          
          <div className="mt-4 flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="myItems" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="myItems">My Items</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          </TabsList>
          <TabsContent value="myItems">
            <ItemSection title="My Items" items={myItems} />
          </TabsContent>
          <TabsContent value="borrowed">
            <ItemSection title="Borrowed Items" items={borrowedItems} />
          </TabsContent>
        </Tabs>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Profile;
