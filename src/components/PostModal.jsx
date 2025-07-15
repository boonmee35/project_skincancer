import React, { useState, useEffect } from "react";

function PostModal({ isOpen, onClose, onSave, initialData }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  const user_id = userData?.id;

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content || "");
      setImage(null);
      setPreview(initialData.image_url || "");
    } else {
      setContent("");
      setImage(null);
      setPreview("");
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", user_id);
    if (image) {
      formData.append("image", image); 
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "แก้ไขโพสต์" : "สร้างโพสต์ใหม่"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เนื้อหาโพสต์
            </label>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เลือกรูปภาพ
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="preview"
                  className="h-40 rounded-md object-cover border"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-teal-700 text-white hover:bg-teal-800 text-sm"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModal;
