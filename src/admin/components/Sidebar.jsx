import React, { useEffect, useState } from "react";
import {
  FaRectangleList,
  FaPen,
  FaBook,
  FaUserGroup,
  FaFileLines
} from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillHome } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Sidebar = ({ isSidebarOpen }) => {
  const { logout } = useAuth();
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0); 

  const apiUrl = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(`${apiUrl}count-report`);
        setPostCount(res.data.posts);
        setCommentCount(res.data.comments);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, [apiUrl]);

  return (
    <div className="flex">
      <div className={`w-64 h-screen bg-white text-gray-500 shadow-md p-4 transition-transform duration-300 fixed left-0 top-0 z-50 ${isSidebarOpen ? 'transform-none' : '-translate-x-full'} sm:block`}>

        <div className="mb-6 flex justify-between items-center">
          <img src="/logo.png" alt="Logo" className="mx-auto h-15 w-15" />
          <span className="text-lg font-bold text-[#22737C]">SkinCancerAnalyze</span>
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
              <FaRectangleList className="text-lg" />
              <span>จัดการหมวดหมู่บทความ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={linkClass}>
              <FaUserGroup  className="text-lg" />
              <span>จัดการผู้ใช้</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/posts" className={linkClass}>
              <div className="flex items-center gap-2">
                <FaPen className="text-lg" />
                <span>จัดการรายงานโพสต์</span>
              </div>
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{postCount}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/comments" className={linkClass}>
            <div className="flex items-center gap-2">
                <FaPen className="text-lg" />
                <span className="text-xs">จัดการรายงานความคิดเห็น</span>
            </div>
            <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{commentCount}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/analysis" className={linkClass}>
              <FaFileLines className="text-lg" />
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
