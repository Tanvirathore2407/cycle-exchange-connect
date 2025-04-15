
import { ChevronRight } from "lucide-react";

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
  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-playfair">{title}</h2>
        <button className="flex items-center text-primary text-sm">
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="item-card">
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
