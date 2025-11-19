import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// 🔓 Routes ที่ต้องการเฉพาะ guest (เช่น login/register)
export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // หรือ spinner
  }

  return user ? (
    <Navigate to={user.role === "admin" ? "/admin" : "/"} />
  ) : (
    <Outlet />
  );
}

// 🔒 Routes ที่ต้องการ user login แล้ว
export function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

// 🔒 Routes ที่ต้องการเฉพาะ admin
export function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return <Outlet />;
}
