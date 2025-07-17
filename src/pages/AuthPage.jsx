import React from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <>
      <nav className="sticky top-0 z-10 bg-white shadow-md w-full px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between">
            <Link to="/" className="text-lg font-bold text-teal-900">
                <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-8 inline-block mr-2"
                />
                SkinCancerTrend
            </Link>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
          {/* Tabs */}
          <div className="flex border-b mb-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex-1 text-center pb-2 font-medium ${
                  isActive
                    ? "text-teal-700 border-b-5 border-teal-700"
                    : "text-gray-400"
                }`
              }
            >
              เข้าสู่ระบบ
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex-1 text-center pb-2 font-medium ${
                  isActive
                    ? "text-teal-700 border-b-5 border-teal-700"
                    : "text-gray-400"
                }`
              }
            >
              ลงทะเบียน
            </NavLink>
          </div>

          {/* Route Content */}
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Link below */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? (
              <>
                ยังไม่มีบัญชี ?{" "}
                <Link
                  to="/register"
                  className="text-teal-700 font-medium hover:underline"
                >
                  ลงทะเบียนเลยตอนนี้
                </Link>
              </>
            ) : (
              <>
                มีบัญชีอยู่แล้ว{" "}
                <Link
                  to="/login"
                  className="text-teal-700 font-medium hover:underline"
                >
                  เข้าสู่ระบบตอนนี้
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;