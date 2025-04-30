import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import ItemSection from "@/components/ItemSection";
import { PostItem, Item } from "@/types/item";

const categoryItems: Record<string, Item[]> = {
  shoes: [
    {
      id: "1",
      name: "Running Shoes",
      owner: "Morgan Chase",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "High-performance running shoes with cushioned soles."
    },
    {
      id: "2",
      name: "Casual Sneakers",
      owner: "Pat Johnson",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Stylish and comfortable casual sneakers for everyday wear."
    }
  ],
  clothing: [
    {
      id: "1",
      name: "Denim Jacket",
      owner: "Sam Wilson",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A classic denim jacket that pairs well with any outfit."
    },
    {
      id: "2",
      name: "Wool Sweater",
      owner: "Alex Morgan",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A warm and cozy wool sweater for cold weather."
    }
  ],
  books: [
    {
      id: "1",
      name: "Computer Science Textbook",
      owner: "Jamie Lee",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A comprehensive guide to computer science principles."
    },
    {
      id: "2",
      name: "Literature Collection",
      owner: "Chris Taylor",
      image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A collection of classic literature works."
    }
  ],
  medicines: [
    {
      id: "1",
      name: "First Aid Kit",
      owner: "Robin Smith",
      image: "https://images.unsplash.com/photo-1631549916768-4119b4123a21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A complete first aid kit for emergencies."
    },
    {
      id: "2",
      name: "Vitamins",
      owner: "Jordan Chen",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Essential vitamins for daily health."
    }
  ],
  electronics: [
    {
      id: "1",
      name: "Bluetooth Speaker",
      owner: "Casey Kim",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A portable Bluetooth speaker with high-quality sound."
    },
    {
      id: "2",
      name: "USB Hub",
      owner: "Taylor Reed",
      image: "https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A USB hub for expanding connectivity."
    }
  ],
  accessories: [
    {
      id: "1",
      name: "Leather Wallet",
      owner: "Riley Johnson",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A stylish leather wallet with multiple compartments."
    },
    {
      id: "2",
      name: "Silk Scarf",
      owner: "Quinn Davis",
      image: "https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "A soft silk scarf for adding elegance to any outfit."
    }
  ]
};

const CategoryView = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  
  useEffect(() => {
    // Load predefined category items
    const category = categoryId || "shoes";
    const defaultItems = categoryItems[category] || [];
    
    // Load user posts from localStorage
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      const posts = JSON.parse(savedPosts) as PostItem[];
      
      // Filter posts by category
      const categoryPosts = posts
        .filter(post => post.category === category)
        .map(post => ({
          id: post.id,
          name: post.name,
          owner: "You",
          image: post.image,
          description: post.description,
          postedDate: new Date(post.createdAt).toLocaleDateString(),
          category: post.category
        }));
      
      // Combine user posts with default items
      setItems([...categoryPosts, ...defaultItems]);
    } else {
      setItems(defaultItems);
    }
  }, [categoryId]);
  
  // Format category name for display
  const formatCategoryName = (cat: string = "shoes") => {
    if (cat === "books") return "Books & Stationery";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
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
          
          <h1 className="text-2xl font-bold font-playfair mb-6">
            {formatCategoryName(categoryId)}
          </h1>
          
          <ItemSection title="Available Items" items={items} />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default CategoryView;
