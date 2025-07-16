import React,{useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import Head from './components/Head'
import { Outlet } from 'react-router-dom';

function AdminLayout() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      </div>
    </>
  );
}

export default AdminLayout