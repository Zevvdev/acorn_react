// src/pages/UserPwdUpdateForm.jsx

import { useEffect, useRef, useState } from "react";
import api from "../api";
import cn from 'classnames'; 
import { useDispatch } from "react-redux";


function UserPwdUpdateForm() {

  // 폼에 입력한 내용을 하나의 state로 관리
  const [state, setState] = useState({
    password:"",
    newPassword:"",
    newPassword2:""
  });

  // 폼 입력란의 유효성 여부
  const [valid, setValid] = useState({
    password:false,
    newPassword:false
  });

  // 폼 입력란을 한번이라도 입력했는지 여부(더럽혀졌는지)를 상태값으로 관리
  const [dirty, setDirty] = useState({
    password:false,
    newPassword:false
  });

  // 특수문자가 있는지 여부 검증할 정규표현식
  const reg = /[\W]/;

  const [errorMsg, setErrorMsg]=useState("");

  useEffect(()=>{
    //유효성 여부를 바로 state 에 반영
    setValid({
        password: state.password.length >= 1,
        newPassword: reg.test(state.newPassword),
        newPassword2: reg.test(state.newPassword) && state.newPassword === state.newPassword2
    });
  }, [state]);    

  // input 요소에 change 이벤트가 발생했을 때
  const handleChange = (e)=>{
    // 입력한 내용을 바로 state에 반영 (즉시 반영되도록 함수 모양으로 상태값을 변경)
    setState({
      ...state,
      [e.target.name]:e.target.value
    });
    // 입력란의 dirty 값을 true로 변경한다.
    setDirty({
      ...dirty,
      [e.target.name]:true
    })
  }   

  const dispatch = useDispatch();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // 폼 제출시 에러메시지 초기화
    setErrorMsg(null);
    try{
      const res = await api.patch("/v1/user/password", state);
      // 정상 응답(200)이면 여기가 실행되고'
      console.log(res);
      alert("비밀번호를 수정했습니다.");
      // 토큰을 삭제하고
      delete localStorage.token;
      // 다시 로그인하도록 창을 띄워준다.
      dispatch({
        type:"LOGIN_MODAL",
        payload:{title:"수정된 비밀번호로 다시 로그인하세요.", show:true, url:"/user"}
      });

    }catch(err){
      // 정상 응답 아니면 catch 블럭이 실행된다.
      console.log(err);
      setErrorMsg(err.response.data);
    };
  };

  return <>
    <h1>비밀번호 수정 양식</h1>
		
		{/* 만일 에러 객체가 존재하면 아래의 알람 출력하기 */}
    { errorMsg && <p className="alert alert-danger">{errorMsg}</p> }
		
		
		<form action="/v1/user/password" onSubmit={handleSubmit}>
			<div className="mb-2">
				<label className="form-label" htmlFor="password">기존 비밀번호</label>
				<input onChange={handleChange} value={state.password} 
            className={cn("form-control", {"is-valid":valid.password, "is-invalid":!valid.password && dirty.password})} type="password" name="password" id="password"/>
        
        <div className="invalid-feedback">기존비밀번호를 입력하세요.</div>
			</div> 

			<div className="mb-2">
				<label className="form-label" htmlFor="newPassword">새 비밀번호</label>
				<input onChange={handleChange} value={state.newPassword} 
            className={cn("form-control", {"is-valid":valid.newPassword, "is-invalid":!valid.newPassword && dirty.newPassword})} type="password" name="newPassword" id="newPassword"/>
        <div className="invalid-feedback">특수문자를 반드시 포함하세요.</div>
			</div>

			<div className="mb-2">
				<label className="form-label" htmlFor="newPassword2">새 비밀번호 확인</label>
				<input onChange={handleChange} value={state.newPassword2} 
            className={cn("form-control", {"is-valid":valid.newPassword2, "is-invalid":!valid.newPassword2 && dirty.newPassword2})} type="password" name="newPassword2" id="newPassword2"/>
        <div className="invalid-feedback">새 비밀번호를 확인하세요.</div>
			</div>
      {/* password나 newPassword가 유효하지 않으면 disabled -> true로 설정*/}
      <button disabled={!valid.password || !valid.newPassword || !valid.newPassword2 } className="btn btn-sm btn-success" type="submit">수정하기</button>
		</form>  
  </>
}

export default UserPwdUpdateForm;