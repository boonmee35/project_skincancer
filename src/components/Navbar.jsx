import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaX, FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const isLoggedIn = !!user;
  const fullname = user?.fullname;

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("ออกจากระบบสำเร็จ");
  };

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-lg font-medium text-teal-900">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 inline-block mr-2"
          />
          SkinCancerTrend
        </Link>

        <div className="hidden lg:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-teal-700 border-b-2 border-teal-700"
                : "text-gray-500 hover:text-teal-900"
            }
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive
                ? "text-teal-700 border-b-2 border-teal-700"
                : "text-gray-500 hover:text-teal-900"
            }
          >
            บทความ
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-700 border-b-2 border-teal-700"
                    : "text-gray-500 hover:text-teal-900"
                }
              >
                วิเคราะห์รูปภาพ
              </NavLink>
              <NavLink
                to="/forum"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-700 border-b-2 border-teal-700"
                    : "text-gray-500 hover:text-teal-900"
                }
              >
                ชุมชน
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-700 border-b-2 border-teal-700"
                    : "text-gray-500 hover:text-teal-900"
                }
              >
                ประวัติการวิเคราะห์
              </NavLink>
            </>
          )}
        </div>

        {/* ✅ ปุ่มขวาบน */}
        <div className="hidden lg:flex gap-4 relative">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-teal-700 hover:text-teal-900"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-900"
              >
                ลงทะเบียน
              </Link>
            </>
          ) : (
            <div className="relative">
  <div
    onClick={() => setShowLogout(!showLogout)}
    className="flex items-center gap-2 cursor-pointer"
  >
    <img
      src="/avatar.png" 
      alt="User avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex flex-col text-left">
      <span className="font-semibold text-teal-900">{fullname || "User"}</span>
    </div>
    <svg
      className={`w-4 h-4 ml-1 transition-transform ${
        showLogout ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {showLogout && (
    <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg w-56 z-50 overflow-hidden">
      <Link
        to="/profile"
        className="flex items-center px-4 py-3 hover:bg-gray-100 text-sm text-gray-800"
      >
        <svg
          className="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.212 0 4.29.536 6.121 1.49M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        แก้ไขข้อมูล
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-sm text-red-600"
      >
        <svg
          className="w-5 h-5 mr-2 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-9V5m-6 6h.01"
          />
        </svg>
        ออกจากระบบ
      </button>
    </div>
  )}
</div>
          )}
        </div>

        {/* ☰ Hamburger */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <FaX size={25} /> : <FaBars size={25} />}
        </button>
      </div>

      {/* ☰ เมนูสำหรับมือถือ */}
      {openNav && (
        <div className="lg:hidden flex flex-col gap-2 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-center pb-2 font-medium ${
                isActive ? "text-teal-700" : "text-gray-500 hover:text-teal-900"
              }`
            }
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              `text-center pb-2 font-medium ${
                isActive ? "text-teal-700" : "text-gray-500 hover:text-teal-900"
              }`
            }
          >
            บทความ
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  `text-center pb-2 font-medium ${
                    isActive
                      ? "text-teal-700"
                      : "text-gray-500 hover:text-teal-900"
                  }`
                }
              >
                วิเคราะห์รูปภาพ
              </NavLink>
              <NavLink
                to="/forum"
                className={({ isActive }) =>
                  `text-center pb-2 font-medium ${
                    isActive
                      ? "text-teal-700"
                      : "text-gray-500 hover:text-teal-900"
                  }`
                }
              >
                ชุมชน
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `text-center pb-2 font-medium ${
                    isActive
                      ? "text-teal-700"
                      : "text-gray-500 hover:text-teal-900"
                  }`
                }
              >
                ประวัติการวิเคราะห์
              </NavLink>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="mt-2 px-4 py-2 text-teal-700 text-center hover:text-teal-900"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-teal-700 text-white rounded-md text-center hover:bg-teal-900"
              >
                ลงทะเบียน
              </Link>
            </>
          ) : (
            <span className="text-center mt-2 px-4 py-2 text-teal-900 font-semibold">
              สวัสดี, {fullname}
            </span>
          )}
        </div>
      )}
    </nav>
  );
}

export default StickyNavbar;
