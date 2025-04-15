
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@university.edu",
    course: "Computer Science",
    year: "3",
    bio: "Computer Science student with interests in web development and AI."
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save to a database here
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    navigate("/profile");
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="px-4 py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 pl-0"
          onClick={() => navigate("/profile")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Profile
        </Button>
        
        <h1 className="text-2xl font-bold font-playfair mb-6">Edit Profile</h1>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Change profile picture</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course">Course/Major</Label>
              <Input 
                id="course" 
                name="course" 
                value={formData.course} 
                onChange={handleChange} 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="year">Year</Label>
              <Input 
                id="year" 
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              className="mt-1"
              rows={4}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default EditProfile;
