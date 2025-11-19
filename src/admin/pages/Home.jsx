import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaPen,
  FaBook,
  FaUserGroup,
  FaFileLines,
  FaFilter,
} from "react-icons/fa6";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function Home() {
  const [summary, setSummary] = useState({});
  const [riskData, setRiskData] = useState([]);
  const [latestAnalyses, setLatestAnalyses] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [shortcut, setShortcut] = useState("7d");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [summaryRes, latestRes] = await Promise.all([
          axios.get(`${apiUrl}summary`),
          axios.get(`${apiUrl}latest-analyses`),
        ]);

        setSummary(summaryRes.data);
        setLatestAnalyses(latestRes.data);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล", err);
      }
    };

    fetchStats();
  }, []);

  // ตั้งค่า default 7 วันล่าสุด
  useEffect(() => {
    applyShortcut("7d");
  }, []);

  const fetchData = async () => {
    if (!dateFrom || !dateTo) return;
    try {
      const res = await axios.get(`${apiUrl}analysis-count`, {
        params: { dateFrom, dateTo },
      });
      setTrendData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRiskData = async () => {
    if (!dateFrom || !dateTo) return;
    try {
      const res = await axios.get(`${apiUrl}highrisk-count`, {
        params: { dateFrom, dateTo },
      });
      setRiskData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // โหลดข้อมูลทุกครั้งที่ dateFrom/dateTo เปลี่ยน
  useEffect(() => {
    fetchData();
    fetchRiskData();
  }, [dateFrom, dateTo]);

  // ฟังก์ชันตั้งค่า date range ตามปุ่มลัด
  const applyShortcut = (type) => {
    const today = new Date();
    let from = new Date();

    if (type === "7d") {
      from.setDate(today.getDate() - 6);
    } else if (type === "30d") {
      from.setDate(today.getDate() - 29);
    } else if (type === "year") {
      from = new Date(today.getFullYear(), 0, 1); // 1 ม.ค. ปีนี้
    } else if (type === "custom") {
      setShortcut("custom");
      return; // ไม่เปลี่ยนค่า date ถ้าเลือกกำหนดเอง
    }

    setDateFrom(from.toISOString().split("T")[0]);
    setDateTo(today.toISOString().split("T")[0]);
    setShortcut(type);
  };

  // ถ้าเปลี่ยนวันที่เอง → ถือว่าเป็น "กำหนดเอง"
  const handleDateChange = (setter) => (e) => {
    setter(e.target.value);
    setShortcut("custom");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">หน้าหลัก</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="ผู้ใช้ทั้งหมด"
            value={summary.users}
            icon={<FaUserGroup />}
          />
          <StatCard
            title="จำนวนการวิเคราะห์"
            value={summary.analyses}
            icon={<FaFileLines />}
          />
          <StatCard
            title="จำนวนโพสต์ทั้งหมด"
            value={summary.posts}
            icon={<FaPen />}
          />
          <StatCard
            title="จำนวนบทความ"
            value={summary.articles}
            icon={<FaBook />}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">
          {/* ตัวกรอง */}
          <div className="flex flex-wrap justify-center items-end gap-6 border-b pb-4">
            {/* Date from */}
            <div className="flex flex-col text-sm">
              <label htmlFor="dateFrom" className="mb-1 text-gray-600">
                วันที่เริ่มต้น
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={handleDateChange(setDateFrom)}
                className="border rounded-md px-2 py-1 text-sm"
              />
            </div>
            {/* Date to */}
            <div className="flex flex-col text-sm">
              <label htmlFor="dateTo" className="mb-1 text-gray-600">
                วันที่สิ้นสุด
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={handleDateChange(setDateTo)}
                className="border rounded-md px-2 py-1 text-sm"
              />
            </div>
            {/* Shortcut */}
            <div className="flex flex-col text-sm">
              <label htmlFor="shortcut" className="mb-1 text-gray-600">
                เลือกช่วงเวลา
              </label>
              <select
                id="shortcut"
                value={shortcut}
                onChange={(e) => applyShortcut(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value="7d">7 วันล่าสุด</option>
                <option value="30d">30 วันล่าสุด</option>
                <option value="year">ปีนี้</option>
                <option value="custom">กำหนดเอง</option>
              </select>
            </div>
          </div>

          {/* กราฟ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* High Risk */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-4">
                จำนวนการตรวจพบที่มีแนวโน้มสูง (มากกว่า 50%)
              </h2>

              {riskData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={riskData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-10">
                ไม่มีข้อมูลตามช่วงวันที่เลือก
              </p>
            )}
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <div><strong>NV</strong> = ไฝ</div>
              <div><strong>BCC</strong> = มะเร็งผิวหนังชนิดบาซัลเซลล์</div>
              <div><strong>SCC</strong> = มะเร็งผิวหนังชนิดสแควมัสเซลล์</div>
              <div><strong>MEL</strong> = มะเร็งผิวหนังชนิดเมลาโนมา</div>
            </div>
          </div>

            {/* Trend */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold mb-4">แนวโน้มการวิเคราะห์</h2>
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 py-10">
                  ไม่มีข้อมูลตามช่วงวันที่เลือก
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mt-4">
          <h2 className="font-semibold mb-4">รายการวิเคราะห์ล่าสุด</h2>
          <table className="w-full text-sm border-b">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="p-3 text-left">วันที่วิเคราะห์</th>
                <th className="p-3 text-left">ชื่อผู้ใช้</th>
                <th className="p-3 text-left">ไฝ</th>
                <th className="p-3 text-left">มะเร็งผิวหนังชนิดบาซัลเซลล์</th>
                <th className="p-3 text-left">มะเร็งผิวหนังชนิดสแควมัสเซลล์</th>
                <th className="p-3 text-left">มะเร็งผิวหนังชนิดเมลาโนมา</th>
              </tr>
            </thead>
            <tbody>
              {latestAnalyses.map((item, index) => (
                <tr className="border-t" key={index}>
                  <td className="p-2">{item.created_at}</td>
                  <td className="p-2">{item.fullname}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${renderTag(
                        item.risk_nv
                      )}`}
                    >
                      {Math.round(parseFloat(item.risk_nv) * 100)}%
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${renderTag(
                        item.risk_bcc
                      )}`}
                    >
                      {Math.round(parseFloat(item.risk_bcc) * 100)}%
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${renderTag(
                        item.risk_scc
                      )}`}
                    >
                      {Math.round(parseFloat(item.risk_scc) * 100)}%
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${renderTag(
                        item.risk_melanoma
                      )}`}
                    >
                      {Math.round(parseFloat(item.risk_melanoma) * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-lg font-bold">{value ?? 0}</div>
    </div>
  </div>
);

const renderTag = (risk) => {
  return risk >= 0.8
    ? "bg-red-100 text-red-600"
    : risk >= 0.65
    ? "bg-yellow-100 text-yellow-700"
    : risk >= 0.5
    ? "bg-green-100 text-green-600"
    : "bg-gray-100 text-gray-600";
};

export default Home;
