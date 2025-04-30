
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Item } from "@/types/item";

interface ItemSectionProps {
  title: string;
  items: Item[];
}

const ItemSection = ({ title, items }: ItemSectionProps) => {
  const navigate = useNavigate();
  
  const handleItemClick = (item: Item) => {
    // Check if it's a user-posted item 
    if (item.id.toString().startsWith("post-")) {
      navigate(`/item/post/${item.id.toString().replace("post-", "")}`);
    } else if (title.toLowerCase().includes("borrow")) {
      navigate(`/item/borrowed/${item.id}`);
    } else {
      navigate(`/item/recent/${item.id}`);
    }
  };
  
  const handleViewAllClick = () => {
    // For simplicity, navigate to a category view based on title
    if (title.toLowerCase().includes("borrow")) {
      navigate(`/borrowed`);
    } else {
      navigate(`/recent`);
    }
  };
  
  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-playfair">{title}</h2>
        {items.length > 0 && (
          <button 
            className="flex items-center text-primary text-sm"
            onClick={handleViewAllClick}
          >
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div 
              key={item.id} 
              className="item-card cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-xs text-muted-foreground">From {item.owner}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 md:col-span-4 py-8 text-center">
            <p className="text-muted-foreground">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemSection;
