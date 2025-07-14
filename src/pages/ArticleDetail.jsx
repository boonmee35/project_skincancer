import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StickyNavbar from "../components/Navbar";
import { FiCalendar, FiEye, FiArrowLeft } from "react-icons/fi";
import axios from "axios";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchArticle = async () => {
  try {
    const response = await axios.get(`${apiUrl}article/${id}`);
    setArticle(response.data);

    // โหลดบทความอื่นทั้งหมด
    const relatedRes = await axios.get(`${apiUrl}article`);
    const allArticles = relatedRes.data;

    // เลือกบทความที่ไม่ใช่บทความปัจจุบัน และอาจกรองจาก category_id เดียวกัน
    const related = allArticles
      .filter(item => item.category_id === response.data.category_id && item.id !== parseInt(id)) // ไม่เอาตัวเอง
      .slice(0, 3); // แสดงแค่ 3 รายการ

    setRelatedArticles(related);
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  if (!article) return <div className="p-4">กำลังโหลด...</div>;

  return (
    <div>
      <StickyNavbar />
      <div className="bg-[#F9FCFD] min-h-screen px-4 py-8 md:px-20">

        {/* 🔹 Header Bar: Back + Breadcrumb */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800 text-sm mb-2 md:mb-0"
            >
              <FiArrowLeft className="mr-1" />
              กลับ
            </button>

            <div className="text-sm text-gray-500 ml-5">
              <Link to="/articles" className="text-teal-600 hover:underline">
                บทความ
              </Link>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-700">{article.title}</span>
            </div>
          </div>


        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">

          {/* 🔹 Image and Title */}
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 object-cover rounded"
          />
          <h2 className="text-2xl font-bold mt-4">{article.title}</h2>
          <div className="flex items-center gap-4 text-gray-500 text-sm my-2">
            <div className="flex items-center gap-1">
              <FiCalendar /> {formatDate(article.created_at)}
            </div>
            <div className="flex items-center gap-1">
              <FiEye /> {article.view_count}
            </div>
          </div>

          {/* 🔹 Article content */}
          <div
            className="text-gray-700 mt-4 leading-7"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </div>

      </div>

      {/* 🔹 Related Articles */}
        {relatedArticles.length > 0 && (
  <div className="max-w-3xl mx-auto mt-10">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">บทความที่เกี่ยวข้อง</h3>
    <div className="grid gap-4 md:grid-cols-2">
      {relatedArticles.map((item) => (
        <Link
          key={item.article_id}
          to={`/article/${item.article_id}`}
          className="block p-4 border border-gray-200 rounded-lg hover:shadow"
        >
          <div className="font-medium text-lg text-teal-700">{item.title}</div>
          <div className="text-sm text-gray-500 mt-1">{formatDate(item.created_at)}</div>
        </Link>
      ))}
    </div>
  </div>
)}

    </div>
  );
}

export default ArticleDetail;
