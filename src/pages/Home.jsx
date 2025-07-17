import React, { useState, useEffect } from "react";
import StickyNavbar from "../components/Navbar";
import { FiCalendar, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [mostArticles, setMostArticles] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMostViewedArticles = async () => {
    try {
      const response = await axios.get(
        apiUrl + "article/most-viewed"
      );
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
  }

  const handleViewClick = async (id) => {
  try {
    await axios.put(`${apiUrl}article/view/${id}`);
  } catch (error) {
    console.error("ไม่สามารถอัปเดตจำนวนผู้ชม:", error);
  }
};

  return (
    <div>
      <StickyNavbar />
      <div className="bg-[#E6FAFB] text-gray-800">
        {/* Header */}
        <section className="text-center py-12 px-4">
          <h1 className="text-4xl font-bold text-gray-900">ปกป้องผิวของคุณ</h1>
          <h2 className="text-2xl text-teal-600 font-semibold mt-2">
            ปกป้องชีวิตของคุณ
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            อัพโหลดรูปภาพและรับการวิเคราะห์ความเสี่ยงมะเร็งผิวหนังในทันที
            ด้วยเทคโนโลยี AI ที่แม่นยำ
          </p>
        </section>

        {/* Cancer Info */}
        <section className="py-10 px-4 max-w-6xl mx-auto">
          <h3 className="text-xl text-center mb-6">
            ข้อมูลเกี่ยวกับมะเร็งผิวหนัง
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Basal Cell Carcinoma",
                desc: "มะเร็งชนิดนี้เติบโตช้าและพบน้อยที่สุด มักพบที่บริเวณที่โดนแดดบ่อย",
              },
              {
                title: "Squamous Cell Carcinoma",
                desc: "มะเร็งที่พบบ่อยในบริเวณผิวหนังที่โดนแดด อาจลุกลามและกระจายได้",
              },
              {
                title: "Melanoma",
                desc: "มะเร็งร้ายแรงที่สุดของผิวหนัง มักมีการเปลี่ยนแปลงของไฝหรือจุดด่างดำ",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-bold text-teal-600 mb-2">
                  {item.title}
                </h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Section */}
        <section className="py-12 bg-white px-4 flex flex-col-reverse lg:flex-row items-center max-w-6xl mx-auto">
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <h3 className="text-xl font-bold mb-4">
              เข้าร่วมชุมชนของเราวันนี้!
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>อัปโหลดวิเคราะห์และบันทึกผลการวิเคราะห์ของคุณ</li>
              <li>รับคำแนะนำเฉพาะบุคคล</li>
              <li>มีส่วนร่วมในชุมชนเพื่อแบ่งปันประสบการณ์</li>
            </ul>
            <button className="mt-6 bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition">
              ลงทะเบียนตอนนี้
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/fffd9126-dda4-430c-a18d-fb33c6493c57/de210368-9622-4654-b8c7-a7f24673cb00.png"
              alt="Doctor checking skin"
              className="w-64 h-auto"
            />
          </div>
        </section>

        {/* Popular Articles */}
        <section className="bg-[#E6FAFB] py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">บทความยอดนิยม</h3>
              <Link to="/articles" className="text-teal-600 hover:underline">
                ดูทั้งหมด
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mostArticles.map((item, index) => (
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
                    <Link to={`/articles/${item.article_id}`} onClick={() => handleViewClick(item.article_id)}>
                      <button className="bg-teal-600 hover:bg-teal-700 text-white py-1.5 px-4 rounded-md">
                        อ่านเพิ่มเติม
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 px-4">
          <h3 className="text-lg font-semibold mb-4">
            เริ่มต้นการดูแลสุขภาพผิวของคุณ
          </h3>
          <p className="mb-6 text-gray-600">
            ด้วยการตรวจสอบความผิดปกติทางผิวหนัง
          </p>
          <button className="bg-teal-700 text-white px-8 py-3 rounded-lg hover:bg-teal-800 transition">
            อัปโหลดภาพตอนนี้
          </button>
        </section>
      </div>
    </div>
  );
}

export default Home;
