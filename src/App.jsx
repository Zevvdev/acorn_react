// src/App.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom';
import BsNavbar from './components/BsNavbar';
import LoginModal from './components/LoginModal';



function App() {
  //React Router v6에서 제공하는 hook
  //현재 경로에 맞는 자식 route component를 반환한다
  const currentOutlet = useOutlet();

  return <>
    <BsNavbar/>
    <div className="container" style={{marginTop:"80px"}}>
      {currentOutlet}
    </div>
    <LoginModal/>
  </>
    
  
}

export default App;