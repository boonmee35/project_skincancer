import React, { useState } from 'react';
import StickyNavbar from '../components/Navbar'
import PostModal from '../components/PostModal';
import axios from 'axios';

const ForumPage = () => {
  const [showModal, setShowModal] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSavePost = async (formData) => {
    try {
      const response = await axios.post(apiUrl + 'forum/posts', formData);
      console.log("Post saved:", response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <>
    <StickyNavbar />
    <div className="min-h-screen bg-[#d9f4f4] p-4 flex gap-4">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white rounded-lg p-4 shadow-md">
        <h2 className="font-semibold text-lg mb-2">การสนทนาทั่วไป</h2>
        <ul className="text-gray-600">
          <li className="py-1">ประวัติการโพสต์</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <div className="flex justify-end items-center mb-4">
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg" onClick={() => setShowModal(true)}>
            + สร้างโพสต์ใหม่
          </button>
        </div>

        {/* Post 1 */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
          <div className="flex items-center gap-2 mb-2">
            <img src="https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" 
            className="rounded-full w-10 h-10" alt="avatar" />
            <div>
              <div className="font-semibold text-sm">สมชาย ใจดี</div>
              <div className="text-xs text-gray-500">1 ชั่วโมงที่แล้ว</div>
            </div>
          </div>
          <h3 className="font-semibold">ประสบการณ์การรักษาเนื้อร้ายผิวหนังของผม</h3>
          <p className="text-gray-700 text-sm">
            อยากแชร์ประสบการณ์การรักษาของผมให้ทุกคนได้ทราบครับ ...
          </p>
          <div className="text-sm text-gray-500 mt-2">💬 12</div>
        </div>

        {/* Post 2 */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <img src="https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg" 
            className="rounded-full w-10 h-10" alt="avatar" />
            <div>
              <div className="font-semibold text-sm">ดร. สมศรี รักษาดี</div>
              <div className="text-xs text-gray-500">2 ชั่วโมงที่แล้ว</div>
            </div>
          </div>
          <h3 className="font-semibold">
            แนะนำวิธีป้องกันมะเร็งผิวหน้าในช่วงหน้าร้อน
          </h3>
          <p className="text-gray-700 text-sm">
            สวัสดีค่ะทุกคน วันนี้อยากจะแนะนำวิธีการป้องกันมะเร็งผิวหน้าในช่วงหน้าร้อนนี้ค่ะ ...
          </p>
          <img
            src="https://siph-space.sgp1.digitaloceanspaces.com/uploads/postHealths/2018/12/1628224264_060864_skin-care.jpg"
            alt="sunscreen"
            className="w-full mt-4 rounded-lg"
          />
          <div className="text-sm text-gray-500 mt-2">💬 35</div>
        </div>
      </main>

      {/* User Profile */}
      <aside className="w-1/5 bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" 
          className="rounded-full w-20 h-20" alt="User" />
          <div>
            <div className="font-semibold">User</div>
            <div className="text-sm text-gray-500">user</div>
          </div>
        </div>
        <button className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg w-full mb-4">
          แก้ไขโปรไฟล์
        </button>
        <div className="text-sm text-gray-700">
          <p>✅ ให้ความเคารพซึ่งกันและกัน</p>
          <p>✅ ห้ามโพสต์ข้อมูลส่วนตัว</p>
          <p>✅ ห้ามโฆษณาสินค้าหรือบริการ</p>
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
