import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";
import { PhysicsFormulas } from "@/components/physics-formulas";
import type { Message } from "@shared/schema";
import { Send, Trash2, Moon, Sun, Calculator } from "lucide-react";

interface ChatInterfaceProps {
  currentUser: string;
  messages: Message[];
  onRefetchMessages: () => void;
}

export function ChatInterface({ currentUser, messages, onRefetchMessages }: ChatInterfaceProps) {
  const [messageInput, setMessageInput] = useState("");
  const [showPhysicsFormulas, setShowPhysicsFormulas] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest("POST", "/api/messages", {
        sender: currentUser,
        text,
      });
      return response.json();
    },
    onSuccess: () => {
      setMessageInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const deleteAllMessagesMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/messages");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Success",
        description: "All messages have been deleted",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete messages",
        variant: "destructive",
      });
    },
  });

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage) return;
    sendMessageMutation.mutate(trimmedMessage);
  };

  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all messages? This cannot be undone.")) {
      deleteAllMessagesMutation.mutate();
    }
  };

  const formatTimestamp = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border px-3 sm:px-4 py-3 sm:py-4 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-base sm:text-lg">💬</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">Chat Space</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Secure messaging</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-3">
              <span className="hidden sm:inline text-sm text-muted-foreground">
                Hi, <span className="font-medium text-foreground">{currentUser}</span>!
              </span>
              <Button
                onClick={() => setShowPhysicsFormulas(true)}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm font-medium px-2 sm:px-3"
                data-testid="button-physics-formulas"
              >
                <Calculator className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                <span className="hidden sm:inline">Physics</span>
              </Button>
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm font-medium px-2 sm:px-3"
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
              </Button>
              <Button
                onClick={handleDeleteAll}
                variant="destructive"
                size="sm"
                className="text-xs sm:text-sm font-medium px-2 sm:px-3"
                disabled={deleteAllMessagesMutation.isPending}
                data-testid="button-delete-all"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6" ref={messagesContainerRef}>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3 sm:space-y-4" data-testid="messages-container">
              {messages.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">💬</span>
                  </div>
                  <p className="text-muted-foreground text-base sm:text-lg">No messages yet</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2">Start a conversation</p>
                </div>
              ) : (
                messages.map((message) => {
                  const isCurrentUser = message.sender === currentUser;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} message-slide-in`}
                      data-testid={`message-${message.id}`}
                    >
                      <div className="max-w-[85%] sm:max-w-xs lg:max-w-md">
                        <div className={`flex items-end space-x-2 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${isCurrentUser ? "bg-primary" : "bg-secondary"} flex items-center justify-center text-xs sm:text-sm font-medium ${isCurrentUser ? "text-primary-foreground" : "text-secondary-foreground"}`}>
                            {message.sender.charAt(0).toUpperCase()}
                          </div>
                          <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                            <div className={`px-3 sm:px-4 py-2 rounded-2xl shadow-sm ${isCurrentUser ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card text-card-foreground border border-border rounded-bl-md"}`}>
                              <p className="text-sm leading-relaxed" data-testid={`text-message-${message.id}`}>
                                {message.text}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2" data-testid={`timestamp-${message.id}`}>
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Message Input Footer */}
        <footer className="bg-card/80 backdrop-blur-sm border-t border-border p-3 sm:p-4 sticky bottom-0">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-end space-x-2 sm:space-x-3" data-testid="message-form">
              <div className="flex-1">
                <Textarea
                  ref={textareaRef}
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-input bg-background text-foreground rounded-xl resize-none focus:ring-2 focus:ring-ring focus:border-ring focus:outline-none transition-colors duration-200 min-h-[40px] sm:min-h-[48px] max-h-32"
                  rows={1}
                  data-testid="input-message"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 sm:p-3 rounded-xl transition-all duration-200 disabled:opacity-50 min-w-[40px] sm:min-w-[48px]"
                disabled={sendMessageMutation.isPending || !messageInput.trim()}
                data-testid="button-send"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </form>
          </div>
        </footer>
      </div>

      {/* Physics Formulas Overlay */}
      <PhysicsFormulas 
        isOpen={showPhysicsFormulas} 
        onClose={() => setShowPhysicsFormulas(false)} 
      />
    </>
  );
}
