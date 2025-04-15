
import { Footprints, Shirt, BookOpen, Pill, Laptop, Watch } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Shoes",
    slug: "shoes",
    icon: Footprints,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    name: "Books & Stationery",
    slug: "books",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    name: "Medicines",
    slug: "medicines",
    icon: Pill,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    name: "Electronics",
    slug: "electronics",
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 6,
    name: "Accessories",
    slug: "accessories",
    icon: Watch,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const Categories = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/category/${categorySlug}`);
  };
  
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold font-playfair mb-4">Categories</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-card cursor-pointer"
            onClick={() => handleCategoryClick(category.slug)}
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="category-card-image"
            />
            <div className="category-label">
              <span>{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
