import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaX } from "react-icons/fa6";

function Comments() {
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [reports, setReports] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}forum/posts/comments/reported`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const openModal = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);

    try {
      const fetchReport = async () => {
        const response = await axios.get(
          `${apiUrl}forum/posts/comments/reported/comment/${comment.comment_id}`
        );
        setReports(response.data);
        console.log("Fetched report:", response.data);
      };
      fetchReport();
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const closeModal = () => {
    setSelectedComment(null);
    setReports([]);
    setIsModalOpen(false);
  };

  const updateStatus = async (status) => {
    if (!selectedComment) return;

    // const result = await Swal.fire({
    //   title: "เลือกการจัดการ",
    //   text: "คุณต้องการจัดการเฉพาะรายงานนี้หรือทั้งหมดของความคิดเห็นนี้?",
    //   icon: "question",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "ทั้งหมด",
    //   denyButtonText: "เฉพาะอันนี้",
    //   cancelButtonText: "ยกเลิก",
    //   reverseButtons: false,
    // });

    //   if (result.isDismissed) {
    //     return;
    //   }

    //   let scope;
    //   if (result.isConfirmed) {
    //     scope = "all";
    //   } else if (result.isDenied) {
    //     scope = "single";
    //   } else {
    //     return;
    //   }

    const scope = "all";

    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการจัดการรายงานความคิดเห็นนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${apiUrl}forum/posts/comments/report/${selectedComment.comment_id}/action`,
            {
              action: status,
              scope,
              user_id: selectedComment.user_id,
            }
          );
          Swal.fire({
            icon: "success",
            title: "อัปเดตสถานะความคิดเห็นเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });

          fetchComments();
          closeModal();
        } catch (error) {
          console.error("Error updating comment status:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการอัปเดตสถานะความคิดเห็น",
            text:
              error.response?.data?.error ||
              "ไม่สามารถอัปเดตสถานะความคิดเห็นได้",
          });
        }
      }
    });

    // try {
    //   await axios.put(
    //     `${apiUrl}forum/posts/comments/report/${selectedComment.comment_id}/action`,
    //     {
    //       action: status,
    //       scope,
    //       user_id: selectedComment.user_id,
    //     }
    //   );
    //   Swal.fire({
    //     icon: "success",
    //     title: "อัปเดตสถานะความคิดเห็นเรียบร้อยแล้ว",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });

    //   fetchComments();
    //   closeModal();
    // } catch (error) {
    //   console.error("Error updating comment status:", error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "เกิดข้อผิดพลาดในการอัปเดตสถานะความคิดเห็น",
    //     text:
    //       error.response?.data?.error || "ไม่สามารถอัปเดตสถานะความคิดเห็นได้",
    //   });
    // }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const totalPages = Math.ceil(comments.length / perPage);
  const currentReport = comments.slice(
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
        <h1 className="text-2xl font-bold mb-4">ความคิดเห็นที่ถูกแจ้งรายงาน</h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-b">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">วันที่รายงาน</th>
                <th className="p-3 text-left">หัวข้อโพสต์</th>
                <th className="p-3 text-left">ความคิดเห็น</th>
                {/* <th className="p-3 text-left">เหตุผล</th> */}
                <th className="p-3 text-center">จำนวนรายงาน</th>
                <th className="p-3 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentReport.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              ) : (
                currentReport.map((comment, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="p-3">{comment.created_at}</td>
                    <td className="p-3">{comment.post_title}</td>
                    <td className="p-3">{comment.comment_text}</td>
                    {/* <td className="p-3">{comment.reason}</td> */}
                    <td className="p-3 text-center">{comment.report_count}</td>
                    <td className="p-3 text-center">
                      <button
                        className="text-blue-500 hover:underline mr-2 cursor-pointer"
                        onClick={() => openModal(comment)}
                      >
                        <FaEye />
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

      {isModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-[#191919]/50 flex justify-center items-center z-50">
          <div
            className="bg-white max-w-2xl w-full rounded-lg p-6 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ปุ่มปิด */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-gray-500 hover:text-gray-700"
            >
              <FaX size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">รายละเอียดความคิดเห็น</h2>

            {/* โพสต์ที่คอมเมนต์อยู่ */}
            {reports.length > 0 && (
              <div className="mb-4">
                <p className="mb-2">
                  <strong>หัวข้อโพสต์:</strong> {reports[0].post_title}
                </p>
                <div className="mb-4">
                  <strong>เนื้อหาโพสต์:</strong>
                  <div
                    className="p-2 mt-1 bg-gray-50 rounded"
                    dangerouslySetInnerHTML={{
                      __html: reports[0].post_content,
                    }}
                  />
                </div>
              </div>
            )}

            {/* ข้อความคอมเมนต์ */}
            <p className="mb-4">
              <strong>ความคิดเห็น:</strong> {selectedComment.comment_text}
            </p>

            {/* รายงานทั้งหมด */}
            <h3 className="font-semibold mb-2">รายการรายงาน</h3>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {reports.map((report, i) => (
                <div key={i} className="border p-2 rounded bg-gray-50">
                  <p>
                    <strong>วันที่:</strong> {report.created_at}
                  </p>
                  <p>
                    <strong>ผู้รายงาน:</strong> {report.fullname}
                  </p>
                  <p>
                    <strong>เหตุผล:</strong> {report.reason}
                  </p>
                </div>
              ))}
            </div>

            {/* ปุ่ม action */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => updateStatus("normal")}
              >
                ไม่พบความผิดปกติ
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => updateStatus("hide")}
              >
                ซ่อนความคิดเห็น
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
