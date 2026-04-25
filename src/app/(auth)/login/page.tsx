"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Zap, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.user) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background animated-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md relative bg-white/5 border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="w-full">
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.38 8.55 1 10.22 1 12s.38 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.178-3.502-1.178-2.092 0-4.548 1.257-5.069 3.292l-1.699-.643C2.412 5.599 4.887 4 7.507 4c2.62 0 4.927 1.671 5.551 3.82-.025 1.083-.127 2.35-.402 3.458l1.578 1.576c.395-.949.671-1.95.671-2.737 0-2.813-2.167-5.178-5.152-5.178zM4.891 8.121c-.225-.676-.344-1.411-.344-2.121 0-2.62 2.167-5.178 5.152-5.178 1.078 0 2.106.299 2.977.889l1.799-1.257C14.959 1.478 12.942 1 10.608 1c-4.361 0-8.146 3.506-8.146 8.268 0 1.343.306 2.627.889 3.779l1.64 1.532zM16.446 11.894c-.225-.676-.344-1.411-.344-2.121 0-2.62 2.167-5.178 5.152-5.178 1.078 0 2.106.299 2.977.889l1.799-1.257C24.207 1.478 22.19 1 19.856 1c-4.361 0-8.146 3.506-8.146 8.268 0 1.343.306 2.627.889 3.779l1.64 1.532z" fill="#1877F2"/>
                <path d="M23.962 11.775c0-.687-.059-1.361-.165-2.007l-1.702-.646c-.495.955-1.415 1.771-2.631 2.207l1.544 1.214c.433-1.305.679-2.706.679-4.268 0-.768-.088-1.515-.256-2.233l1.706-.644c.336.946.516 1.957.516 2.877 0 1.063-.165 2.074-.481 2.995l1.551 1.213c.316-.921.495-1.903.495-2.904zM19.856 22.951c2.62 0 4.927-1.671 5.551-3.82.025-1.083.127-2.35.402-3.458l-1.578-1.576c-.395.949-.671 1.95-.671 2.737 0 2.813 2.167 5.178 5.152 5.178.948 0 2.415-1.178 3.502-1.178-2.092 0-4.548-1.257-5.069-3.292l1.699.643c.54 2.336 2.949 4.099 5.685 4.099-4.627-4.265-6.437-9.922-6.437-15.268C8.073 3.506 4.887 0 1.608 0c-4.361 0-8.146 3.506-8.146 8.268 0 1.343.306 2.627.889 3.779l1.64 1.532c.225-.676.344-1.411.344-2.121 0-2.167 1.257-4.548 1.257-4.548s-1.257-1.257-1.257-1.257c0 0-.919.768-1.257 1.257S.001 8.227.001 10.608c0 2.62 2.167 5.178 5.152 5.178 2.62 0 4.927-1.671 5.551-3.82.025-1.083.127-2.35.402-3.458l-1.578-1.576c-.395.949-.671 1.95-.671 2.737z" fill="#1877F2"/>
                <path d="M16.446 11.894c.225-.676.344-1.411.344-2.121 0-2.62-2.167-5.178-5.152-5.178-1.078 0-2.106.299-2.977.889l1.799 1.257c.871-.59 1.899-.889 2.977-.889 4.361 0 8.146 3.506 8.146 8.268 0 1.343-.306 2.627-.889 3.779l-1.64-1.532z" fill="#1877F2"/>
              </svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}