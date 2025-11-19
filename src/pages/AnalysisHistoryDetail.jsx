import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import StickyNavbar from "../components/Navbar";
import axios from "axios";
import { FaCircleInfo, FaX } from "react-icons/fa6";

function AnalysisHistoryDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [article, setArticle] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

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

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`${apiUrl}risk-recommendations`);
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const fetchProtectiveArticle = async (type) => {
    try {
      const res = await axios.get(`${apiUrl}article/protective/${type}`);
      return res.data.article_id;
    } catch (err) {
      console.error("ไม่พบบทความสำหรับ", type, err);
      return null;
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (!state) {
    return (
      <div className="text-center mt-20 text-red-500">
        ไม่มีข้อมูลการวิเคราะห์ <br />
        <button
          onClick={() => navigate("/history")}
          className="mt-4 text-blue-500 underline"
        >
          กลับหน้าก่อนหน้า
        </button>
      </div>
    );
  }

  const resultArray = [
    { name: "nv", prob: state.risk_nv, level: state.level_nv },
    { name: "bcc", prob: state.risk_bcc, level: state.level_bcc },
    { name: "scc", prob: state.risk_scc, level: state.level_scc },
    { name: "mel", prob: state.risk_melanoma, level: state.level_melanoma },
  ]
    .filter((item) => item.prob >= 0.5)
    .sort((a, b) => b.prob - a.prob)
    .map((item) => ({
      ...item,
      color: getBarColor(item.prob),
    }));

  function getBarColor(prob) {
    if (prob >= 0.8) return "bg-red-500";
    if (prob >= 0.65) return "bg-yellow-400";
    return "bg-green-500";
  }

  const labelMap = {
    nv: "ไฝ",
    bcc: "มะเร็งผิวหนังชนิดบาซัลเซลล์",
    scc: "มะเร็งผิวหนังชนิดสแควมัสเซลล์",
    mel: "มะเร็งผิวหนังชนิดเมลาโนมา",
    unknown: "ไม่สามารถระบุได้",
  };

  const formatLabel = (label) => labelMap[label.toLowerCase()] || label;

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const cleanContent = article?.content
    ? article.content.replace(/<img[^>]*>/g, "")
    : "";

  return (
    <>
      <StickyNavbar />
      <div className="bg-[#E9FBFC] min-h-screen flex flex-col items-center px-6 py-16">
        <div className="flex flex-start w-full max-w-5xl mb-5">
          <h1 className="text-3xl font-bold text-teal-800">
            รายละเอียดการวิเคราะห์
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">
          {/* รูปภาพ */}
          <div className="bg-white rounded-xl p-4 shadow-md w-full lg:w-[360px] h-fit">
            <p className="text-gray-700 mb-1">การวิเคราะห์เสร็จสมบูรณ์</p>
            <p className="text-sm text-gray-500 mb-4">
              วันที่: {state.created_at} น.
            </p>
            <img
              src={state.image_url}
              alt="skin"
              className="rounded-lg w-full"
            />
          </div>

          {/* ผลการวิเคราะห์ */}
          <div className="flex flex-col gap-4 flex-1">
            {/* ความเสี่ยง */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="font-semibold mb-4 text-gray-700">
                การวิเคราะห์ความเสี่ยง
              </h3>

              {state.risk_nv < 0.5 &&
              state.risk_bcc < 0.5 &&
              state.risk_scc < 0.5 &&
              state.risk_melanoma < 0.5 ? (
                <p className="text-gray-500 italic">
                  ไม่ตรวจพบความเสี่ยงของการเป็นมะเร็งทั้ง 3 ชนิด
                </p>
              ) : (
                resultArray.map((item, idx) => (
                  <div key={idx} className="mb-4">
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
                          className="text-cyan-600 text-xs underline cursor-pointer hover:text-cyan-800 "
                        >
                          <FaCircleInfo size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
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
            <div className="flex justify-end mt-4">
              <Link to="/history">
                <button className="bg-white px-4 py-2 rounded hover:bg-gray-300 shadow-lg cursor-pointer">
                  ย้อนกลับ
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* พื้นหลังดำโปร่ง */}
          <div
            className="absolute inset-0 bg-black/60 transition-opacity"
            onClick={() => setOpenModal(false)}
          ></div>

          {/* กล่อง modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl z-10 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 flex justify-between items-center">
              <div className="flex items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedItem ? formatLabel(selectedItem.name) : "บทความ"}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="ปิด"
              >
                <FaX />
              </button>
            </div>

            {/* เนื้อหาบทความ */}
            <div className="flex-1 overflow-y-auto">
              {article ? (
                <div className="p-6">
                  {/* Article Content */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6">
                      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
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
                          dangerouslySetInnerHTML={{
                            __html: cleanContent,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic text-center">
                  กำลังโหลดบทความ...
                </p>
              )}
            </div>

            {article && (
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-end items-center">
                <button
                  onClick={async () => {
                    let type = selectedItem.name.toLowerCase();

                    if (type === "mel") {
                      navigate(`/articles?cancer_types=melanoma`);
                    } else if (type === "nv") {
                      navigate(`/articles`);
                    } else {
                      navigate(
                        `/articles?cancer_types=${encodeURIComponent(type)}`
                      );
                    }
                  }}
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
}

export default AnalysisHistoryDetail;
