// src/components/LoginModal.jsx

import api from '../api';
import { useState } from "react";
import { Alert, Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function LoginModal() {

  // store 로부터 loginModal의 상태값을 읽어온다.
  // {title:"모달의 제목", show:모달을 띄울지 여부} 형식의 object이다
  const loginModal = useSelector(state=>state.loginModal);
  
  // 입력한 userName 과 password를 상태값으로 관리
  const [state, setState]=useState({});

  // 아이디 비번을 입력했을 때 호출될 함수
  const handleChange = (e)=>{
    // 입력한 내용을 상태값에 반영한다.
    setState({
      ...state,
      [e.target.name]:e.target.value
    });
  }
  // 에러 메시지를 상태값으로 관리
  const [errorMsg, setErrorMsg] = useState(null);

  // 액션을 발행할 함수
  const dispatch = useDispatch();
  // route 이동을 위한 navigate() 함수
  const navigate = useNavigate();

  // 로그인 버튼을 눌렀을 때 실행할 함수
  const handleLogin = async()=>{ //이 함수는 즉시 리턴하는 함수가 아님을 async로 알려준다.
    try {
      // api 서버에 로그인 요청을 보내고 
      const res = await api.post("/v1/login", state);
      // userName과 password가 유효한 정보이면 정상 응답이 되고
      console.log(res.data);
      // 토큰을 localStorage에 저장한다
      // 웹브라우저가 제공하는 자체 기능, 지우지 않는 이상 영구 저장된다.
      // localStorage.fakeToken = res.data;
      localStorage.token=res.data;
      // redux store에 로그인 정보 저장한다.
      const payload = {userName:state.userName, role:"ADMIN"};
      const action = {type:"USER_INFO", payload}; //payload:payload
      dispatch(action);
      // 로그인 폼을 초기화하고 숨긴다.
      setErrorMsg(null);
      dispatch({
        type:"LOGIN_MODAL",
        payload:{
          title:"",
          show:false
        }
      });
      
      // 로그인 성공 후 이동할 url
      const url = loginModal.url; //null 가능성 있음
      // 원래 가려던 목적지 정보가 있으면 해당 위치로 이동
      if(url){
        navigate(url);
      }

    } catch (err) {
      // userName과 password가 틀리면 401 UNAUTHORIZED 에러 응답할 예정.
      setErrorMsg(err.response.data);
    }
  }  

  // 모달창 닫기 버튼 누르면 - react bootstrap Modal 에는 hide 이벤트 발생
  // 해당 이벤트 발생했을 때 redux store의 상태값을 변경해서 모달창이 숨겨지도록 한다.
  const handleHide = ()=>{
    dispatch({
      type:"LOGIN_MODAL",
      payload:{title:"", show:false}
    })
  };


  return <>
    {/* store 에서 관리되는 loginModal 의 show 값을 이용해서 띄울지 말지 결정 */}
    <Modal onHide={handleHide} show={loginModal.show} size="lg" centered>
      <Modal.Header closeButton>
          <Modal.Title>{loginModal.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <FloatingLabel controlId='userName' label="User Name" className='mb-3'>
              <Form.Control onChange={handleChange} name="userName" type="text" />
          </FloatingLabel>
          <FloatingLabel controlId='password' label="Password" className='mb-3'>
              <Form.Control onChange={handleChange} name="password" type="password" />
          </FloatingLabel>
          { errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={handleLogin}>로그인</Button>
      </Modal.Footer>
    </Modal>    
  </>
}

export default LoginModal;