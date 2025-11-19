import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import StickyNavbar from "../components/Navbar";
import Pagination from "../admin/components/Pagination";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const getBadgeColor = (risk) => {
  return risk >= 0.8
    ? "bg-red-100 text-red-600"
    : risk >= 0.65
    ? "bg-yellow-100 text-yellow-700"
    : risk >= 0.5
    ? "bg-green-100 text-green-600"
    : "bg-gray-100 text-gray-600";
};

const AnalysisHistory = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchRisk, setSearchRisk] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const user_id = user?.id;

  const fetchAnalysisHistory = async () => {
    try {
      const response = await axios.get(`${apiUrl}analysis-results/${user_id}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching analysis history:", error);
    }
  };

  useEffect(() => {
    fetchAnalysisHistory();
  }, []);

  const formatInputDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const filteredData = history.filter((item) => {
    const itemDate = item.created_at.split(" ")[0];

    const formattedstartDate = formatInputDate(startDate);
    const formattedendDate = formatInputDate(endDate);

    const matchStart = startDate ? itemDate >= formattedstartDate : true;
    const matchEnd = endDate ? itemDate <= formattedendDate : true;

    const matchRiskType =
      searchType && searchRisk ? item[searchType] === searchRisk : true;

    return matchStart && matchEnd && matchRiskType;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteAnalysis = async (resultId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบผลการวิเคราะห์นี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}analysis-results/${resultId}`);
          Swal.fire("ลบสำเร็จ!", "ลบผลการวิเคราะห์เรียบร้อยแล้ว", "success");
          fetchAnalysisHistory();
        } catch (error) {
          console.error("Error deleting analysis result:", error);
          Swal.fire("ผิดพลาด!", "ไม่สามารถลบผลการวิเคราะห์ได้", "error");
        }
      }
    });
  };

  return (
    <>
      <StickyNavbar />
      <div className="min-h-screen bg-[#d9f4f4] p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">
          ประวัติการวิเคราะห์
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 max-w-5xl mx-auto">
          {/* Start Date */}
          <div className="w-full md:w-1/4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              วันที่เริ่มต้น
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>

          {/* End Date */}
          <div className="w-full md:w-1/4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              วันที่สิ้นสุด
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          {/* <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/4 py-2 px-4 border border-gray-300 rounded-lg"
          >
            <option value="">ประเภทมะเร็งผิวหนัง</option>
            <option value="level_nv">ไฝ</option>
            <option value="level_bcc">มะเร็งผิวหนังชนิดบาซัลเซลล์</option>
            <option value="level_scc">มะเร็งผิวหนังชนิดสแควมัสเซลล์</option>
            <option value="level_melanoma">มะเร็งผิวหนังชนิดเมลาโนมา</option>
          </select>
          <select
            value={searchRisk}
            onChange={(e) => {
              setSearchRisk(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/4 py-2 px-4 border border-gray-300 rounded-lg"
          >
            <option value="">ระดับความเสี่ยง</option>
            <option value="ความเสี่ยงต่ำ">ความเสี่ยงต่ำ</option>
            <option value="ความเสี่ยงปานกลาง">ความเสี่ยงปานกลาง</option>
            <option value="ความเสี่ยงสูง">ความเสี่ยงสูง</option>
          </select> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full table-auto text-sm text-center">
            <thead className="bg-white border-b font-medium text-gray-600">
              <tr>
                <th className="py-3">วันที่อัปโหลด</th>
                <th>รูปภาพ</th>
                <th>ไฝ</th>
                <th>มะเร็งผิวหนังชนิดบาซัลเซลล์</th>
                <th>มะเร็งผิวหนังชนิดสแควมัสเซลล์</th>
                <th>มะเร็งผิวหนังชนิดเมลาโนมา</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{item.created_at} น.</td>
                  <td>
                    <img
                      src={item.image_url}
                      alt="skin"
                      className="m-2 w-20 h-20 rounded object-cover mx-auto"
                    />
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(
                        item.risk_nv
                      )}`}
                    >
                      {Math.round(item.risk_nv * 100)}%
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(
                        item.risk_bcc
                      )}`}
                    >
                      {Math.round(item.risk_bcc * 100)}%
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(
                        item.risk_scc
                      )}`}
                    >
                      {Math.round(item.risk_scc * 100)}%
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(
                        item.risk_melanoma
                      )}`}
                    >
                      {Math.round(item.risk_melanoma * 100)}%
                    </span>
                  </td>
                  <td className="flex justify-center items-center gap-2 py-8">
                    <button
                      className="text-teal-600 hover:text-teal-800 cursor-pointer"
                      onClick={() => {
                        navigate("/history/result", { state: item });
                      }}
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDeleteAnalysis(item.result_id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AnalysisHistory;
