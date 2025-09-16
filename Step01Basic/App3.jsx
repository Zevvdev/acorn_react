import React, { useState } from 'react';

function App3() {
  //회원 목록 상태값으로 관리하기
  const [members, setMembers] = useState([]);
  return (
    <div className="container">
      <button onClick={()=>{
        fetch("/api/v1/members")
        .then(res=>res.json())
        .then(data=>{
          //data 는 회원목록이 들어있는 배열
          //spring boot 서버로부터 받아온 데이터로 상태값을 변경하면 ui가 업데이트 된다.
          setMembers(data);
        });

      }}>받아오기</button>
      <h1>회원목록</h1>
      <table>
          <thead>
              <tr>
                  <th>번호</th>
                  <th>이름</th>
                  <th>주소</th>
              </tr>
          </thead>
          <tbody>
            {members.map(item=><tr key={item.num}>
              <td>{item.num}</td>
              <td>{item.name}</td>
              <td>{item.addr}</td>
            </tr>)}
          </tbody>
      </table>
  </div>
  );
}

export default App3;




