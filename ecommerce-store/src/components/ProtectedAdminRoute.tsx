// src/components/ProtectedAdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/useAdminAuth";

export default function ProtectedAdminRoute() {
  const { admin, loading } = useAdminAuth();

  if (loading) return <p>Loading...</p>;

  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
