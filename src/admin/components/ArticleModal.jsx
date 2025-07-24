import React, { useState, useEffect } from "react";
import CKEditorField from "./CKEditorField";
import axios from "axios";

export default function ArticleModal({ mode = "add", article = null, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    source: "",
    image_url: "",
    category_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${apiUrl}categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Set initial data
  useEffect(() => {
    if (article && mode === "edit") {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        source: article.source || "",
        image_url: article.image_url || "",
        category_id: article.category_id || "",
      });
      setPreview(article.image_url || "");
      setImageFile(null);
    } else {
      setFormData({
        title: "",
        content: "",
        source: "",
        image_url: "",
        category_id: "",
      });
      setPreview("");
      setImageFile(null);
    }
  }, [article, mode]);

  // Image preview
  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (formData.image_url) {
      setPreview(formData.image_url);
    } else {
      setPreview("");
    }
  }, [imageFile, formData.image_url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    onClose();
  };

  console.log("Form Data:", formData);

  if (!mode) return null;

  return (
    <div className="fixed inset-0 bg-[#191919]/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {mode === "add" ? "เพิ่มบทความ" : "แก้ไขบทความ"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* หมวดหมู่ */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">หมวดหมู่บทความ</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* ชื่อบทความ */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">ชื่อบทความ</label>
            <input
              type="text"
              name="title"
              placeholder="ชื่อบทความ"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* เนื้อหา */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">เนื้อหาบทความ</label>
            <CKEditorField
              value={formData.content}
              onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
            />
          </div>

          {/* แหล่งที่มา */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">แหล่งที่มา</label>
            <input
              type="text"
              name="source"
              placeholder="แหล่งที่มา"
              value={formData.source}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* รูปภาพ */}
          <label className="block text-sm text-gray-600 mb-1">
              รูปภาพหน้าปกบทความ
            </label>
          <div className="border border-gray-300 rounded-lg p-3 text-center">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full rounded-md object-cover max-h-80"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setPreview("");
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full px-2 py-1 text-xs"
                >
                  ลบ
                </button>
              </div>
            ) : (
              <>
                <label className="block cursor-pointer text-teal-700 hover:underline">
                  + เพิ่มรูปภาพหน้าปกบทความ
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-400">รองรับไฟล์ .jpg, .png</p>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
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
              {mode === "add" ? "เพิ่มบทความ" : "บันทึกการแก้ไข"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
