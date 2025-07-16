import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiUrl + "login", {
        email,
        password,
      });

      if (response.data) {
  login(response.data.token, response.data.user);
  toast.success("เข้าสู่ระบบสำเร็จ");

  setTimeout(() => {
    if (response.data.user.role === "user") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  }, 1500);
      } else {
        toast.error(`เข้าสู่ระบบล้มเหลว: ${response.data.error}`);
      }
    } catch (error) {
      if (error.response) {
        console.log("API Error:", error.response.data);
        toast.error(
          `เข้าสู่ระบบล้มเหลว: ${error.response.data.error || "เกิดข้อผิดพลาด"}`
        );
      } else {
        console.log("Server not responding");
        toast.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">อีเมล</label>
          <input
            type="email"
            placeholder="กรอกอีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">รหัสผ่าน</label>
          <input
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-700 text-white rounded-full py-2 text-sm hover:bg-teal-800"
        >
          เข้าสู่ระบบ
        </button>

        <div className="text-center mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-teal-700 cursor-pointer hover:underline"
          >
            ลืมรหัสผ่าน ?
          </Link>
        </div>
      </form>

    </>
  );
}

export default LoginForm;
