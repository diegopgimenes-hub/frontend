import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // ou spinner

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
