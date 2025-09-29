// src/pages/Home.jsx

import api from '../api';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';

function Home() {
 
  //공지사항
  const [noticeList, setNoticeList] = useState([]);

  useEffect(()=>{
    api.get("/v1/notice")
    .then(res=>setNoticeList(res.data))
    .catch(err=>console.log(err));

  },[]);

  const [hide, setHide] = useState([]);

  const handleHide=()=>{
    // hide 가 true면 false, hide 가 false 면 true의 결과가 나옴
    const result = hide ? false : true ;
    setHide(result);
  };

  // 그룹 토글 set 객체를 상태값으로 관리 (초기값 = 빈 set)
  const [openGroups, setOpenGroups] = useState(new Set());

  const toggleGroups = (groupNum) => {
    // 기존 Set 객체를 저장된 내용을 이용해서 새로운 Set 객체 만들기
    const set = new Set(openGroups);
    set.has(groupNum) ? set.delete(groupNum) : set.add(groupNum);
    setOpenGroups(set);
  };

  return (
    <>
      <h1>인덱스 페이지입니다.</h1>

      <h2>공지사항</h2>
      <Button onClick={handleHide} variant="primary">
        {hide ? "보기" : "숨기기"}
      </Button>
      <ul className={cn({"d-none":hide})}>
        {/* map() 함수에 전달한 함수에는 2번째 매개변수에 item의 인덱스 값도 전달된다. */}
        {noticeList.map((item, index)=><li key={index}>{index+1}번 : {item}</li>)}
      </ul>

      <h2>공지사항1</h2>
      <Button onClick={()=>toggleGroups(1)} variant="primary">
        {!openGroups.has(1) ? "보기" : "숨기기"}
      </Button>
      <ul className={cn({"d-none":!openGroups.has(1)})}>
        {/* map() 함수에 전달한 함수에는 2번째 매개변수에 item의 인덱스 값도 전달된다. */}
        {noticeList.map((item, index)=><li key={index}>{index+1}번 : {item}</li>)}
      </ul>

      <h2>공지사항2</h2>
      <Button onClick={handleHide} variant="primary">
        {hide ? "보기" : "숨기기"}
      </Button>
      <ul className={cn({"d-none":hide})}>
        {/* map() 함수에 전달한 함수에는 2번째 매개변수에 item의 인덱스 값도 전달된다. */}
        {noticeList.map((item, index)=><li key={index}>{index+1}번 : {item}</li>)}
      </ul>
      
    </>
    
  );
}

export default Home;