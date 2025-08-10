import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

interface LoginModalProps {
  onLogin: (username: string) => void;
}

export function LoginModal({ onLogin }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await apiRequest("POST", "/api/login", { username });
      return response.json();
    },
    onSuccess: () => {
      onLogin(username);
    },
    onError: (error: any) => {
      toast({
        title: "Access Denied",
        description: error.message || "Authorized users only.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(username.trim().toLowerCase());
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md bg-card border shadow-xl">
        <CardHeader className="text-center space-y-4 sm:space-y-6 pb-4 sm:pb-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xl sm:text-2xl text-primary-foreground">💬</span>
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl text-foreground">Chat Access</CardTitle>
            <CardDescription className="text-muted-foreground mt-1 sm:mt-2 text-sm">
              Enter your username to continue
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
            <div>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-input bg-background text-foreground rounded-xl focus:ring-2 focus:ring-ring focus:border-ring focus:outline-none transition-colors duration-200"
                required
                data-testid="input-username"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3 rounded-xl transition-all duration-200 font-medium text-sm sm:text-base"
              disabled={loginMutation.isPending}
              data-testid="button-login"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
            <p className="text-center text-xs text-muted-foreground">
              Authorized users only
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
