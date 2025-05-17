
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, User } from "lucide-react";
import AuthenticationStep from "./AuthenticationStep";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [loginMethod, setLoginMethod] = useState<"voice" | "traditional">("voice");
  
  const handleTraditionalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    setTimeout(onLoginSuccess, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-healthcare-light-blue">
      <CardHeader className="bg-gradient-to-r from-healthcare-blue to-healthcare-accent text-white rounded-t-lg">
        <CardTitle className="text-center">HealthVoice Login</CardTitle>
        <CardDescription className="text-white/80 text-center">
          Secure access to healthcare portal
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="voice" onValueChange={(v) => setLoginMethod(v as "voice" | "traditional")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic size={16} /> Voice Login
            </TabsTrigger>
            <TabsTrigger value="traditional" className="flex items-center gap-2">
              <User size={16} /> Traditional
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="voice" className="mt-0">
            <AuthenticationStep onComplete={onLoginSuccess} />
          </TabsContent>
          
          <TabsContent value="traditional" className="mt-0">
            <form onSubmit={handleTraditionalLogin}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-sm font-medium text-healthcare-blue hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
                <Button type="submit" className="w-full bg-healthcare-blue hover:bg-healthcare-accent">
                  Sign In
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="text-center text-sm text-muted-foreground">
          <span>Don't have an account? </span>
          <a
            href="#"
            className="font-medium text-healthcare-blue hover:underline"
          >
            Contact Your Administrator
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
