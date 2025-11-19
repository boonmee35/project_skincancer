import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Analysis from "./pages/Analysis";
import DiagnosisResult from "./pages/DiagnosisResult";
import ForumPage from "./pages/ForumPage";
import AnalysisHistory from "./pages/AnalysisHistory";
import AnalysisHistoryDetail from "./pages/AnalysisHistoryDetail";
import Profile from "./pages/Profile";

import AuthPage from "./pages/AuthPage";
import ForgotPass from "./pages/ForgotPass";

import AdminLayout from "./admin/AdminLayout";
import HomeAd from "./admin/pages/Home";
import UsersAd from "./admin/pages/Users";
import ArticlesAd from "./admin/pages/Articles";
import Categories from "./admin/pages/Categories";
import Posts from "./admin/pages/Posts";
import Comments from "./admin/pages/Comments";
import AnalysisAd from "./admin/pages/Analysis";

import {
  PrivateRoute,
  PublicOnlyRoute,
  AdminRoute,
} from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<DiagnosisResult />} />

          {/* 🔒 Public-only (login/register) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
          </Route>

          {/* 🔒 Private User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/history" element={<AnalysisHistory />} />
            <Route path="/history/result" element={<AnalysisHistoryDetail />} />
            <Route path="/profile" element={<Profile/>} />
          </Route>

          {/* 🔒 Admin-only Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<HomeAd />} />
              <Route path="users" element={<UsersAd />} />
              <Route path="posts" element={<Posts />} />
              <Route path="comments" element={<Comments />} />
              <Route path="articles" element={<ArticlesAd />} />
              <Route path="categories" element={<Categories />} />
              <Route path="analysis" element={<AnalysisAd />} />
            </Route>
          </Route>

          {/* ❌ Not Found */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>

        {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
