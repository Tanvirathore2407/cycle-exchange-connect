
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import ItemSection from "@/components/ItemSection";
import BottomNavigation from "@/components/BottomNavigation";
import { PostItem, Item } from "@/types/item";

const borrowedItems: Item[] = [
  {
    id: "1",
    name: "Programming Textbook",
    owner: "Alex Chen",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "A comprehensive guide to modern programming techniques and best practices."
  },
  {
    id: "2",
    name: "Wireless Headphones",
    owner: "Jamie Smith",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Noise-cancelling wireless headphones with up to 20 hours of battery life."
  },
  {
    id: "3",
    name: "Tennis Racket",
    owner: "Taylor Roberts",
    image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Professional grade tennis racket, barely used."
  },
  {
    id: "4",
    name: "Scientific Calculator",
    owner: "Jordan Lee",
    image: "https://images.unsplash.com/photo-1573791388430-171408c2e831?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Graphing calculator with all functions needed for advanced math and science courses.",
    category: "electronics"
  }
];

const recentItems: Item[] = [
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

const Index = () => {
  const [userPosts, setUserPosts] = useState<Item[]>([]);
  
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      const posts = JSON.parse(savedPosts) as PostItem[];
      
      const formattedPosts = posts.map(post => ({
        id: post.id,
        name: post.name,
        owner: "You",
        image: post.image,
        description: post.description,
        postedDate: new Date(post.createdAt).toLocaleDateString(),
        category: post.category
      }));
      
      setUserPosts(formattedPosts);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main>
        <Categories userPosts={[...userPosts, ...borrowedItems]} />
        <div className="mt-1 mb-2 px-4">
          <div className="h-px bg-border" />
        </div>
        <ItemSection title="Borrowed by you" items={borrowedItems} />
        <div className="mt-1 mb-2 px-4">
          <div className="h-px bg-border" />
        </div>
        <ItemSection title="Recently added" items={[...userPosts, ...recentItems].slice(0, 8)} />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Index;
