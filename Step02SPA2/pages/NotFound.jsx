// src/pages/NotFound.jsx

import React from 'react';
import { Button, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  const navigate = useNavigate();

  return <>
    <h1>404</h1>
    <p>페이지를 찾을 수 없습니다.</p>
    <p>주소가 잘못되었거나, 페이지가 이동/삭제되었을 수도 있습니다.</p>
    <Button variant="primary" as={NavLink} to="/">홈으로</Button>
    <Button variant="warning" className="ms-3">뭐여</Button>  
  </>
}

export default NotFound;