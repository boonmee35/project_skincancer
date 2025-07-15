import React, { useState, useEffect } from "react";
import StickyNavbar from "../components/Navbar";
import PostModal from "../components/PostModal";
import axios from "axios";

const ForumPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(apiUrl + "forum/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      console.log("ไม่สามารถโหลดโพสต์ได้");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSavePost = async (formData) => {
    try {
      const response = await axios.post(apiUrl + "forum/posts", formData);
      console.log("Post saved:", response.data);
      setShowModal(false);
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <>
      <StickyNavbar />
      <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-white rounded-xl p-6 shadow-lg self-start">
          <h2 className="font-extrabold text-2xl text-teal-800 mb-4 border-b pb-3">
            การสนทนาทั่วไป
          </h2>
          <ul className="text-gray-700 space-y-3">
            <li className="py-2 px-3 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              ประวัติการโพสต์
            </li>
            {/* Add more categories here if needed */}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-teal-800">ชุมชน</h1>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              <span className="text-xl mr-2">+</span> สร้างโพสต์ใหม่
            </button>
          </div>

          {/* Posts List */}
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300"
            >
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
                    {post.author || "ผู้ใช้"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {post.created_at
                      ? new Date(post.created_at).toLocaleString()
                      : "ไม่ทราบเวลา"}
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {post.content}
              </p>

              {/* ถ้ามีรูปภาพในโพสต์ ให้แสดงรูป */}
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
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
        </main>

        {/* User Profile */}
        <aside className="w-full lg:w-1/5 bg-white rounded-xl p-6 shadow-lg self-start">
          <div className="flex flex-col items-center gap-3 mb-6">
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
              className="rounded-full w-24 h-24 border-4 border-teal-400 object-cover"
              alt="User"
            />
            <div className="text-center">
              <div className="font-bold text-xl text-gray-900">User</div>
              <div className="text-sm text-gray-500">@username</div>
            </div>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg w-full mb-6 shadow-md hover:shadow-lg transition-all duration-300">
            แก้ไขโปรไฟล์
          </button>
          <div className="text-sm text-gray-700 space-y-2">
            <h3 className="font-semibold text-base text-gray-800 mb-2">
              กฎของฟอรั่ม:
            </h3>
            <p className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✔</span>{" "}
              ให้ความเคารพซึ่งกันและกัน
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500 text-lg">✖</span>{" "}
              ห้ามโพสต์ข้อมูลส่วนตัว
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500 text-lg">✖</span>{" "}
              ห้ามโฆษณาสินค้าหรือบริการ
            </p>
          </div>
        </aside>

        <PostModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSavePost}
        />
      </div>
    </>
  );
};

export default ForumPage;
