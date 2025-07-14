import { Outlet, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Head from "../components/Head";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div
        className={`flex-1 transition-transform duration-300 bg-gray-200 h-full ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Head toggleSidebar={toggleSidebar} />
        <Outlet />

        {location.pathname === "/admin" && (
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Admin Dashboard</h1>
              <p className="text-gray-600">
                This is your central hub for managing users, articles, categories, and posts.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
