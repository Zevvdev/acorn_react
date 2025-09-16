// src/App.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink, useOutlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import BsNavbar from './components/BsNavbar';

function App() {
  //React Router v6에서 제공하는 hook
  //현재 경로에 맞는 자식 route component를 반환한다
  const currentOutlet = useOutlet();

  return <>
    <BsNavbar/>
    <div className="container pt-4" style={{marginTop:"60px"}}>
      {currentOutlet}
    </div>
  </>
}

export default App;