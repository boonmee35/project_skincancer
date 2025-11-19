import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import StickyNavbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaX, FaCircleInfo } from "react-icons/fa6";
import Swal from "sweetalert2";

const DiagnosisResult = () => {
  const { user, setRedirectInfo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState(location.state);
  const [recommendations, setRecommendations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [article, setArticle] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  // โหลด state จาก location หรือ sessionStorage
  useEffect(() => {
    if (location.state) {
      const newState = location.state.diagnosisState || location.state;
      setState(newState);
      sessionStorage.setItem("diagnosisState", JSON.stringify(newState));
      setRedirectInfo({ diagnosisState: newState });
    } else {
      const saved = sessionStorage.getItem("diagnosisState");
      if (saved) {
        setState(JSON.parse(saved));
      }
    }
  }, [location.state, setRedirectInfo]);

  // โหลด recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${apiUrl}risk-recommendations`);
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, []);

  const handleSaveResult = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเข้าสู่ระบบเพื่อบันทึกผลการวิเคราะห์",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "ไปที่หน้าเข้าสู่ระบบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          setRedirectInfo({ from: "/result", diagnosisState: state });
          navigate("/login");
        }
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("image", state.imageFile);
      formData.append("result", JSON.stringify(state.result));
      formData.append(
        "is_detected",
        state.predictedClass === "unknown" ? 0 : 1
      );

      await axios.post(`${apiUrl}analysis-results`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "บันทึกผลการวิเคราะห์สำเร็จ",
        text: "คุณสามารถดูผลการวิเคราะห์ได้ที่หน้าประวัติการวิเคราะห์",
        confirmButtonText: "ไปที่ประวัติการวิเคราะห์",
      }).then(() => navigate("/history"));
    } catch (error) {
      console.error("Error saving analysis result:", error);
      Swal.fire({
        icon: "error",
        title: "บันทึกผลการวิเคราะห์ล้มเหลว",
        text: error.response?.data?.error || "ไม่สามารถบันทึกผลการวิเคราะห์ได้",
      });
    }
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const fetchArticle = async (type) => {
    try {
      const res = await axios.get(`${apiUrl}article/type/${type}`);
      setArticle(res.data);
    } catch (err) {
      console.error("ไม่พบบทความสำหรับ", type, err);
    }
  };

  useEffect(() => {
    if (openModal && selectedItem) {
      fetchArticle(selectedItem.name.toLowerCase());
    }
  }, [openModal, selectedItem]);

  const handleReadMore = (type) => {
    setRedirectInfo({ from: "/result", diagnosisState: state });
    if (type === "mel") navigate(`/articles?cancer_types=melanoma`);
    else if (type === "nv") navigate(`/articles`);
    else navigate(`/articles?cancer_types=${encodeURIComponent(type)}`);
  };

  // Fallback UI ถ้า state ยังไม่มี
  if (!state) {
    return (
      <>
        <StickyNavbar />
        <div className="text-center mt-20 text-red-500">
          ไม่มีข้อมูลการวิเคราะห์ <br />
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-cyan-700 text-white rounded"
          >
            กลับไปหน้าวิเคราะห์
          </button>
        </div>
      </>
    );
  }

  // UI ปกติ
  const { result, predictedClass, confidence, imageUrl } = state;
  const today = new Date().toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const resultArray = Object.entries(result)
    .map(([name, prob]) => ({
      name,
      prob,
      level:
        prob < 0.001
          ? "ไม่มีความเสี่ยง"
          : prob <= 0.3
          ? "ความเสี่ยงต่ำ"
          : prob <= 0.6
          ? "ความเสี่ยงปานกลาง"
          : prob <= 0.8
          ? "ความเสี่ยงสูง"
          : "ความเสี่ยงสูงมาก",
      color:
        prob >= 0.8
          ? "bg-red-500"
          : prob >= 0.65
          ? "bg-yellow-400"
          : "bg-green-400",
    }))
    .filter((item) => item.prob >= 0.5)
    .sort((a, b) => b.prob - a.prob);

  const labelMap = {
    nv: "ไฝ",
    bcc: "มะเร็งผิวหนังชนิดบาซัลเซลล์",
    scc: "มะเร็งผิวหนังชนิดสแควมัสเซลล์",
    mel: "มะเร็งผิวหนังชนิดเมลาโนมา",
    unknown: "ไม่สามารถระบุได้",
  };
  const formatLabel = (label) => labelMap[label.toLowerCase()] || label;

  const cleanContent = article?.content
    ? article.content.replace(/<img[^>]*>/g, "")
    : "";

  return (
    <>
      <StickyNavbar />
      <div className="bg-[#E9FBFC] min-h-screen flex flex-col items-center px-6 py-16">
        <div className="flex flex-start w-full max-w-5xl mb-5">
          <h1 className="text-3xl font-bold text-teal-800 ">
            ผลการวิเคราะห์รูปภาพ
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">
          {/* รูปภาพ */}
          <div className="bg-white rounded-xl p-4 shadow-md w-full lg:w-[360px] h-fit">
            <p className="text-gray-700 mb-1">การวิเคราะห์เสร็จสมบูรณ์</p>
            <p className="text-sm text-gray-500 mb-4">วันที่: {today}</p>
            <img src={imageUrl} alt="Uploaded" className="rounded-lg w-full" />
          </div>

          {/* ผลการวิเคราะห์ */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="font-semibold mb-4 text-gray-700">
                การวิเคราะห์ความเสี่ยง
              </h3>
              {predictedClass === "unknown" || confidence < 0.5 ? (
                <p className="text-gray-500 italic">
                  ไม่ตรวจพบความเสี่ยงของการเป็นมะเร็งทั้ง 3 ชนิด
                </p>
              ) : predictedClass === "nv" ? (
                <div className="text-gray-500 italic space-y-1">
                  <p>พบว่าเป็นไฝธรรมดา</p>
                  <p>ไม่ตรวจพบความเสี่ยงของการเป็นมะเร็งทั้ง 3 ชนิด</p>
                </div>
              ) : (
                resultArray.map((item, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="capitalize font-medium text-gray-800">
                        {formatLabel(item.name)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="ml-2 text-sm text-gray-600">
                          มีแนวโน้ม {Math.round(item.prob * 100)}%
                        </span>
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="text-cyan-600 text-xs underline cursor-pointer hover:text-cyan-800"
                        >
                          <FaCircleInfo size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className={`h-2 rounded ${item.color}`}
                        style={{ width: `${item.prob * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ปุ่ม */}
            <div className="flex justify-between mt-4">
              <Link to="/analysis">
                <button className="bg-white px-4 py-2 rounded hover:bg-gray-300 shadow-lg cursor-pointer">
                  ย้อนกลับ
                </button>
              </Link>
              <button
                className="bg-teal-800 text-white px-4 py-2 rounded shadow-lg hover:bg-teal-900 cursor-pointer"
                onClick={handleSaveResult}
              >
                บันทึกผลการวิเคราะห์
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {predictedClass !== "unknown" && openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 transition-opacity"
            onClick={() => setOpenModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl z-10 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {selectedItem ? formatLabel(selectedItem.name) : "บทความ"}
              </h2>
              <button
                onClick={() => setOpenModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                <FaX />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <style>{`
                    .prose ul {
                      list-style-type: disc;
                      padding-left: 1.5rem;
                      margin: 1rem 0;
                    }
                    .prose ol {
                      list-style-type: decimal;
                      padding-left: 1.5rem;
                      margin: 1rem 0;
                    }
                    .prose li {
                      margin: 0.5rem 0;
                    }
                    .prose h1 {
                      font-size: 1.875rem;
                      font-weight: bold;
                      color: #1f2937;
                      margin: 2rem 0 1rem 0;
                      border-bottom: 2px solid #14b8a6;
                      padding-bottom: 0.5rem;
                    }
                    .prose h2 {
                      font-size: 1.5rem;
                      font-weight: 600;
                      color: #374151;
                      margin: 1.5rem 0 0.75rem 0;
                    }
                    .prose h3 {
                      font-size: 1.25rem;
                      font-weight: 600;
                      color: #4b5563;
                      margin: 1rem 0 0.5rem 0;
                    }
                    .prose p {
                      margin: 1rem 0;
                      line-height: 1.75;
                    }
                    .prose strong {
                      color: #1f2937;
                      font-weight: 600;
                    }
                    .prose blockquote {
                      border-left: 4px solid #14b8a6;
                      padding-left: 1rem;
                      margin: 1rem 0;
                      font-style: italic;
                      background: #f0fdfa;
                      padding: 1rem;
                      border-radius: 0.375rem;
                    }
                    .prose table {
                      width: 100%;
                      border-collapse: collapse;
                      margin: 1rem 0;
                    }
                    .prose th,
                    .prose td {
                      border: 1px solid #d1d5db;
                      padding: 0.5rem 1rem;
                      text-align: left;
                    }
                    .prose th {
                      background: #f9fafb;
                      font-weight: 600;
                    }
                  `}</style>
              <div
                dangerouslySetInnerHTML={{ __html: cleanContent }}
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              />
            </div>
            {article && (
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-end items-center">
                <button
                  onClick={() =>
                    handleReadMore(selectedItem.name.toLowerCase())
                  }
                  className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  อ่านบทความเพิ่มเติม
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DiagnosisResult;
