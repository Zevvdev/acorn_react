// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//SPA 를 구현하기 위한 RouterProvider를 import
import { RouterProvider } from 'react-router-dom'

//routing 정보를 담고있는 router import
//원래는 './router/index' 인데 파일명이  index인 경우 자동으로 연결됨
import router from './router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
