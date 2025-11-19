import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import Pagination from "../components/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isActive, setIsActive] = useState("ปกติ");
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // กดปุ่มแก้ไข
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsActive(user.is_active);
    setReason(user.reason || "");
    setShowModal(true);
  };

  // กดยืนยันการแก้ไข
  const handleUpdate = async () => {
    if (isActive === "ถูกระงับ" && reason.trim() === "") {
      alert("กรุณากรอกเหตุผลที่ระงับ");
      return;
    }

    try {
      await axios.put(`${apiUrl}users/${selectedUser.user_id}/updateStatus`, {
        is_active: isActive,
        reason: reason,
      });

      Swal.fire({
        icon: "success",
        title: "อัปเดตสถานะผู้ใช้เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถอัปเดตสถานะผู้ใช้ได้",
      });
    }
  };

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">จัดการผู้ใช้</h1>

        {/* Search */}
        <div className="flex items-center mb-4">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อหรืออีเมล..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-md pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-500" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-b">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">ชื่อ</th>
                <th className="p-3 text-left">อีเมล</th>
                <th className="p-3 text-left">วันที่สมัคร</th>
                <th className="p-3 text-left">สถานะ</th>
                <th className="p-3 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    ไม่พบข้อมูลผู้ใช้
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="p-3">{user.fullname}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.created_at}</td>
                    <td className="p-3">
                      <span
                        className={`${
                          user.is_active === "ปกติ"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {user.is_active}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => handleEditClick(user)}
                      >
                        <FaEdit />
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">แก้ไขสถานะผู้ใช้</h2>
            <p className="mb-2">ชื่อ: {selectedUser.fullname}</p>
            <p className="mb-2">อีเมล: {selectedUser.email}</p>

            <label className="block mb-2">สถานะ</label>
            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            >
              <option value="ปกติ">ปกติ</option>
              <option value="ถูกระงับ">ถูกระงับ</option>
            </select>

            {isActive === "ถูกระงับ" && (
              <div>
                <label className="block mb-2">เหตุผลที่ระงับ</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded-md p-2"
                  rows="3"
                  placeholder="กรอกเหตุผล..."
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => setShowModal(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
