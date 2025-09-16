// src/pages/MemberUpdateForm.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MemberUpdateForm(props) {



  // 수정할 회원번호
  const {num} = useParams();

  // objec 안에 빈값 미리 넣어준다.
  const [dto, setDto]=useState({
    num:null, 
    name:"",
    addr:""
  });
  // 수정할 회원정보 api 서버로부터 받아와서 상태값으로 관리
  useEffect(()=>{
    fetch(`/api/v1/members/${num}`)
      .then(res=>res.json())
      .then(data=>setDto(data));
  },[]);
  
  const bread=[
    {name:"Members", to:"/members"},
    {name:"Edit"}
  ];


  // form에 change 이벤트 발생 시
  const handleChange = (e)=>{
    // 입력한 value 값
    const value=e.target.value;
    // 입력한 input 요소의 name 속성의 값 읽어오기
    const name = e.target.name;
    // 입력 내용 이용하여 상태값 변경
    setDto({
      ...dto, 
      [name]:value // 여기서 name은 "name"또는 "addr"
    })
  };

  //route 이동을 위한 navigate 함수를 hook 이용하여 얻기
  const navigate = useNavigate();
    

  // form에 submit 이벤트 실행 시 함수
  const handleSubmit = (e)=>{
    e.preventDefault();
    const form=e.target;
    
      fetch(form.action,{
        method:"put", 
        headers:{"Content-Type":"application/json"}, // json 문자열을 보낸다고 알림
        body: JSON.stringify(dto)// 상태값으로 관리되는 member object 를 보낸다
      })
        .then(res=>res.json())
        .then(data=>{
          navigate('/members/&{data.num}')
        });
    };

    
  return <>
    <Bread list={bread}/>
    <h1><i>{dto.num}</i>회원 수정 양식</h1>
    <form action={`/api/v1/members/${dto.num}`} onSubmit={handleSubmit} >
      <div>
        <label htmlFor="name">이름</label>
        <input onChange={handleChange} type="text" name="name" id="name" value={dto.name}/>
      </div>
      <div>
        <label htmlFor="addr">주소</label>
        <input onChange={handleChange} type="text" name="addr" id="addr" value={dto.addr}/>
      </div>
      <button type="submit">수정확인</button>
    </form>
  </>
}

export default MemberUpdateForm;