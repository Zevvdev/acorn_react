// src/pages/MemberDetail.jsx

import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Location from '../components/Bread';
import ConfirmModal from '../components/ConfirmModal';

function MemberDetail() {
  // 자세히 보여줄 회원의 번호 읽어와서
  // react router 에서 제공해주는 hook (useParams) 을 이용해서
  // "/members/:num" 에서 num (회원번호) 를 얻어낸다.
  const {num} = useParams();

  // "/memabers/x?message=success" 에서 query 파라미터를 추출하기 위한 hook
  const [params]=useSearchParams();
  console.log(params);
  console.log(params.get("message"));

  // API 서버에 해당 회원정보를 받아온 후 UI 에 출력
  const [dto, setDto] = useState({});

  // ConfirmModal 을 띄울지 여부를 상태값으로 관리
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    fetch(`/api/v1/members/${num}`)
      .then(res=>res.json())
      .then(data=>setDto(data));
  },[]);

  const bread = [
    {name:"회원목록", to:"/members"},
    {name:"Detail"}
  ]

  //route 이동을 위한 navigate 함수를 hook 이용하여 얻기
  const navigate = useNavigate();

  const handleYes= ()=>{
    fetch(`/api/v1/members/${dto.num}`,{
        method:"delete", 
        headers:{"Content-Type":"application/json"}, // json 문자열을 보낸다고 알림
        body: JSON.stringify(dto)// 상태값으로 관리되는 member object 를 보낸다
      })
        .then(res=>res.json())
        .then(data=>{
          navigate('/members')
        });
  };


  return  <>
    <Location list={bread}/>
    { params.get("message") && <Alert className="m-4" variant="success">저장했습니다.</Alert>}
    <h1>회원 자세히보기</h1>
    <p>번호 : <strong>{dto.num}</strong></p>
    <p>이름 : <strong>{dto.name}</strong></p>
    <p>주소 : <strong>{dto.addr}</strong></p>
    {/*
      여기에 수정, 삭제 버튼 추가
      수정은 MemberUpdateForm.jsx 컴포넌트
      삭제는 "정말로 삭제하시겠습니까?" 라는 Bootstrap Modal 띄워서 동작하도록 하기

      "/members/x/edit" => 수정 routing 경로
    */}
    <Button variant="success" as={NavLink} to={`/members/${dto.num}/edit`}>수정</Button>
    <Button variant="danger" className="ms-2" onClick={()=>setShowModal(true)}>삭제</Button>
    
    <ConfirmModal show={showModal} 
        message={`${dto.num}번 회원의 정보를 삭제하시겠습니까?`} 
        onYes={handleYes} 
        onCancel={()=>setShowModal(false)}/>
  
  </>
}

export default MemberDetail;