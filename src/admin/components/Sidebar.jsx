import React from "react";
import {
  FaBars,
  FaPen,
  FaBook,
  FaUser,
} from "react-icons/fa6";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { AiFillHome } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ isSidebarOpen }) => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) => `
    flex items-center gap-2 w-61 px-4 py-2 font-medium transition-all
    ${isActive
      ? 'bg-[#22737C] text-white shadow-md rounded-l-lg'
      : 'text-gray-500 hover:text-gray-700'}
  `;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex">
      <div className={`w-64 h-screen bg-white text-gray-500 shadow-md p-4 transition-transform duration-300 fixed left-0 top-0 z-50 ${isSidebarOpen ? 'transform-none' : '-translate-x-full'} sm:block`}>

        <div className="mb-6 flex justify-between items-center">
          <img src="/logo.png" alt="Logo" className="mx-auto h-15 w-15" />
          <span className="text-lg font-bold text-[#22737C]">SkinCancerTrend</span>
        </div>

        <ul className="space-y-2">
          <li>
            <NavLink to="/admin" className={linkClass} end>
              <AiFillHome className="text-lg" />
              <span>หน้าหลัก</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/articles" className={linkClass}>
              <FaBook className="text-lg" />
              <span>จัดการบทความ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories" className={linkClass}>
              <FaCog className="text-lg" />
              <span>จัดการหมวดหมู่บทความ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={linkClass}>
              <FaBook className="text-lg" />
              <span>จัดการผู้ใช้</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/posts" className={linkClass}>
              <FaPen className="text-lg" />
              <span>จัดการโพสต์</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/analysis" className={linkClass}>
              <FaPen className="text-lg" />
              <span>รายงานการวิเคราะห์</span>
            </NavLink>
          </li>
        </ul>

        <ul className="absolute bottom-6 w-full space-y-2">
          <li className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={handleLogout}>
              <FaSignOutAlt className="text-lg" />
              <span>ออกจากระบบ</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
