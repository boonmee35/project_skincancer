import React from "react";
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
} from "recharts";

const pieData = [
  { name: "ความเสี่ยงต่ำ", value: 50 },
  { name: "ความเสี่ยงปานกลาง", value: 25 },
  { name: "ความเสี่ยงสูง", value: 25 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const barData = [
  {
    name: "BCC",
    ต่ำ: 10,
    ปานกลาง: 5,
    สูง: 2,
  },
  {
    name: "SCC",
    ต่ำ: 12,
    ปานกลาง: 8,
    สูง: 3,
  },
  {
    name: "Melanoma",
    ต่ำ: 9,
    ปานกลาง: 4,
    สูง: 1,
  },
];

function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">หน้าหลัก</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="ผู้ใช้ทั้งหมด" value="521" icon="👥" />
        <StatCard title="รูปภาพทั้งหมด" value="874" icon="🖼️" />
        <StatCard title="จำนวนการวิเคราะห์" value="874" icon="📊" />
        <StatCard title="บทความ" value="47" icon="📰" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">ระดับความเสี่ยง</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">การกระจายความเสี่ยงมะเร็งผิวหนัง</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ต่ำ" stackId="a" fill="#22c55e" />
              <Bar dataKey="ปานกลาง" stackId="a" fill="#facc15" />
              <Bar dataKey="สูง" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">รายการวิเคราะห์ล่าสุด</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">รหัสผู้ใช้</th>
              <th className="p-2 text-left">วันที่อัพโหลด</th>
              <th className="p-2 text-left">BCC</th>
              <th className="p-2 text-left">SCC</th>
              <th className="p-2 text-left">Melanoma</th>
            </tr>
          </thead>
          <tbody>
            <TableRow id="#12345" date="15 ม.ค. 2025" bcc="ปานกลาง" scc="ต่ำ" mela="ต่ำ" />
            <TableRow id="#12346" date="15 ม.ค. 2025" bcc="ต่ำ" scc="ปานกลาง" mela="สูง" />
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);

const TableRow = ({ id, date, bcc, scc, mela }) => (
  <tr className="border-t">
    <td className="p-2">{id}</td>
    <td className="p-2">{date}</td>
    <td className="p-2">{renderTag(bcc)}</td>
    <td className="p-2">{renderTag(scc)}</td>
    <td className="p-2">{renderTag(mela)}</td>
  </tr>
);

const renderTag = (risk) => {
  const map = {
    'ต่ำ': 'bg-green-100 text-green-700',
    'ปานกลาง': 'bg-yellow-100 text-yellow-700',
    'สูง': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[risk]}`}>เสี่ยง{risk}</span>
  );
};

export default Home;
