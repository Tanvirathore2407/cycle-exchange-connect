import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, PaperclipIcon, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

const messageHistory = [
  { id: 1, sender: "other", text: "Hi, is the textbook still available?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Yes, it's still available. When would you like to pick it up?", time: "10:32 AM" },
  { id: 3, sender: "other", text: "Great! Can I pick it up tomorrow afternoon?", time: "10:35 AM" },
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(messageHistory);
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
    
    toast({
      description: "Message sent",
    });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="px-4 py-6">
        <h1 className="text-2xl font-bold font-playfair mb-4">Messages</h1>
        
        {activeConversation === null ? (
          <>
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
                  onClick={() => setActiveConversation(convo.id)}
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
          </>
        ) : (
          <div className="flex flex-col h-[calc(100vh-13rem)]">
            <div className="flex items-center pb-4 border-b">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={() => setActiveConversation(null)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={conversations.find(c => c.id === activeConversation)?.avatar} />
                <AvatarFallback>
                  {conversations.find(c => c.id === activeConversation)?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-medium">{conversations.find(c => c.id === activeConversation)?.name}</h3>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender !== 'me' && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={conversations.find(c => c.id === activeConversation)?.avatar} />
                      <AvatarFallback>
                        {conversations.find(c => c.id === activeConversation)?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="max-w-[70%]">
                    <div 
                      className={`rounded-lg px-4 py-2 ${
                        msg.sender === 'me' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-auto">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
                
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1 mx-2"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                
                <Button 
                  size="icon" 
                  className={`${!messageText.trim() ? 'opacity-50' : ''}`}
                  disabled={!messageText.trim()}
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Messages;
