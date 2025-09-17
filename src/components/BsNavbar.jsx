// src/components/BsNavbar.jsx

import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function BsNavbar() {
  // store의 상태값을 바꿀 함수
  const dispatch = useDispatch();
  // redux store로부터 상태값 가져오기
  const userInfo = useSelector(state=>state.userInfo);
  // route 이동을 하기 위한 hook
  const navigate = useNavigate();

  // 로그인 버튼 눌렀을 때
  const handleLogin = ()=>{
    // LoginModal 띄울 action 발행
    const action={type:"LOGIN_MODAL", payload:{
      title:"로그인 폼입니다.",
      show:true
    }};
    dispatch(action);
  };

  // 로그아웃 버튼 눌렀을 때
  const handleLogout = ()=>{
    // 토큰 삭제
    delete localStorage.token;
    // redux store에 userInfo 초기화
    dispatch({type:"USER_INFO", payload:null});
    // 인덱스로 이동
    navigate("/");
  };


  return <>
    <Navbar fixed="top" expand="md" className="bg-warning">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Acorn</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapse"/>
        <Navbar.Collapse id="collapse">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/posts">Post</Nav.Link>
            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
          </Nav>
          { userInfo ? 
          <>
            <Nav>
              <Nav.Link><strong>{userInfo.userName}</strong></Nav.Link>
              <span className="navbar-text">님 로그인중..</span>
            </Nav>
            <Button onClick={handleLogout} className="ms-2" size="sm" variant="outline-danger">로그아웃</Button>
          </>
          :
          <>
            <Button onClick={handleLogin} size="sm" variant="success">로그인</Button>
            <Button size="sm" variant="primary" className="ms-1">회원가입</Button>
          </>
          } 
        </Navbar.Collapse>
      </Container>
      
    </Navbar>  

  </>
}

export default BsNavbar;