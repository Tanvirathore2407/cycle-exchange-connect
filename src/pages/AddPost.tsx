
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddPost = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="px-4 py-6">
        <h1 className="text-2xl font-bold font-playfair mb-6">Add a New Item</h1>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-full max-w-xs aspect-square bg-muted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
              <Upload className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Upload Image</p>
              <Input 
                type="file" 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <Input placeholder="Enter item name" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select>
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
              <Textarea placeholder="Describe your item" rows={4} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contact Information</label>
              <Input placeholder="Your contact information" />
            </div>
            
            <Button className="w-full">
              Post Item
            </Button>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AddPost;
