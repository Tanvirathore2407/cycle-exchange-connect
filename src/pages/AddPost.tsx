
import { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PostItem {
  id: string;
  name: string;
  category: string;
  description: string;
  contact: string;
  image: string;
  createdAt: string;
}

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    contact: ""
  });
  const [posts, setPosts] = useState<PostItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please upload an image",
        variant: "destructive"
      });
      return;
    }

    const newPost: PostItem = {
      id: Date.now().toString(),
      ...formData,
      image: selectedImage,
      createdAt: new Date().toISOString()
    };

    const updatedPosts = [...posts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);

    toast({
      description: "Post created successfully"
    });

    // Reset form
    setFormData({
      name: "",
      category: "",
      description: "",
      contact: ""
    });
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="px-4 py-6">
        <h1 className="text-2xl font-bold font-playfair mb-6">Add a New Item</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div 
              className="w-full max-w-xs aspect-square bg-muted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors relative"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload Image</p>
                </>
              )}
              <Input 
                id="imageInput"
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <Input 
                placeholder="Enter item name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books & Stationery</SelectItem>
                  <SelectItem value="medicines">Medicines</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                placeholder="Describe your item" 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contact Information</label>
              <Input 
                placeholder="Your contact information"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
            </div>
            
            <Button className="w-full" type="submit">
              Post Item
            </Button>
          </div>
        </form>

        {posts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
            <div className="grid grid-cols-2 gap-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-3">
                  <img 
                    src={post.image} 
                    alt={post.name} 
                    className="w-full aspect-square object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-medium">{post.name}</h3>
                  <p className="text-sm text-muted-foreground">{post.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AddPost;
