import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import TinyMCEEditor from "../admin/components/TinyMCEEditor";

function PostModal({ isOpen, onClose, onSave, initialData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const { user } = useAuth();
  const user_id = user?.id;
  const avatar = user?.avatar;
  const fullname = user?.fullname;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setImage(null);
      setPreview(initialData.image_url || "");
    } else {
      setTitle("");
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
    formData.append("title", title);
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-0 relative overflow-hidden">
        {/* Header */}
        <div className="border-b px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {initialData ? "แก้ไขโพสต์" : "สร้างโพสต์"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={avatar || "/default-avatar.png"}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold">{fullname || "ผู้ใช้"}</div>
            <span className="text-xs text-gray-500">สาธารณะ</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 pb-4 space-y-4">

          {/* Post Title */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              หัวข้อโพสต์
            </label>
            <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            placeholder="หัวข้อโพสต์"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          </div>
          

          {/* TinyMCE Editor */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              เนื้อหาโพสต์
            </label>
            <TinyMCEEditor type="post" value={content} onChange={setContent} />
          </div>
          

          {/* Post Content */}
          {/* <textarea
            rows={4}
            className="w-full text-lg border-none focus:ring-0 resize-none placeholder-gray-400"
            placeholder="คุณมีเรื่องอะไรจะบอกไหม?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          /> */}

          {/* Image Upload */}
          {/* <div className="border border-gray-300 rounded-lg p-3 text-center">
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
                    setImage(null);
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
                  + เพิ่มรูปภาพ
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-400">รองรับไฟล์ .jpg, .png</p>
              </>
            )}
          </div> */}

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold cursor-pointer"
          >
            {initialData ? "บันทึกการแก้ไข" : "โพสต์"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostModal;
