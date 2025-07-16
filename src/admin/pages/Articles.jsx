import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from "../components/Pagination";
import ArticleModal from "../components/ArticleModal";
import { toast } from "react-toastify";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${apiUrl}article`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("ไม่สามารถโหลดบทความได้");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / perPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  }

  const handleDeleteArticle = async (articleId) => {
    if (window.confirm("คุณแน่ใจว่าต้องการลบบทความนี้?")) {
      try {
        await axios.delete(`${apiUrl}article/delete/${articleId}`);
        toast.success("ลบบทความเรียบร้อยแล้ว");
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
        toast.error("เกิดข้อผิดพลาดในการลบบทความ");
      }
    }
  }

  // เปิด modal สำหรับเพิ่ม
  const openAddModal = () => {
    setModalMode("add");
    setCurrentArticle(null);
    setShowModal(true);
  };

  // เปิด modal สำหรับแก้ไข
  const openEditModal = (article) => {
    setModalMode("edit");
    setCurrentArticle(article);
    setShowModal(true);
  };

  // ส่งข้อมูลจาก modal
  const handleSubmitModal = async (formData) => {
  try {
    if (modalMode === "add") {
      await axios.post(apiUrl + "article/insert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("เพิ่มบทความเรียบร้อยแล้ว");
    } else if (modalMode === "edit") {
      await axios.put(
        `${apiUrl}article/update/${currentArticle.article_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("แก้ไขบทความเรียบร้อยแล้ว");
    }

    setShowModal(false);
    fetchArticles();
  } catch (error) {
    console.error("Error saving article:", error);
    toast.error("เกิดข้อผิดพลาดในการบันทึกบทความ");
  }
};


  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">จัดการบทความ</h1>

        {/* Search */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อบทความ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-md pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-500" />
          </div>
          <button
            onClick={openAddModal}
            className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition"
          >
            เพิ่มบทความ
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">ชื่อบทความ</th>
                <th className="p-3 text-left">วันที่สร้าง</th>
                <th className="p-3 text-center">วันที่อัปเดต</th>
                <th className="p-3 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              ) : (
                currentArticles.map((article, index) => (
                  <tr
                    key={article.article_id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="p-3">{article.title}</td>
                    <td className="p-3">{formatDate(article.created_at)}</td>
                    <td className="p-3">{formatDate(article.updated_at)}</td>
                    <td className="p-3 text-center flex justify-center gap-3">
                      <button className="text-yellow-500 hover:text-yellow-700" onClick={() => openEditModal(article)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteArticle(article.article_id)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Modal */}
      {showModal && (
        <ArticleModal
          mode={modalMode}
          article={currentArticle}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitModal}
        />
      )}

      </div>

    </div>
  );
}

export default Articles;
