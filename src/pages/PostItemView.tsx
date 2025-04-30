
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { PostItem } from "@/types/item";

const PostItemView = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<PostItem | null>(null);
  
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      const posts = JSON.parse(savedPosts) as PostItem[];
      const foundPost = posts.find(item => item.id === itemId);
      setPost(foundPost || null);
    }
  }, [itemId]);
  
  const handleDeleteItem = () => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts && post) {
      const posts = JSON.parse(savedPosts) as PostItem[];
      const updatedPosts = posts.filter(item => item.id !== post.id);
      
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      
      toast({
        description: "Item deleted successfully"
      });
      
      navigate("/");
    }
  };
  
  if (!post) {
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
            <p className="text-muted-foreground mt-2">This item may have been deleted or doesn't exist.</p>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }
  
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
                  src={post.image} 
                  alt={post.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold font-playfair">{post.name}</h1>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        // For future implementation
                        toast({
                          title: "Edit feature",
                          description: "Item editing will be available soon!"
                        });
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this item from your posts.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteItem} className="bg-destructive text-destructive-foreground">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                
                <div className="mt-4 mb-2">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                </div>
                
                <Card className="mt-4 bg-secondary/30">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Item Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-medium capitalize">{post.category === "books" ? "Books & Stationery" : post.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Posted on</p>
                        <p className="font-medium">{new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4 bg-secondary/30">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <p className="text-sm">{post.contact}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default PostItemView;
