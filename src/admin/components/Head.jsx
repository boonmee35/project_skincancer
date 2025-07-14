import React from 'react';
import { FaBars } from "react-icons/fa6";

function Head({ toggleSidebar }) {
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
      <div className="flex items-center gap-2">
        <img src="/path/to/user-avatar.jpg" alt="User" className="w-8 h-8 rounded-full" />
      </div>
    </header>
  );
}

export default Head;
