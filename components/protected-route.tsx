"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      switch (user?.role) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "ADVERTISER":
          router.push("/dashboard/advertiser");
          break;
        case "USER":
          router.push("/dashboard/user");
          break;
        default:
          router.push("/");
      }
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  // Show nothing while checking authentication
  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
