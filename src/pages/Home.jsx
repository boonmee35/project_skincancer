import React, { useState, useEffect } from "react";
import StickyNavbar from "../components/Navbar";
import { FiCalendar, FiEye, FiUserPlus, FiCamera } from "react-icons/fi"; // เพิ่ม FiCamera สำหรับปุ่มอัปโหลด
import { Link } from "react-router-dom";
import axios from "axios";
import { FaX } from "react-icons/fa6";

function Home() {
  const [mostArticles, setMostArticles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [articleType, setArticleType] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMostViewedArticles = async () => {
    try {
      const response = await axios.get(apiUrl + "article/most-viewed");
      setMostArticles(response.data);
    } catch (error) {
      console.error("Error fetching most viewed articles:", error);
    }
  };

  useEffect(() => {
    fetchMostViewedArticles();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const handleViewClick = async (id) => {
    try {
      await axios.put(`${apiUrl}article/view/${id}`);
    } catch (error) {
      console.error("ไม่สามารถอัปเดตจำนวนผู้ชม:", error);
    }
  };

  const fetchArticle = async (type) => {
    try {
      const res = await axios.get(`${apiUrl}article/type/${type}`);
      setArticleType(res.data);

      if (res.data && res.data.article_id) {
        fetchRelatedArticles(res.data.article_id);
      }

      setOpenModal(true);
    } catch (err) {
      console.error("ไม่พบบทความสำหรับ", type, err);
    }
  };

  const fetchRelatedArticles = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}article/${id}/related`);
      setRelatedArticles(response.data);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const cleanContent = articleType?.content
    ? articleType.content.replace(/<img[^>]*>/g, "")
    : "";

  return (
    <div>
      <StickyNavbar />
      <div className="bg-[#E9FBFC] min-h-screen px-4 py-8 md:px-16">
        {/* Header - ปรับปรุงให้โดดเด่นและมี CTA ชัดเจนขึ้น */}
        <section className="text-center py-16 px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              ปกป้องผิวของคุณ
            </h1>
            <h2 className="text-3xl md:text-4xl text-teal-700 font-bold mt-3">
              ปกป้องชีวิตของคุณ
            </h2>
            <p className="mt-6 text-gray-700 max-w-2xl mx-auto text-lg">
              อัปโหลดรูปภาพและรับการวิเคราะห์ความเสี่ยงมะเร็งผิวหนังในทันที
              ด้วยเทคโนโลยี AI ที่แม่นยำและล้ำสมัย
            </p>
            {/* ปุ่ม CTA ในส่วน Header */}
            <Link to="/analysis">
              {" "}
              {/* สมมติมี route สำหรับหน้าอัปโหลด */}
              <button className="mt-8 bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-teal-700 hover:shadow-xl transition duration-300 flex items-center justify-center mx-auto gap-2 cursor-pointer">
                <FiCamera className="text-2xl" />
                เริ่มวิเคราะห์ผิวของคุณตอนนี้!
              </button>
            </Link>
          </div>
        </section>

        {/* Cancer Info - ปรับปรุงการ์ดและเพิ่มความน่าสนใจ */}
        <section className="py-14 px-4 max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">
            ข้อมูลเกี่ยวกับมะเร็งผิวหนัง
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                key: "bcc",
                title: "Basal Cell Carcinoma",
                desc: "มะเร็งชนิดนี้เติบโตช้าและพบน้อยที่สุด มักพบที่บริเวณที่โดนแดดบ่อย",
              },
              {
                key: "scc",
                title: "Squamous Cell Carcinoma",
                desc: "มะเร็งที่พบบ่อยในบริเวณผิวหนังที่โดนแดด อาจลุกลามและกระจายได้",
              },
              {
                key: "mel",
                title: "Melanoma",
                desc: "มะเร็งร้ายแรงที่สุดของผิวหนัง มักมีการเปลี่ยนแปลงของไฝหรือจุดด่างดำ",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => fetchArticle(item.key)}
                className="cursor-pointer bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h4 className="text-xl font-bold text-teal-700 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Image of skin cancer types icons */}

        {/* Join Section - ปรับปรุงการจัดวางและ CTA */}
        <section className="py-16 bg-white px-4 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto rounded-xl shadow-lg my-10">
          <div className="lg:w-1/2 flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
            <img
              src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/fffd9126-dda4-430c-a18d-fb33c6493c57/de210368-9622-4654-b8c7-a7f24673cb00.png" // พิจารณาเปลี่ยนภาพให้สื่อถึง "ชุมชน" หรือ "AI analysis" มากขึ้น
              alt="Doctor checking skin or AI analysis"
              className="w-full max-w-md h-auto rounded-lg shadow-md" // ปรับขนาดและเงาของภาพ
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left order-1 lg:order-2">
            <h3 className="text-3xl font-bold mb-5 text-gray-800">
              เข้าร่วมชุมชนของเราวันนี้!
            </h3>
            <ul className="list-none text-gray-700 space-y-4 text-lg">
              <li className="flex items-center lg:justify-start justify-center gap-2">
                <FiUserPlus className="text-teal-600 text-2xl" />
                อัปโหลด วิเคราะห์ และบันทึกผลการวิเคราะห์ของคุณ
              </li>
              <li className="flex items-center lg:justify-start justify-center gap-2">
                <FiUserPlus className="text-teal-600 text-2xl" />
                มีส่วนร่วมในชุมชนเพื่อแบ่งปันประสบการณ์และเรียนรู้
              </li>
            </ul>
            <button className="mt-10 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-800 transition duration-300 flex items-center justify-center mx-auto lg:mx-0 gap-2 cursor-pointer">
              <FiUserPlus className="text-2xl" />
              ลงทะเบียนเพื่อเริ่มต้น
            </button>
          </div>
        </section>
        {/* Image of people using a health app */}

        {/* Popular Articles - ปรับปรุงการ์ดบทความให้สวยงามขึ้น */}
        <section className="bg-[#E6FAFB] py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-bold text-gray-800">
                บทความยอดนิยม
              </h3>
              <Link
                to="/articles"
                className="text-teal-600 hover:underline text-lg font-semibold"
              >
                ดูบทความทั้งหมด &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mostArticles.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-52 object-cover object-center" // ปรับความสูงและ object-fit
                  />
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        {item.category_name}
                      </span>
                      {item.cancer_types.map((type) => (
                        <span
                          key={type}
                          className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 ml-2"
                        >
                          {type}
                        </span>
                      ))}
                      <h4 className="font-bold text-xl mb-3 text-gray-800">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="text-teal-600" />
                          {formatDate(item.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye className="text-teal-600" />
                          {item.view_count}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-auto">
                      <Link
                        to={`/articles/${item.article_id}`}
                        onClick={() => handleViewClick(item.article_id)}
                      >
                        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
                          อ่านเพิ่มเติม
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - ปรับให้กระตุ้นและชัดเจน */}
        <section className="text-center py-16 px-4 bg-gradient-to-br from-teal-500 to-teal-800 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            เริ่มต้นดูแลสุขภาพผิวของคุณตั้งแต่วันนี้!
          </h3>
          <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            ด้วยการตรวจสอบความผิดปกติทางผิวหนังเบื้องต้นด้วยเทคโนโลยี AI
            ที่คุณเข้าถึงได้ง่าย
          </p>
          <Link to="/analysis">
            {" "}
            {/* ลิงก์ไปยังหน้าอัปโหลด */}
            <button className="bg-white text-teal-700 px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-gray-100 hover:text-teal-800 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-3 cursor-pointer">
              <FiCamera className="text-2xl" />
              อัปโหลดภาพเพื่อวิเคราะห์เลย!
            </button>
          </Link>
        </section>
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
                    {/* {selectedItem ? formatLabel(selectedItem.name) : 'บทความ'} */}
                  </h2>
                  <p className="text-teal-100 text-sm mt-1">
                    รายละเอียดและเนื้อหา
                  </p>
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

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {articleType ? (
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

                  {relatedArticles && relatedArticles.length > 0 && (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        บทความที่เกี่ยวข้อง
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((item, idx) => (
          <Link
            key={idx}
            to={`/articles/${item.article_id}`}
            onClick={() => handleViewClick(item.article_id)}
            className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center gap-1">
                  <FiCalendar className="text-teal-600" />
                  {formatDate(item.created_at)}
                </div>
                <div className="flex items-center gap-1">
                  <FiEye className="text-teal-600" />
                  {item.view_count}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}

                </div>
              ) : (
                /* Loading State */
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      กำลังโหลดบทความ
                    </h3>
                    <p className="text-gray-500 max-w-sm">
                      กรุณารอสักครู่ ระบบกำลังดึงข้อมูลบทความมาแสดง
                    </p>
                  </div>
                  {/* Loading Progress Bar */}
                  <div className="w-64 bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                    <div className="bg-teal-600 h-2 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
