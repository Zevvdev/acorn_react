// src/pages/Home.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>인덱스 페이지입니다.</h1>
      <ul>
        <li>
          <NavLink to="/study">공부하자</NavLink>
        </li>
        <li>
          <NavLink to="/play">놀자</NavLink>
        </li>
      </ul>
    </>
  );
}

export default Home;