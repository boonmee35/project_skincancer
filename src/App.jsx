import React from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Analysis from './pages/Analysis'
import ForumPage from './pages/ForumPage'
import AnalysisHistory from './pages/AnalysisHistory'

import AuthPage from './pages/AuthPage'
import ForgotPass from './pages/ForgotPass'

import HomeAd from './admin/pages/Home'
import UsersAd from './admin/pages/Users'
import ArticlesAd from './admin/pages/Articles'
import Categories from './admin/pages/Categories'
import Posts from './admin/pages/Posts'


const routes = [
  { path: '/', element: <Home /> },
  { path: '/articles', element: <Articles /> },
  { path: '/article/:id', element: <ArticleDetail /> },
  { path: '/analysis', element: <Analysis /> },
  { path: '/forum', element: <ForumPage /> },
  { path: '/history', element: <AnalysisHistory /> },
  { path: '/login', element: <AuthPage /> },
  { path: '/register', element: <AuthPage /> },
  { path: '/forgot-password', element: <ForgotPass /> },
  { path: '/admin', 
    element: <HomeAd />,
    children: [
      { path: 'profile', element: <div>โปรไฟล์</div> },
      { path: 'users', element: <UsersAd/> },
      { path: 'posts', element: <Posts/> },
      { path: 'articles', element: <ArticlesAd /> },
      { path: 'categories', element: <Categories /> },
    ]
  },
  { path: '*', element: <div>404 Not Found</div> }
]

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}

function App() {
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App