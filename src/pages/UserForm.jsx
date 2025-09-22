// src/pages/UserForm.jsx

import cn from 'classnames'; 
import { useEffect, useState } from "react";
import api from '../api';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';



function UserForm() {

  

  // 폼에 입력한 내용을 상태값으로 관리
  const [state, setState]=useState({
    userName:"",
    password:"",
    password2:"",
    email:""
  });

 

  // 폼 입력란의 유효성 여부 상태값 관리
  const [valid, setValid] = useState({
    userName:false, 
    password:false,
    password2:false,
    email:false
  });

  // 폼 입력란의 dirty 상태값 관리
  const [dirty, setDirty] = useState({
    userName:false,
    password:false,
    password2:false,
    email:false
  });

  // userName 정규표현식
  const regUserName = /^[a-z].{4,9}$/;
  // 비밀번호 정규표현식
  const regPwd = /[\W]/;
  // 이메일 정규표현식
  const regEmail = /@/;

  // error
  const [errorMsg, setErrorMsg]=useState("");

  // state 가 변경되었을 때 실행할 함수
  useEffect(()=>{
    // 유효성
    setValid({
      userName: regUserName.test(state.userName),
      password:regPwd.test(state.password),
      password2:regPwd.test(state.password2) && state.password === state.password2,
      email:regEmail.test(state.email)
    });
  }, [state]);

  const handleChange = (e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    });
    setDirty({
      ...state,
      [e.target.name]:true
    })
  };

  const dispatch = useDispatch();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // 폼 제출시 에러메시지 초기화
    setErrorMsg(null);
    try{
      // 이미 가입된 아이디라면 여기서 예외 발생 (catch 블럭 실행)
      // axios 는 200번대 응답
      await api.post("/v1/user", state);
      // 로그인 창 띄우기
      dispatch({
        type:"LOGIN_MODAL",
        payload:{title:"가입된 아이디로 로그인을 하세요", show:true, url:"/user"}
      });
    }catch(err){
      console.log(err);
      // 에러 state에 에러 메시지를 넣어준다
      setErrorMsg(err.response.data);
    }
  };

  return <>
    <h1>회원가입 양식</h1>

    {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

    <form onSubmit={handleSubmit} method="post" noValidate>
			<div className="mb-2">
				<label className="form-label" htmlFor="userName">아이디</label>
				<input onChange={handleChange} value={state.userName} 
            className={cn("form-control", {"is-valid":valid.userName, "is-invalid":!valid.userName && dirty.userName})} type="text" name="userName" id="userName"/>
				<small className="form-text">영문자 소문자로 시작하고 5글자~10글자 이내로 입력하세요</small>
				<div className="valid-feedback">사용 가능한 아이디 입니다.</div>
				<div className="invalid-feedback">사용할 수 없는 아이디 입니다.</div>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="password">비밀번호</label>
				<input onChange={handleChange} className={cn("form-control", {"is-valid":valid.password, "is-invalid":!valid.password && dirty.password})} type="password" name="password" id="password"/>
				<small className="form-text">특수 문자를 하나 이상 조합하세요.</small>
				<div className="invalid-feedback">비밀 번호를 확인 하세요</div>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="password2">비밀번호 확인</label>
				<input onChange={handleChange} className={cn("form-control", {"is-valid":valid.password2, "is-invalid":!valid.password2 && dirty.password2})} type="password" name="password2" id="password2"/>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="email">이메일</label>
				<input onChange={handleChange} className={cn("form-control", {"is-valid":valid.email, "is-invalid":!valid.email && dirty.email})} type="email" name="email" id="email"/>
				<div className="invalid-feedback">이메일 형식에 맞게 입력하세요.</div>
			</div>
			<button className="btn btn-primary btn-sm" type="submit" disabled={!valid.userName || !valid.password || !valid.password2}>가입</button>
		</form>

  </>
}

export default UserForm;