// src/pages/member.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Member() {
  // 회원목록을 상태값으로 관리
  const [members, setMembers] = useState([]);

  useEffect(()=>{
    // npm install axios 로 설치한 axios 를 이용하여 api 요청하기
    
    axios.get("/api/v1/members")
    .then(res => {
        console.log(res);
        //res.data 에 서버가 응답한 data가 들어있다.
        setMembers(res.data);
    })
    .catch(err => console.log(err));
    
  },[]);
  
  return <>
    <NavLink to="/members/new">회원추가</NavLink>
    <h1>회원목록</h1>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>주소</th>
          <th>자세히</th>
        </tr>
      </thead>
      <tbody>
        {members.map(item=>
          <tr key={item.num}>
            <td>{item.num}</td>
            <td>{item.name}</td>
            <td>{item.addr}</td>
            <td>
              <NavLink to={`/members/${item.num}`}>보기</NavLink>
              <Button as={NavLink} to={`/members/${item.num}`}>보기</Button>
              {/* <a href> 는 새로 요청하는 거라 사용 X */}
              {/* {js 사용하려면} "`/members..`"는 안됨 */}
              {/* button안됨--> react-bootstrap의 Button 만 됨 */}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </>
}

export default Member;