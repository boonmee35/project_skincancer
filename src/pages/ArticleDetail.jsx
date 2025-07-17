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
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const response = await axios.get(`${apiUrl}article/${id}/related`);
      setRelatedArticles(response.data);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const handleViewClick = async (id) => {
    try {
      await axios.put(`${apiUrl}article/view/${id}`);
    } catch (error) {
      console.error("ไม่สามารถอัปเดตจำนวนผู้ชม:", error);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchRelatedArticles();
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

        {/* 🔹 Related Articles */}
        {relatedArticles.length > 0 && (
            <div className="max-w-6xl mx-auto mt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">บทความที่เกี่ยวข้อง</h3>
                <Link to="/articles" className="text-teal-600 hover:underline">
                  ดูทั้งหมด
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <FiCalendar />
                          {formatDate(item.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye />
                          {item.view_count}
                        </div>
                      </div>
                      <Link
                        to={`/articles/${item.article_id}`}
                        onClick={() => handleViewClick(item.article_id)}
                      >
                        <button className="bg-teal-600 hover:bg-teal-700 text-white py-1.5 px-4 rounded-md">
                          อ่านเพิ่มเติม
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetail;
