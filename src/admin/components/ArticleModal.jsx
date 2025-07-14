import React, { useState, useEffect } from "react";
import CKEditorField from "./CKEditorField";
import axios from "axios";

export default function ArticleModal({
  mode = "add",
  article = null,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    source: "",
    image_url: "",
    category_id: "",
  });

  useEffect(() => {
    if (mode === "edit" && article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        source: article.source || "",
        image_url: article.image_url || "",
        category_id: article.category_id || "",
      });
    } else if (mode === "add") {
      setFormData({
        title: "",
        content: "",
        source: "",
        image_url: "",
        category_id: "",
      });
    }
  }, [mode, article]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", formData.title);
  data.append("content", formData.content);
  data.append("source", formData.source);
  data.append("category_id", formData.category_id);
  if (imageFile) {
    data.append("image", imageFile); 
  }

  onSubmit(data);
};

  const [category, setCategory] = useState([]);
  const [imageFile, setImageFile] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl + "categories");
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="fixed inset-0 bg-[#191919]/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "เพิ่มบทความ" : "แก้ไขบทความ"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="ชื่อบทความ"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <CKEditorField
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val })}
          />
          <input
            type="text"
            name="source"
            placeholder="แหล่งที่มา"
            value={formData.source}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            {category.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                mode === "add"
                  ? "bg-teal-700 hover:bg-teal-800"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
