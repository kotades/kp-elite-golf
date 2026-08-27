"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase/client";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  handicap?: number;
  role?: "student" | "coach" | "admin";
  streakDays?: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithEmail: (email: string, pass: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrCreateUserProfile = async (firebaseUser: User) => {
    try {
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userDocRef);

      if (snap.exists()) {
        const data = snap.data();
        setProfile({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: data.displayName || firebaseUser.displayName || "Tour Golfer",
          photoURL: data.photoURL || firebaseUser.photoURL,
          handicap: data.handicap ?? 12.4,
          role: data.role || "student",
          streakDays: data.streakDays ?? 3,
        });
      } else {
        const defaultProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Tour Golfer"),
          photoURL: firebaseUser.photoURL || "/coaches/coach-1.jpg",
          handicap: 12.4,
          role: "student",
          streakDays: 3,
        };

        await setDoc(
          userDocRef,
          {
            ...defaultProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

        setProfile(defaultProfile);
      }
    } catch (err) {
      console.error("Error fetching or creating user profile:", err);
      // Fallback profile
      setProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || "Tour Golfer",
        photoURL: firebaseUser.photoURL,
        handicap: 12.4,
        role: "student",
        streakDays: 3,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchOrCreateUserProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchOrCreateUserProfile(auth.currentUser);
    }
  };

  const signInWithGoogle = async (): Promise<UserCredential> => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await fetchOrCreateUserProfile(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      await fetchOrCreateUserProfile(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    name?: string
  ): Promise<UserCredential> => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (name && result.user) {
        await updateProfile(result.user, { displayName: name });
      }
      await fetchOrCreateUserProfile(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
