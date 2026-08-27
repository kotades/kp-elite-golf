"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Trophy, Mail, Lock, User as UserIcon, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
}

export default function AuthModal({
  isOpen,
  onOpenChange,
  defaultTab = "signin",
}: AuthModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

  const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError(null);
    setSuccessMsg(null);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onOpenChange(false);
      resetForm();
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setError(err?.message || "Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      onOpenChange(false);
      resetForm();
    } catch (err: any) {
      console.error("Email sign in error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please verify your credentials.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please reset your password or try again later.");
      } else {
        setError(err.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }
      await signUpWithEmail(email, password, name);
      setSuccessMsg("Account created successfully! Welcome to KP Elite Golf.");
      setTimeout(() => {
        onOpenChange(false);
        resetForm();
      }, 1200);
    } catch (err: any) {
      console.error("Email sign up error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) resetForm();
      }}
    >
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-[#161B22] via-[#0D1117] to-[#0B2B1F] border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 rounded-3xl">
        <DialogHeader className="space-y-3 text-center sm:text-center items-center">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-[#154734] to-[#0B2B1F] border border-[#D4AF37]/60 flex items-center justify-center shadow-lg mx-auto">
            <Trophy className="size-6 text-[#D4AF37]" />
          </div>
          <DialogTitle className="font-serif text-2xl font-bold text-white tracking-wide">
            KP Elite Golf Academy
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-300">
            Access PGA-caliber swing analysis, 24/7 AI voice coaching, and personalized video curriculum.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1-Click Google Auth */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full bg-[#0D1117] hover:bg-[#161B22] text-white border border-[#30363D] hover:border-[#D4AF37]/50 py-3 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer font-medium text-xs shadow-md"
          >
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#30363D] w-full" />
            <span className="bg-[#161B22] px-3 text-[10px] uppercase font-mono tracking-widest text-gray-400 absolute">
              Or with email
            </span>
          </div>
        </div>

        {/* Tabbed Auth Forms */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val as "signin" | "signup");
            setError(null);
          }}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 bg-[#0D1117] p-1 border border-[#30363D] rounded-xl h-10 mb-4">
            <TabsTrigger
              value="signin"
              className="text-xs font-semibold data-[state=active]:bg-[#154734] data-[state=active]:text-[#D4AF37]"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="text-xs font-semibold data-[state=active]:bg-[#154734] data-[state=active]:text-[#D4AF37]"
            >
              Create Account
            </TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="signin">
            <form onSubmit={handleEmailSignIn} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="size-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="golfer@kp-elite.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-gray-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="size-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-bold text-xs py-2.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In to Academy</span>
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Create Account Form */}
          <TabsContent value="signup">
            <form onSubmit={handleEmailSignUp} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="size-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Jordan Spieth"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="size-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="golfer@kp-elite.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-300">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="size-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0B2B1F] font-bold text-xs py-2.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Academy Account</span>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
