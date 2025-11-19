import React, { useState, useEffect } from "react";
import CKEditorField from "./CKEditorField";
import TinyMCEEditor from "./TinyMCEEditor";
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
    sources: [""],
    image_url: "",
    category_id: "",
    cancer_types: [], 
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [categories, setCategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // ประเภทมะเร็งที่ให้เลือก
  const cancerOptions = [
    { value: "melanoma", label: "มะเร็งผิวหนังชนิดเมลาโนมา" },
    { value: "bcc", label: "มะเร็งผิวหนังชนิดบาซัลเซลล์ (BCC)" },
    { value: "scc", label: "มะเร็งผิวหนังชนิดสแควมัสเซลล์ (SCC)" },
  ];

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
        sources: Array.isArray(article.source)
          ? article.source
          : article.source
          ? article.source.split("\n")
          : [""],
        image_url: article.image_url || "",
        category_id: article.category_id || "",
        cancer_types: article.cancer_types || [], 
      });
      setPreview(article.image_url || "");
      setImageFile(null);
    } else {
      setFormData({
        title: "",
        content: "",
        sources: [""],
        image_url: "",
        category_id: "",
        cancer_types: [],
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

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      if (prev.cancer_types.includes(value)) {
        // ถ้าเลือกแล้ว → เอาออก
        return {
          ...prev,
          cancer_types: prev.cancer_types.filter((v) => v !== value),
        };
      } else {
        // ถ้ายังไม่ได้เลือก → เพิ่มเข้าไป
        return { ...prev, cancer_types: [...prev.cancer_types, value] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("source", formData.sources.join("\n"));
    data.append("category_id", formData.category_id);
    data.append("cancer_types", JSON.stringify(formData.cancer_types));
    if (imageFile) {
      data.append("image", imageFile);
    }
    onSubmit(data);
    onClose();
  };

  const handleSourceChange = (index, value) => {
    const updatedSources = [...formData.sources];
    updatedSources[index] = value;
    setFormData({ ...formData, sources: updatedSources });
  };

  const addSource = () => {
    setFormData({ ...formData, sources: [...formData.sources, ""] });
  };

  const removeSource = (index) => {
    const updatedSources = formData.sources.filter((_, i) => i !== index);
    setFormData({ ...formData, sources: updatedSources });
  };

  return (
    <div className="fixed inset-0 bg-[#191919]/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {mode === "add" ? "เพิ่มบทความ" : "แก้ไขบทความ"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* หมวดหมู่ */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              หมวดหมู่บทความ
            </label>
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

          {/* ประเภทมะเร็งผิวหนัง */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              มะเร็งผิวหนังประเภทที่เกี่ยวข้อง
            </label>
            <div className="flex flex-col gap-2">
              {cancerOptions.map((opt) => (
                <label key={opt.value} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={formData.cancer_types.includes(opt.value)}
                    onChange={() => handleCheckboxChange(opt.value)}
                    className="w-4 h-4"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ชื่อบทความ */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ชื่อบทความ
            </label>
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
            <label className="block text-sm text-gray-600 mb-1">
              เนื้อหาบทความ
            </label>
            <TinyMCEEditor
              type="article"
              value={formData.content}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, content: val }))
              }
            />
          </div>

          {/* แหล่งที่มา */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              แหล่งที่มา
            </label>
            {formData.sources.map((src, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`แหล่งที่มา ${index + 1}`}
                  value={src}
                  onChange={(e) => handleSourceChange(index, e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeSource(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ลบ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSource}
              className="text-blue-500 mt-2 hover:text-blue-700"
            >
              + เพิ่มแหล่งที่มา
            </button>
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
