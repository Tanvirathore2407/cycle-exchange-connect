
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Alex Chen",
    lastMessage: "Is the textbook still available?",
    time: "10:30 AM",
    unread: true,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Jamie Smith",
    lastMessage: "Thanks for the headphones!",
    time: "Yesterday",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Taylor Roberts",
    lastMessage: "I can return the racket tomorrow",
    time: "Yesterday",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Jordan Lee",
    lastMessage: "Do you have any other books?",
    time: "Tuesday",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

const Messages = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="px-4 py-6">
        <h1 className="text-2xl font-bold font-playfair mb-4">Messages</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-9"
          />
        </div>
        
        <div className="space-y-1">
          {conversations.map(convo => (
            <Button 
              variant="ghost" 
              className={`w-full justify-start px-4 py-3 h-auto ${convo.unread ? 'bg-secondary/50' : ''}`}
              key={convo.id}
            >
              <div className="flex items-center w-full">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={convo.avatar} />
                  <AvatarFallback>{convo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{convo.name}</h3>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate pr-4">{convo.lastMessage}</p>
                </div>
                {convo.unread && <div className="h-2 w-2 bg-primary rounded-full" />}
              </div>
            </Button>
          ))}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Messages;
