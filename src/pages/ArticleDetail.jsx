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
        <div className="flex items-center text-sm mb-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 text-sm mb-2 md:mb-0 cursor-pointer"
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

        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl">
          {/* 🔹 Image and Title */}
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full max-h-[400px] object-cover rounded-xl mb-8 shadow-md"
          />
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-2">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mt-2">
              <div className="flex items-center gap-1">
                <FiCalendar className="text-teal-600" />
                <span>{formatDate(article.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiEye className="text-teal-600" />
                <span>{article.view_count}</span>
              </div>
              <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                {article.category_name}
              </span>
              {article.cancer_types.map((type) => (
                <span
                  key={type}
                  className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* 🔹 Article content */}
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
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Source */}
          {article.source && (
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-lg text-gray-800 mb-3">
                แหล่งที่มา:
              </h4>
              <ul className="list-none pl-0 space-y-2">
                {article.source.split("\n").map((src, idx) => (
                  <li key={idx} className="text-sm">
                    <a
                      href={src.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all transition-colors"
                    >
                      {src.trim()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 🔹 Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 md:mt-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                บทความที่เกี่ยวข้อง
              </h3>
              <Link
                to={`/articles?cancer_types=${encodeURIComponent(
                  Array.isArray(article.cancer_types)
                    ? article.cancer_types[0]?.toLowerCase() || ""
                    : article.cancer_types?.toLowerCase?.() || ""
                )}`}
                className="text-teal-600 hover:underline font-semibold"
              >
                ดูทั้งหมด
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <Link
                  key={item.article_id}
                  to={`/articles/${item.article_id}`}
                  onClick={() => {
                    handleViewClick(item.article_id);
                  }}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition duration-300 transform"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
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
                      <h4 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <div className="flex items-center gap-1">
                          <FiCalendar />
                          {formatDate(item.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye />
                          {item.view_count}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetail;
