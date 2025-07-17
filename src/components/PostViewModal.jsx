import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { LuSend } from "react-icons/lu";

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
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-xl font-bold mb-2">โพสต์ {post.fullname}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        {/* Post Content */}
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center mb-3">
            <img
              src={post.avatar}
              alt="user"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-semibold">{post.fullname}</div>
              <div className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</div>
            </div>
          </div>

          {/* Post Text */}
          <p className="text-gray-700 mb-3">{post.content}</p>

          {/* Post Image */}
          {post.image_url && (
            <img
              src={post.image_url}
              alt="post"
              className="w-full rounded-md mb-3"
            />
          )}
          </div>

        {/* Comments Section */}

        <h3 className="font-semibold text-lg text-teal-700 mb-2">ความคิดเห็น</h3>
        <div className="space-y-3 mb-4">
          {comments.map((c, i) => (
            <div key={i} className="p-2 bg-gray-100 rounded">
              <div className="text-sm font-medium">{c.fullname}</div>
              <div className="text-sm text-gray-700">{c.comment_text}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
  <textarea
    rows={1}
    className="flex-1 border border-gray-300 rounded-md p-2 resize-none"
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    placeholder="เขียนความคิดเห็น..."
  />
  <button
    onClick={handleAddComment}
    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded whitespace-nowrap"
  >
    <LuSend className="inline-block mr-1" />
  </button>
</div>
      </div>
    </div>
  );
};

export default PostViewModal;
