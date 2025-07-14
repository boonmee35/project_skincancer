import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function ForgotPass() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(apiUrl + "verify_email", { email });
      setStep(res.data.step);
    } catch (err) {
      toast.error(err.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(apiUrl + "reset_password", {
        email,
        newPassword,
      });
      setStep(res.data.step);
      toast.success(res.data.message, { autoClose: 800 });
    } catch (err) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          รีเซ็ตรหัสผ่าน
        </h2>

        {/* Steps */}
        <div className="flex justify-between mb-6 text-sm font-medium">
          <div className={`flex-1 text-center ${step >= 1 ? "text-yellow-500" : "text-gray-400"}`}>กรอกอีเมล</div>
          <div className={`flex-1 text-center ${step >= 2 ? "text-yellow-500" : "text-gray-400"}`}>ตั้งรหัสใหม่</div>
          <div className={`flex-1 text-center ${step >= 3 ? "text-yellow-500" : "text-gray-400"}`}>สำเร็จ</div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="กรอกอีเมล"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              ยืนยัน
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">รหัสผ่านใหม่</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านใหม่"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              รีเซ็ตรหัสผ่าน
            </button>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="text-center mt-6">
            <div className="text-green-500 text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              รีเซ็ตรหัสผ่านเรียบร้อยแล้ว
            </h3>
            <p className="text-gray-600 mb-4">
              คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที
            </p>
            <Link
              to="/login"
              className="inline-block bg-green-100 text-green-700 border border-green-400 px-6 py-2 rounded-md hover:bg-green-200 transition"
            >
              กลับไปที่หน้าเข้าสู่ระบบ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPass;
