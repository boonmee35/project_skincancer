import React,{useState} from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import StickyNavbar from '../components/Navbar'

const mockData = [
  {
    date: "20 ม.ค. 2025",
    image: "https://chgcancercenter.com/wp-content/uploads/2024/12/Spotting-Melanoma-Early_-The-ABCDE-Rule2-768x513.jpg",
    bcc: "เสี่ยงปานกลาง",
    scc: "เสี่ยงต่ำ",
    melanoma: "เสี่ยงต่ำ",
  },
  {
    date: "15 ม.ค. 2025",
    image: "https://hdmall.co.th/blog/wp-content/uploads/2024/02/%E0%B9%81%E0%B8%A2%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%AD%E0%B8%81-%E0%B8%A1%E0%B8%B0%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%87%E0%B9%84%E0%B8%9D-%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%9D%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%94%E0%B8%B2-%E0%B8%81%E0%B8%B3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%9C%E0%B8%B4%E0%B8%94%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%AD%E0%B8%B2%E0%B8%88%E0%B8%97%E0%B8%B3%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%A5%E0%B8%B8%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%A1.jpg",
    bcc: "เสี่ยงต่ำ",
    scc: "เสี่ยงสูง",
    melanoma: "เสี่ยงปานกลาง",
  },
  {
    date: "10 ม.ค. 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_ZjlP8iZEf4B_3UZtqYRZzK8m5iGlN5_jttH943azwKRwWTIGy64e3GSTqKEAarUnRs&usqp=CAU",
    bcc: "เสี่ยงปานกลาง",
    scc: "เสี่ยงต่ำ",
    melanoma: "เสี่ยงต่ำ",
  },
  {
    date: "5 ม.ค. 2025",
    image: "https://img.kapook.com/u/2020/patcharin/Health/skin/skin5.jpg",
    bcc: "เสี่ยงปานกลาง",
    scc: "เสี่ยงต่ำ",
    melanoma: "เสี่ยงปานกลาง",
  },
  {
    date: "5 ม.ค. 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzY4uEAakATtfSv10KMr0FEyKOV6KZKHoZJB0eEt7T1Fk8XhILeGZ1b0mJTF5XH7trACg&usqp=CAU",
    bcc: "เสี่ยงต่ำ",
    scc: "เสี่ยงสูง",
    melanoma: "เสี่ยงปานกลาง",
  },
  {
    date: "5 ม.ค. 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzY4uEAakATtfSv10KMr0FEyKOV6KZKHoZJB0eEt7T1Fk8XhILeGZ1b0mJTF5XH7trACg&usqp=CAU",
    bcc: "เสี่ยงต่ำ",
    scc: "เสี่ยงสูง",
    melanoma: "เสี่ยงปานกลาง",
  },
];

const getBadgeColor = (risk) => {
  switch (risk) {
    case "เสี่ยงต่ำ":
      return "bg-green-100 text-green-600";
    case "เสี่ยงปานกลาง":
      return "bg-yellow-100 text-yellow-700";
    case "เสี่ยงสูง":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const AnalysisHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <StickyNavbar />
      <div className="min-h-screen bg-[#d9f4f4] p-6">
        <h1 className="text-2xl font-bold text-[#066666] mb-4">ประวัติการวิเคราะห์</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="date"
            className="w-full md:w-1/4 py-2 px-4 border border-gray-300 rounded-lg"
            placeholder="วันที่"
          />
          <select className="w-full md:w-1/4 py-2 px-4 border border-gray-300 rounded-lg">
            <option>ประเภทมะเร็งผิวหนัง</option>
          </select>
          <select className=" w-full md:w-1/4 py-2 px-4 border border-gray-300 rounded-lg">
            <option>เลือกระดับความเสี่ยง</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full table-auto text-sm text-center">
            <thead className="bg-white border-b font-medium text-gray-600">
              <tr>
                <th className="py-3">วันที่อัปโหลด</th>
                <th>รูปภาพ</th>
                <th>BCC</th>
                <th>SCC</th>
                <th>Melanoma</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{item.date}</td>
                  <td>
                    <img
                      src={item.image}
                      alt="skin"
                      className="m-2 w-20 h-20 rounded object-cover mx-auto"
                    />
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(item.bcc)}`}>
                      {item.bcc}
                    </span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(item.scc)}`}>
                      {item.scc}
                    </span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(item.melanoma)}`}>
                      {item.melanoma}
                    </span>
                  </td>
                  <td className="flex justify-center items-center gap-2 py-8">
                    <button className="text-teal-600 hover:text-teal-800">
                      <FaEye size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 py-4">
            <button
              className="text-gray-500 hover:text-black"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="text-gray-500 hover:text-black"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisHistory;
