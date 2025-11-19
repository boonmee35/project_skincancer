import React, { useEffect, useState } from "react";
import StickyNavbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import ReportPosts from "./ReportPosts";
import ReportComments from "./ReportComments";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  const [data, setData] = useState({
    fullname: "",
    email: "",
    birthdate: "",
    sex: "",
    avatar: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const { user } = useAuth();
  const user_id = user?.id;
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}users/${user_id}`);
      const userData = response.data;

      if (userData.birthdate) {
        userData.birthdate = userData.birthdate.split("T")[0];
      }

      setData(userData);
      setImagePreview(userData.avatar);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchUserData();
    }
  }, [user_id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setData({ ...data, avatar: file });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("birthdate", data.birthdate);
      formData.append("sex", data.sex);
      if (data.avatar instanceof File) {
        formData.append("image", data.avatar);
      }

      await axios.put(`${apiUrl}users/${user_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("อัปเดตข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <div>
      <StickyNavbar />

      <div className="bg-[#E9FBFC] min-h-screen px-4 py-8 md:px-16">
        {/* Sub Navbar */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "profile"
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            แก้ไขข้อมูลส่วนตัว
          </button>
          <button
            onClick={() => setActiveTab("reportPosts")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "reportPosts"
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            ประวัติการรายงานโพสต์
          </button>
          <button
            onClick={() => setActiveTab("reportComments")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "reportComments"
                ? "bg-teal-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            ประวัติการรายงานความคิดเห็น
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl mb-6 text-gray-800 text-center">
              แก้ไขข้อมูลส่วนตัว
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-2 right-2 bg-teal-500 p-2 rounded-full text-white cursor-pointer hover:bg-teal-600"
                  >
                    <FaCamera />
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  เปลี่ยนรูปภาพโปรไฟล์
                </p>
              </div>

              {/* Fullname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อ - นามสกุล
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={data.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Birthdate */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  วันเดือนปีเกิด
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={data.birthdate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">เพศ</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="M"
                      checked={data.sex === "M"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    ชาย
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="F"
                      checked={data.sex === "F"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    หญิง
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 cursor-pointer"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "reportPosts" && (
          <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <ReportPosts />
          </div>
        )}

        {activeTab === "reportComments" && (
          <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <ReportComments />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
