import React,{useState} from 'react';
import { FaBars } from "react-icons/fa6";
import { useAuth } from '../../contexts/AuthContext';

function Head({ toggleSidebar }) {
  const {user} = useAuth();

  const fullname = user?.fullname;
  const avatar = user?.avatar;

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Toggle button - always visible */}
        <button
          className="text-2xl text-gray-700"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      {/* Right section (optional for later use, e.g. user avatar) */}
      <div
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={avatar}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-teal-900">
                    {fullname}
                  </span>
                </div>
              </div>
    </header>
  );
}

export default Head;
