// src/pages/UserPwdUpdateForm.jsx

import { useEffect, useRef, useState } from "react";
import api from "../api";



function UserPwdUpdateForm2() {

  // input 요소의 참조값 얻어오기 위한 hook
  const pwdRef = useRef();
  const newPwdRef = useRef();
  const newPwdRef2 = useRef();

  const handleSubmit = (e)=>{
    e.preventDefault();

    // 비밀번호 input 요소의 참조값
    const pwdRef = pwdRef.current.value;
    const newPwd = newPwdRef.current.value;
    const newPwd2 = newPwdRef2.current.value;

    if(pwd.trim() == ""){ // 문자열에서 공백제거(좌우 공백)해서 비교 
      alert("기존 비밀번호를 입력하세요!");
      e.preventDefault();
    }else if(newPwd.trim() == ""){
      alert("새 비밀번호를 입력하세요!");
      e.preventDefault();
    }else if(newPwd.trim() != newPwd2.trim()){
      alert("새 비밀번호를 확인란과 동일하게 입력하세요!");
      e.preventDefault();
    }
    api.patch(e.target.action,{
      password:pwd,
      newPassword:newPwd
    })
    .then(res=>{})
    .catch(err=>{});


  }


  return <>
    <h1>비밀번호 수정 양식</h1>
		
		{/* 만일 에러 객체가 존재하면 아래의 알람 출력하기 */}
		<p ClassName="alert alert-danger"></p>
		
		<form action="/api/v1/user/password" method="post" onSubmit={handleSubmit}>
			<div ClassName="mb-2">
				<label ClassName="form-label" htmlFor="password">기존 비밀번호</label>
				<input ref={pwdRef} ClassName="form-control" type="password" name="password" id="password"/>
			</div> 

			<div ClassName="mb-2">
				<label ClassName="form-label" for="newPassword">새 비밀번호</label>
				<input ref={newPwdRef} ClassName="form-control" type="password" name="newPassword" id="newPassword"/>
			</div>

			<div ClassName="mb-2">
				<label ClassName="form-label" for="newPassword2">새 비밀번호 확인</label>
				<input ref={newPwdRef2} ClassName="form-control" type="password" id="newPassword2"/>
			</div>

			<button ClassName="btn btn-sm btn-success" type="submit">수정하기</button>
		</form>  
  </>
}

export default UserPwdUpdateForm;