// src/pages/Home.jsx

import axios from 'axios';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Home() {
  /*
      아래의 로그인 버튼을 눌렀을 때 LoginModal을 띄워보세요.

      모달의 title은 "로그인 폼입니다."로 
  */

  // action을 발행하기 위한 dispatch 함수
  const dispatch = useDispatch();
  // 로그인 정보를 읽어오기 (redux store로부터)
  const userInfo = useSelector(state=>state.userInfo);

  const handleLogin = ()=>{
    //로그인 모달을 띄울 action 객체를 만들어서
    const action = {type:"LOGIN_MODAL", 
      payload:{
        title:"로그인 폼입니다.", 
        show:true
      }
    };
    //action을 발행한다.
    dispatch(action);
  };

  const handleLogout = ()=>{
    // 토큰 삭제
    delete localStorage.fakeToken;
    // store에서 관리되는 userInfo를 null로 변경
    const action={type:"USER_INFO", payload:null};
    dispatch(action);
  };

  return (
    <>
      <h1>인덱스 페이지입니다.</h1>

      { 
        userInfo ? (
          <p>      
            <strong>{userInfo.userName}</strong>님 로그인중...
            <button onClick={handleLogout}>로그아웃</button>
          </p>
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )
      }

      
      <h3>회원전용</h3>
      <NavLink to="/member">이동</NavLink>
      <br />
      <Button as={NavLink} to="/game">Game</Button>
      {/* <NavLink to="/game">게임</NavLink> */}
      
      <h3>Authorization 을 추가한 요청</h3>
      <button onClick={()=>{
        axios.get("/api/v1/members", {
          headers:{
            Authorization:"token..."
          }
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));
      }}>요청 보내기</button>
    </>
    
  );
}

export default Home;