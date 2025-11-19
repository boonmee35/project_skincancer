import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";

function RegisterForm() {
  const { redirectInfo } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    birthdate: "",
    sex: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
      });
      return;
    }

    const maleImage =
      "https://th.bing.com/th/id/OIG3.Tqppk2m07aAJKCGCEy9j?pid=ImgGn";
    const femaleImage =
      "https://th.bing.com/th/id/OIG1.SnKHoowaI_EmJElcwbLW?pid=ImgGn";

    const payload = {
      ...formData,
      avatar: formData.sex === "M" ? maleImage : femaleImage,
    };

    try {
      const response = await axios.post(apiUrl + "register", payload);

      if (response.data.message) {

        Swal.fire({
          icon: "success",
          title: "ลงทะเบียนสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        
        setFormData({
          fullname: "",
          birthdate: "",
          sex: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ลงทะเบียนล้มเหลว",
          text: response.data.error || "เกิดข้อผิดพลาดในการลงทะเบียน",
        });

      }
    } catch (error) {
      if (error.response) {
        console.log("API Error:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "ลงทะเบียนล้มเหลว",
          text: error.response.data.error || "เกิดข้อผิดพลาดในการลงทะเบียน",
        });

      } else {
        console.log("Server not responding");
        Swal.fire({
          icon: "error",
          title: "ลงทะเบียนล้มเหลว",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        });

      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">ชื่อผู้ใช้</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="กรอกชื่อผู้ใช้"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            วันเดือนปีเกิด
          </label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">เพศ</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sex"
                value="M"
                checked={formData.sex === "M"}
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
                checked={formData.sex === "F"}
                onChange={handleChange}
                className="mr-2"
              />
              หญิง
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">อีเมล</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="กรอกอีเมล"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">รหัสผ่าน</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              className="w-full focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 text-sm text-teal-600"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            ยืนยันรหัสผ่าน
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-teal-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              className="w-full focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="ml-2 text-sm text-teal-600"
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-700 text-white rounded-full py-2 text-sm hover:bg-teal-800"
        >
          ลงทะเบียน
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
