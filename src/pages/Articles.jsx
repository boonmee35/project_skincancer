import React, { useState, useEffect } from "react";
import StickyNavbar from "../components/Navbar";
import { FiSearch, FiCalendar, FiEye } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "../admin/components/Pagination";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedCancerType, setSelectedCancerType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const location = useLocation();

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
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get("category");
    const cancerTypeFromQuery = queryParams.get("cancer_types");

    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
    if (cancerTypeFromQuery) {
      setSelectedCancerType(cancerTypeFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const paginatedArticles = () => {
    const filtered = articles.filter((a) => {
      const matchesSearch = a.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "ทั้งหมด" || a.category_name === selectedCategory;

      const matchesCancerType =
        !selectedCancerType ||
        (Array.isArray(a.cancer_types) &&
          a.cancer_types.includes(selectedCancerType));

      return matchesSearch && matchesCategory && matchesCancerType;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(
    articles.filter((a) => {
      const matchesSearch = a.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "ทั้งหมด" || a.category_name === selectedCategory;

      const matchesCancerType =
        !selectedCancerType ||
        (Array.isArray(a.cancer_types) &&
          a.cancer_types.includes(selectedCancerType));

      return matchesSearch && matchesCategory && matchesCancerType;
    }).length / itemsPerPage
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
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
          บทความ
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 max-w-4xl mx-auto">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="ค้นหาบทความ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 px-5 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition duration-200"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* หมวดหมู่ */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-gray-600 mb-1">
              หมวดหมู่บทความ
            </label>
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
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

          {/* ประเภทมะเร็งผิวหนัง */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-gray-600 mb-1">
              ประเภทมะเร็งผิวหนัง
            </label>
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
              value={selectedCancerType || ""}
              onChange={(e) =>
                setSelectedCancerType(
                  e.target.value === "" ? null : e.target.value
                )
              }
            >
              <option value="">ทั้งหมด</option>
              <option value="melanoma">เมลาโนมา</option>
              <option value="scc">สแควมัสเซลล์ (SCC)</option>
              <option value="bcc">บาซัลเซลล์ (BCC)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles().map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition duration-300 flex flex-col"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              {/* เนื้อหาพร้อมปุ่ม */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {article.category_name}
                  </span>
                  {article.cancer_types.map((type) => (
                    <span
                      key={type}
                      className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 ml-2"
                    >
                      {type}
                    </span>
                  ))}
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
                </div>
                <div className="flex justify-end mt-auto">
                  <Link
                    to={`/articles/${article.article_id}`}
                    onClick={() => handleViewClick(article.article_id)}
                  >
                    <button className="bg-teal-600 hover:bg-teal-700 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
                      อ่านเพิ่มเติม
                    </button>
                  </Link>
                </div>
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
