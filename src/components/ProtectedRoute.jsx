import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PublicOnlyRoute() {
  const { user } = useAuth();
  return user ? <Navigate to={user.role === "admin" ? "/admin" : "/"} /> : <Outlet />;
}

export function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export function AdminRoute() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;

  return <Outlet />;
}