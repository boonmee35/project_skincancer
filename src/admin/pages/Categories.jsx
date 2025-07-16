import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
import CategoryModal from "../components/CategoryModal";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("ไม่สามารถโหลดหมวดหมู่ได้");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filteredCategories = categories.filter((categorie) =>
    categorie.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / perPage);
  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("คุณแน่ใจว่าต้องการลบหมวดหมู่นี้?")) return;
    try {
      await axios.delete(`${apiUrl}categories/delete/${id}`);
      toast.success("ลบหมวดหมู่เรียบร้อยแล้ว");
      fetchCategories();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
      console.error("Error deleting category:", error);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSubmitModal = async ({ name }) => {
    try {
      if (modalMode === "add") {
        await axios.post(apiUrl + "categories/insert", {
          name,
        });
        toast.success("เพิ่มหมวดหมู่เรียบร้อยแล้ว");
      } else {
        await axios.put(
          `${apiUrl}categories/update/${selectedCategory.category_id}`,
          {
            name,
          }
        );
        toast.success("แก้ไขหมวดหมู่เรียบร้อยแล้ว");
      }
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการบันทึกหมวดหมู่");
      console.error("Error saving category:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          จัดการหมวดหมู่
        </h1>

        {/* Search */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อหมวดหมู่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-md pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-500" />
          </div>
          <button
            onClick={openAddModal}
            className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition"
          >
            เพิ่มหมวดหมู่
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">ชื่อหมวดหมู่</th>
                <th className="p-3 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              ) : (
                currentCategories.map((cat, index) => (
                  <tr
                    key={cat.category_id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="p-3">{cat.category_name}</td>
                    <td className="p-3 text-center flex justify-center gap-3">
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => openEditModal(cat)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteCategory(cat.category_id)}
                      >
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
          <CategoryModal
            mode={modalMode}
            category={selectedCategory}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmitModal}
          />
        )}
      </div>

    </div>
  );
}

export default Categories;
