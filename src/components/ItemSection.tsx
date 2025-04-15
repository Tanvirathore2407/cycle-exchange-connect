
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  owner: string;
  image: string;
}

interface ItemSectionProps {
  title: string;
  items: Item[];
}

const ItemSection = ({ title, items }: ItemSectionProps) => {
  const navigate = useNavigate();
  
  const handleItemClick = (itemId: number) => {
    // Determine if this is a borrowed or recent item based on the title
    const source = title.toLowerCase().includes("borrow") ? "borrowed" : "recent";
    navigate(`/item/${source}/${itemId}`);
  };
  
  const handleViewAllClick = () => {
    // For simplicity, just navigate to the first item
    if (items.length > 0) {
      const source = title.toLowerCase().includes("borrow") ? "borrowed" : "recent";
      navigate(`/item/${source}/${items[0].id}`);
    }
  };
  
  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-playfair">{title}</h2>
        <button 
          className="flex items-center text-primary text-sm"
          onClick={handleViewAllClick}
        >
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="item-card cursor-pointer"
            onClick={() => handleItemClick(item.id)}
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
        ))}
      </div>
    </div>
  );
};

export default ItemSection;
