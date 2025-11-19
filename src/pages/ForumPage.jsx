import React, { useState, useEffect } from "react";
import StickyNavbar from "../components/Navbar";
import PostModal from "../components/PostModal";
import axios from "axios";
import PostViewModal from "../components/PostViewModal";
import { useAuth } from "../contexts/AuthContext";
import { FaEllipsisVertical } from "react-icons/fa6";
import Pagination from "../admin/components/Pagination";
import { toast } from "react-toastify";
import ReportForm from "../components/ReportForm";
import Swal from "sweetalert2";

const ForumPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [postHistory, setPostHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [countPosts, setCountPosts] = useState(0);
  const [reportingPostId, setReportingPostId] = useState(null);

  const { user } = useAuth();
  const user_id = user?.id;

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(apiUrl + "forum/posts");
      setPosts(response.data.posts);
      setCountPosts(response.data.total);
    } catch (error) {
      console.error("Error fetching posts:", error);
      console.log("ไม่สามารถโหลดโพสต์ได้");
    }
  };

  const fetchPostHistory = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}forum/posts/history/${user_id}`
      );
      setPostHistory(response.data.posts);
      setCountPosts(response.data.total);
    } catch (error) {
      console.error("Error fetching post history:", error);
      console.log("ไม่สามารถโหลดประวัติการโพสต์ได้");
    }
  };

  useEffect(() => {
    if (activeTab === "all") {
      fetchPosts();
    } else if (activeTab === "history" && user_id) {
      fetchPostHistory();
    }
  }, [activeTab, user_id]);

  const handleSavePost = async (formData) => {
    try {
      if (editingPost) {
        await axios.put(
          `${apiUrl}forum/posts/${editingPost.post_id}`,
          formData
        );
      } else {
        await axios.post(`${apiUrl}forum/posts`, formData);
      }
      Swal.fire({
        icon: "success",
        title: "โพสต์เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500
      });
      setShowModal(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถบันทึกโพสต์ได้",
        text: error.response?.data?.error || "เกิดข้อผิดพลาด",
      });
    }
  };

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบโพสต์นี้หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบโพสต์!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
      await axios.delete(`${apiUrl}forum/posts/${postId}`);
      Swal.fire("ลบแล้ว!", "โพสต์ของคุณถูกลบเรียบร้อยแล้ว.", "success");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire("ข้อผิดพลาด!", "ไม่สามารถลบโพสต์ได้.", "error");
    }
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const activePosts = activeTab === "all" ? posts : postHistory;

  const filteredPosts = activePosts.filter(
    (post) =>
      post.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTextSnippet = (html, maxLength = 50) => {
    const plainText = html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");
    return plainText.length > maxLength
      ? plainText.slice(0, maxLength) + "..."
      : plainText;
  };

  const getFirstImageFromHTML = (html) => {
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  return (
    <>
      <StickyNavbar />
      <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] p-6 lg:p-8 flex flex-col gap-6">
        {/* ปุ่มสร้างโพสต์ */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            ชุมชน
          </h1>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <span className="text-xl mr-2">+</span> สร้างโพสต์ใหม่
          </button>
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <ul className="flex gap-6 text-gray-700">
            <li
              className={`flex items-center gap-2 cursor-pointer py-2 px-4 text-teal-800 pb-3 ${
                activeTab === "all" ? "font-bold border-b" : ""
              }`}
              onClick={() => {
                setActiveTab("all");
                setCurrentPage(1);
                fetchPosts();
              }}
            >
              โพสต์ทั้งหมด
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-teal-50 transition-colors ${
                activeTab === "history"
                  ? "font-bold text-teal-800 border-b"
                  : ""
              }`}
              onClick={() => {
                setActiveTab("history");
                setCurrentPage(1);
                fetchPostHistory();
              }}
            >
              ประวัติการโพสต์ของฉัน
            </li>
          </ul>
          {/* ช่องค้นหา */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="ค้นหาชื่อผู้โพสต์หรือเนื้อหา..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* รายการโพสต์ */}
        {paginatedPosts.map((post, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => {
              setSelectedPostId(post.post_id);
              setViewModalOpen(true);
            }}
          >
            {/* จุด 3 จุด */}
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpenId(
                  menuOpenId === post.post_id ? null : post.post_id
                );
              }}
            >
              <FaEllipsisVertical className="text-gray-600 hover:text-teal-600" />
            </div>

            {menuOpenId === post.post_id && (
              <div
                className="absolute right-4 top-10 bg-white border shadow-md rounded-lg z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {post.user_id === user_id ? (
                  <>
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setShowModal(true);
                        setMenuOpenId(null);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      แก้ไขโพสต์
                    </button>
                    <button
                      onClick={() => {
                        handleDeletePost(post.post_id);
                        setMenuOpenId(null);
                      }}
                      className="block px-4 py-2 hover:bg-red-100 text-red-600 w-full text-left cursor-pointer"
                    >
                      ลบโพสต์
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setReportingPostId(post.post_id);
                      setMenuOpenId(null);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left cursor-pointer"
                  >
                    รายงานโพสต์
                  </button>
                )}
              </div>
            )}

            {/* ข้อมูลโพสต์ */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={
                  post.avatar ||
                  "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                }
                className="rounded-full w-12 h-12 border-2 border-teal-300 object-cover"
                alt="avatar"
              />
              <div>
                <div className="font-semibold text-base text-gray-800">
                  {post.fullname}
                </div>
                <div className="text-xs text-gray-500">{post.created_at}</div>
              </div>
            </div>

            <div className="text-gray-700 text-base leading-relaxed mb-4">
              <div className="font-semibold text-lg text-teal-700 mb-1">
                {post.title}
              </div>
              <p className="text-sm text-gray-600">
                {getTextSnippet(post.content, 120)}
              </p>
            </div>

            {/* รูปจากเนื้อหา */}
            {getFirstImageFromHTML(post.content) && (
              <img
                src={getFirstImageFromHTML(post.content)}
                alt="preview"
                className="w-full mt-4 rounded-lg shadow-md max-h-80 object-cover"
              />
            )}

            <div className="text-sm text-gray-500 flex items-center gap-1 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-teal-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{post.comment_count || 0} ความคิดเห็น</span>
            </div>
          </div>
        ))}

        {reportingPostId && (
              <ReportForm
                type="post"
                targetId={reportingPostId}
                onClose={() => setReportingPostId(null)}
              />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <div className="text-center text-gray-700 text-sm">
          ( ทั้งหมด {countPosts} โพสต์ )
        </div>

        <PostModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingPost(null);
          }}
          onSave={handleSavePost}
          initialData={editingPost}
        />

        <PostViewModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          postId={selectedPostId}
        />
      </div>
    </>
  );
};

export default ForumPage;
