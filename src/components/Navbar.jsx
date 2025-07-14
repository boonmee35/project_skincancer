import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaX, FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  const userData = JSON.parse(localStorage.getItem("user"));
  const fullname = userData?.fullname || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
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
              <span
                onClick={() => setShowLogout(!showLogout)}
                className="px-4 py-2 text-teal-900 font-semibold cursor-pointer"
              >
                สวัสดี, {fullname}
              </span>

              {showLogout && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
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
