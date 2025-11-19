import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Pagination from "../admin/components/Pagination";

function ReportPosts() {
  const [posts, setPosts] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const apiUrl = import.meta.env.VITE_API_URL;

  const { user } = useAuth();
  const user_id = user?.id;

  const fetchReportedPosts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}forum/posts/reported/${user_id}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching reported posts:", error);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchReportedPosts();
    }
  }, [user_id]);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filteredPosts = filterType === "all"
    ? posts
    : posts.filter((post) => post.report_type === filterType);

  const totalPages = Math.ceil(filteredPosts.length / perPage);
  const currentReport = filteredPosts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ฟังก์ชันตัดข้อความให้สั้น
  const getTextSnippet = (html, maxLength = 50) => {
    const plainText = html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

    return plainText.length > maxLength
      ? plainText.slice(0, maxLength) + "..."
      : plainText;
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">ประวัติการรายงานโพสต์</h2>
      <div className="mb-4 items-end">
        <label className="mr-2 font-medium">ประเภท:</label>
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="all">ทั้งหมด</option>
          <option value="reported_by_me">รายงานโดยฉัน</option>
          <option value="reported_about_me">ถูกรายงาน</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-b">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="p-3 text-left w-32">วันที่รายงาน</th>
              <th className="p-3 text-left w-48">หัวข้อโพสต์</th>
              <th className="p-3 text-left w-64">เนื้อหาโพสต์</th>
              <th className="p-3 text-left w-40">เหตุผล</th>
              <th className="p-3 text-left w-48">ผลการดำเนินงาน</th>
              <th className="p-3 text-left w-28">สถานะ</th>
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
              currentReport.map((post, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{post.created_at}</td>
                  <td className="p-3">{getTextSnippet(post.title, 30)}</td>
                  <td className="p-3">{getTextSnippet(post.content, 50)}</td>
                  <td className="p-3">{post.reason}</td>
                  <td className="p-3">{post.review_report}</td>
                  <td className="p-3">{post.status}</td>
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
    </>
  );
}

export default ReportPosts;
