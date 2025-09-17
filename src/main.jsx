// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//SPA 를 구현하기 위한 RouterProvider를 import
import { RouterProvider} from 'react-router-dom'
import router from './router'


//routing 정보를 담고있는 router import



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
