import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const PostViewModal = ({ isOpen, onClose, postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { user } = useAuth();
  const user_id = user?.id;

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (postId && isOpen) {
      fetchPostDetail();
    }
  }, [postId, isOpen]);

  const fetchPostDetail = async () => {
    try {
      const resPost = await axios.get(`${apiUrl}forum/posts/${postId}`);
      setPost(resPost.data);
      const resComments = await axios.get(`${apiUrl}forum/posts/${postId}/comments`);
      setComments(resComments.data);
    } catch (error) {
      console.error("โหลดโพสต์หรือคอมเมนต์ไม่สำเร็จ:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const res = await axios.post(`${apiUrl}forum/posts/${postId}/comments`, {
        user_id: user_id,
        comment_text: newComment,
      });
      setNewComment("");
      setComments([...comments, res.data]); 
    } catch (error) {
      console.error("เพิ่มคอมเมนต์ไม่สำเร็จ:", error);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-lg p-6 overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="text-gray-600 text-sm float-right">ปิด</button>
        <h2 className="text-xl font-bold mb-2">โพสต์ของ {post.fullname}</h2>
        <p className="text-gray-700 mb-4">{post.content}</p>
        {post.image_url && (
          <img src={post.image_url} alt="post" className="w-full rounded-md mb-4" />
        )}

        <h3 className="font-semibold text-lg text-teal-700 mb-2">ความคิดเห็น</h3>
        <div className="space-y-3 mb-4">
          {comments.map((c, i) => (
            <div key={i} className="p-2 bg-gray-100 rounded">
              <div className="text-sm font-medium">{c.fullname}</div>
              <div className="text-sm text-gray-700">{c.comment_text}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="เขียนความคิดเห็น..."
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
          >
            ส่งความคิดเห็น
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostViewModal;
