import React, { useState, useEffect } from "react";
import StickyNavbar from "../components/Navbar";
import { FiSearch, FiCalendar, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../admin/components/Pagination";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchArticles = async () => {
    try {
      const response = await axios.get(apiUrl + "article");
      console.log("Fetched articles:", response.data);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      console.log("ไม่สามารถโหลดบทความได้");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl + "categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      console.log("ไม่สามารถโหลดหมวดหมู่ได้");
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const paginatedArticles = () => {
    const filtered = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === "ทั้งหมด" || a.category_name === selectedCategory)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(
    articles.filter(
      (a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === "ทั้งหมด" || a.category_name === selectedCategory)
    ).length / itemsPerPage
  );

  const handleViewClick = async (id) => {
    try {
      await axios.put(`${apiUrl}article/view/${id}`);
    } catch (error) {
      console.error("ไม่สามารถอัปเดตจำนวนผู้ชม:", error);
    }
  };

  return (
    <div>
      <StickyNavbar />
      <div className="bg-[#E9FBFC] min-h-screen px-4 py-8 md:px-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">บทความ</h2>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="ค้นหาบทความ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 px-4 pl-10 rounded-lg border border-gray-300 focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="w-full md:w-1/4 py-2 px-4 border border-gray-300 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>ทั้งหมด</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {paginatedArticles().map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold mb-2">{article.title}</h4>
                <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <FiCalendar />
                    {formatDate(article.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiEye />
                    {article.view_count}
                  </div>
                </div>
                <Link
                  to={`/articles/${article.article_id}`}
                  onClick={() => handleViewClick(article.article_id)}
                >
                  <button className="bg-teal-600 hover:bg-teal-700 text-white py-1.5 px-4 rounded-md">
                    อ่านเพิ่มเติม
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Articles;
