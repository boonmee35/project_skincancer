import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ReportForm({ type = "post", targetId, onClose }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const user_id = user?.id;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุเหตุผลในการรายงาน",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setLoading(true);

    try {
      let url = "";
      let payload = {};

      if (type === "post"){
        url = `${apiUrl}forum/posts/${targetId}/report`;
        payload = { user_id: user_id, reason };
      }else if (type === "comment") {
        url = `${apiUrl}forum/posts/comments/report/${targetId}`;
        payload = { user_id: user_id, comment_id: targetId, reason };
      } else {
        Swal.fire({
          icon: "error",
          title: "ประเภทการรายงานไม่ถูกต้อง",
          showConfirmButton: false,
          timer: 1500,
        });

        setLoading(false);
        return;
      }

      const res = await axios.post(url, payload);

      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
      setReason("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "คุณทำการรายงานแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
    
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-lg font-bold mb-2">
        รายงาน{type === "post" ? "โพสต์นี้" : "ความคิดเห็นนี้"}
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded-lg p-2 h-24 resize-none"
          placeholder="กรุณาเขียนเหตุผล..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "กำลังส่ง..." : "ส่งรายงาน"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}


export default ReportForm