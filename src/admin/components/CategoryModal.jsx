import React, { useEffect, useState } from "react";

export default function CategoryModal({ 
  mode = "add", 
  category = null, 
  onClose, 
  onSubmit 
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (mode === "edit" && category) {
      setName(category.category_name || "");
    } else {
      setName("");
    }
  }, [mode, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#191919]/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "เพิ่มหมวดหมู่ใหม่" : "แก้ไขหมวดหมู่"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อหมวดหมู่"
            className="w-full border p-2 rounded mb-4"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${mode === "add" ? "bg-teal-700 hover:bg-teal-800" : "bg-yellow-500 hover:bg-yellow-600"}`}
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
