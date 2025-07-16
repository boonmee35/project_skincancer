import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaCheckCircle, FaSpinner } from "react-icons/fa";

function ForgotPass() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("กรุณากรอกอีเมลที่ถูกต้อง");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(apiUrl + "verify_email", { email });
      setStep(res.data.step);
      toast.success("ยืนยันอีเมลสำเร็จ");
    } catch (err) {
      toast.error(err.response?.data?.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(apiUrl + "reset_password", {
        email,
        newPassword,
      });
      setStep(res.data.step);
      toast.success(res.data.message, { autoClose: 1000 });
    } catch (err) {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-white shadow-md w-full px-4 py-3 flex items-center">
        <Link to="/" className="text-xl font-semibold text-teal-900 flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          SkinCancerTrend
        </Link>
      </nav>

      {/* Main */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-50 to-teal-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-500">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            รีเซ็ตรหัสผ่าน
          </h2>

          {/* Progress */}
          <div className="flex justify-between mb-6 text-sm font-medium">
            <div className={`flex-1 text-center ${step >= 1 ? "text-yellow-500" : "text-gray-400"}`}>กรอกอีเมล</div>
            <div className={`flex-1 text-center ${step >= 2 ? "text-yellow-500" : "text-gray-400"}`}>ตั้งรหัสใหม่</div>
            <div className={`flex-1 text-center ${step >= 3 ? "text-yellow-500" : "text-gray-400"}`}>สำเร็จ</div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">อีเมล</label>
                <div className="flex items-center border rounded-md px-3">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full py-2 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition flex items-center justify-center"
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : "ยืนยัน"}
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">รหัสผ่านใหม่</label>
                <div className="flex items-center border rounded-md px-3">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="กรอกรหัสผ่านใหม่"
                    className="w-full py-2 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : "รีเซ็ตรหัสผ่าน"}
              </button>
            </form>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="text-center mt-6 animate-fadeIn">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                รีเซ็ตรหัสผ่านเรียบร้อยแล้ว
              </h3>
              <p className="text-gray-600 mb-4">คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที</p>
              <Link
                to="/login"
                className="inline-block bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
              >
                กลับไปที่หน้าเข้าสู่ระบบ
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPass;
