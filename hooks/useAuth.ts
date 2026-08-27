"use client";

import { useAuthContext } from "@/components/providers/AuthProvider";

export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
