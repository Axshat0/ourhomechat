import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoginModal } from "@/components/login-modal";
import { ChatInterface } from "@/components/chat-interface";
import type { Message } from "@shared/schema";

export default function Chat() {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session storage for logged in user
  useEffect(() => {
    const storedUser = sessionStorage.getItem("ourHomeCurrentUser");
    if (storedUser && (storedUser === "akshu" || storedUser === "paru")) {
      setCurrentUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    sessionStorage.setItem("ourHomeCurrentUser", username);
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  // Poll for messages every second when logged in
  const { data: messagesData, refetch } = useQuery<{ messages: Message[] }>({
    queryKey: ["/api/messages"],
    enabled: isLoggedIn,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
  });

  const messages = messagesData?.messages || [];

  if (!isLoggedIn) {
    return <LoginModal onLogin={handleLogin} />;
  }

  return (
    <ChatInterface 
      currentUser={currentUser} 
      messages={messages} 
      onRefetchMessages={refetch}
    />
  );
}
