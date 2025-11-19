import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Pagination from "../components/Pagination";

function Analysis() {
  const [analysisData, setAnalysisData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchRisk, setSearchRisk] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get(`${apiUrl}analysis-results`);
        setAnalysisData(response.data);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    fetchAnalysisData();
  }, []);

  // ฟังก์ชันช่วยใส่ class สีตามระดับความเสี่ยง
  const getRiskBadge = (risk) => {
    const riskClass =
      risk >= 0.8
        ? "bg-red-100 text-red-600"
        : risk >= 0.65
        ? "bg-yellow-100 text-yellow-700"
        : risk >= 0.5
        ? "bg-green-100 text-green-600"
        : "bg-gray-100 text-gray-600";

    return (
      <span className={`px-2 py-1 rounded-full text-sm ${riskClass}`}>
        {/* {risk} */}
        {Math.round(parseFloat(risk) * 100)}%
      </span>
    );
  };

  const formatInputDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const filteredData = analysisData.filter((item) => {
    const itemDate = item.created_at.split(" ")[0];

    const formattedstartDate = formatInputDate(startDate);
    const formattedendDate = formatInputDate(endDate);

    const matchStart = startDate ? itemDate >= formattedstartDate : true;
    const matchEnd = endDate ? itemDate <= formattedendDate : true;

    const matchRiskType =
      searchType && searchRisk ? item[searchType] === searchRisk : true;

    const matchName = searchTerm
      ? item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchStart && matchEnd && matchRiskType && matchName;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          รายงานการวิเคราะห์
        </h1>

        {/* ฟิลเตอร์ */}
        <div className="flex flex-wrap items-end gap-4 mb-6">
  {/* Search */}
  <div className="relative">
    <input
      type="text"
      placeholder="ค้นหา..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border rounded-md pl-10 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
    <FaSearch className="absolute top-3 left-3 text-gray-500" />
  </div>

  {/* Date from */}
  <div className="flex flex-col text-sm">
    <label htmlFor="dateFrom" className="mb-1 text-gray-600">
      วันที่เริ่มต้น
    </label>
    <input
      id="dateFrom"
      type="date"
      value={startDate}
      onChange={(e) => {
        setStartDate(e.target.value);
        setCurrentPage(1);
      }}
      className="border rounded-md p-2 w-48"
    />
  </div>

  {/* Date to */}
  <div className="flex flex-col text-sm">
    <label htmlFor="dateTo" className="mb-1 text-gray-600">
      วันที่สิ้นสุด
    </label>
    <input
      id="dateTo"
      type="date"
      value={endDate}
      onChange={(e) => {
        setEndDate(e.target.value);
        setCurrentPage(1);
      }}
      className="border rounded-md p-2 w-48"
    />
  </div>
</div>


          
          {/* <select
            className="border rounded-md p-2 w-48"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="">ประเภทมะเร็งผิวหนัง</option>
            <option value="level_nv">ไฝ</option>
            <option value="level_bcc">มะเร็งผิวหนังชนิดบาซัลเซลล์</option>
            <option value="level_scc">มะเร็งผิวหนังชนิดสแควมัสเซลล์</option>
            <option value="level_melanoma">มะเร็งผิวหนังชนิดเมลาโนมา</option>
          </select>
          <select
            className="border rounded-md p-2 w-48"
            value={searchRisk}
            onChange={(e) => setSearchRisk(e.target.value)}
          >
            <option value="">ระดับความเสี่ยง</option>
            <option value="ความเสี่ยงต่ำ">ความเสี่ยงต่ำ</option>
            <option value="ความเสี่ยงปานกลาง">ความเสี่ยงปานกลาง</option>
            <option value="ความเสี่ยงสูง">ความเสี่ยงสูง</option>
          </select> */}

        {/* ตาราง */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm border-b">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">วันที่วิเคราะห์</th>
                <th className="p-3 text-left">ชื่อผู้ใช้</th>
                <th className="p-3 text-left">ไฝ</th>
                <th className="p-3 text-left">มะเร็งผิวหนังชนิดบาซัลเซลล์</th>
                <th className="p-3 text-left">มะเร็งผิวหนังชนิดสแควมัสเซลล์</th>
                <th className="p-3 text-left">มะเร็งผิวหนังชนิดเมลาโนมา</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    ไม่พบข้อมูลการวิเคราะห์
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-3">{item.created_at}</td>
                    <td className="p-3">{item.fullname}</td>
                    <td className="p-3 text-center">
                      {getRiskBadge(item.risk_nv)}
                    </td>
                    <td className="p-3 text-center">
                      {getRiskBadge(item.risk_bcc)}
                    </td>
                    <td className="p-3 text-center">
                      {getRiskBadge(item.risk_scc)}
                    </td>
                    <td className="p-3 text-center">
                      {getRiskBadge(item.risk_melanoma)}
                    </td>
                  </tr>
                ))
              )}
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
    </div>
  );
}

export default Analysis;
