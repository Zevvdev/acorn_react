// src/pages/MemberForm.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Location from '../components/Bread';

function MemberForm() {
  //javasript로 라우팅할 수 있는 함수 얻어내기
  const navigate = useNavigate();

  //form에 submit 이벤트가 발생했을 때 실행할 함수
  const handleSubmit = (e)=>{
    //기본동작 막기(form 제출 막기)
    e.preventDefault();
    //이벤트가 발생한 요소의 참조값(form 요소의 참조값)
    const form=e.target;
    //폼에 입력한 내용을 담고 있는 FormData 객체를 얻어낸다.
    const formData=new FormData(form);
    //폼에 입력한 내용을 object 로 변환
    const obj=Object.fromEntries(formData);
    //object 를 JSON 문자열로 변환
    const json = JSON.stringify(obj);
    //fetch() 함수를 이용해서 전송하기
    fetch(form.action, {
        method:form.method, //요청 method 
        headers:{"Content-Type":"application/json"}, //요청 header
        body:json //요청 body
    })
    .then(res=>res.json())
    .then(data=>{
        //방금 추가한 회원정보가 data에 들어있다.
        //"/members/x" 위치로 이동해야한다.
        // <NavLink to="/members/x">이동</NavLink> 이런 링크 누른 효과를 내야한다.
        navigate(`/members/${data.num}?message=success`);
    });
  };

  const bread=[
    {name:"Members", to:"/members"},
    {name:"New Form"}
  ];

  return <>
    <Location list={bread}/>
    <h1>회원 추가 양식</h1>
    <form action="/api/v1/members" method="post" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">이름</label>
        <input type="text" name="name" id="name"/>
      </div>
      <div>
        <label htmlFor="addr">주소</label>
        <input type="text" name="addr" id="addr"/>
      </div>
      <button type="submit">저장</button>
    </form>
  </>
}

export default MemberForm;