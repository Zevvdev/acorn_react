// src/App.jsx

import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useOutlet } from 'react-router-dom';
import BsNavbar from './components/BsNavbar';
import LoginModal from './components/LoginModal';
import { jwtDecode } from 'jwt-decode';
import api from './api';
import { useDispatch } from 'react-redux';
// bootstrap icon 을 사용하기 위한 import
import 'bootstrap-icons/font/bootstrap-icons.css'




function App() {
  //React Router v6에서 제공하는 hook
  //현재 경로에 맞는 자식 route component를 반환한다
  const currentOutlet = useOutlet();

  const dispatch=useDispatch();

  const navigate = useNavigate();

  // 컴포넌트가 활성화되는 시점에 토큰을 읽어와본다
  useEffect(()=>{
    const token=localStorage.token;
    if(token){
      // 앞의 7자리 문자열 "Bearer " 를 제외한 뒤의 문자열을 디코딩한다.
      const decoded = jwtDecode(token.substring(7));
      // 콘솔에 출력해보기
      console.log("토큰 정보!!!");
      console.log(decoded);
      // token 만료시간 얻어내서 ms 단위로 변경한다.(*1000)
      const exp = decoded.exp*1000
      // 현재 시간 얻어내기(ms)
      const now = Date.now();
      // 남은 시간
      const remainTime = exp-now;
      // 남은 시간이 경과하면 실행할 함수 등록
      const logoutTimer = setTimeout(()=>{
        // 로그아웃 처리
        delete localStorage.token;
        dispatch({ type: 'USER_INFO', payload: null });
        alert('토큰이 만료되어 자동 로그아웃되었습니다.');
        navigate("/");
      }, remainTime);
      // logoutTimer 아이디를 redux store에 저장한다.
      dispatch({
        type:"LOGOUT_TIMER",
        payload:logoutTimer
      })

      api.get("/v1/ping")
      .then(res=>{
        // 여기가 실행되면 사용가능한 토큰
        // 발행할 action
        const action={type:"USER_INFO", payload:{
          userName:decoded.sub,
          role:decoded.role
        }};
        dispatch(action);
      })
      .catch(err=>{
        // 여기가 실행되면 사용불가능 토큰
        delete localStorage.token;
      })
    }
  },[]);

  return <>
    <BsNavbar/>
    <div className="container" style={{marginTop:"80px"}}>
      {currentOutlet}
    </div>
    <LoginModal/>
  </>
    
  
}

export default App;