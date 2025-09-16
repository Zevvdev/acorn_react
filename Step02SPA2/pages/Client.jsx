// src/pages/Client.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";





function Client() {

  const [list, setList] = useState([]);

  useEffect(()=>{
    axios.get("/api/v2/clients")
      .then(res=>{
        setList(res.data);
      })
  },[]);



  return <>
    
    
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1>고객 목록</h1>
      <Button as={NavLink} to="/client/new" className="btn btn-primary">회원추가</Button>
    </div>
    
    
    <table className="table table-striped">
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>생일</th>
          <th>등록일</th>
          <th>자세히</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item=>
          <tr key={item.num}>
          <td>{item.num}</td>
          <td>{item.userName}</td>
          <td>{new Date(item.birthday).toLocaleDateString()}</td>
          <td>{item.createdAt}</td>

          <td><Button as={NavLink} to={`/client/${item.num}`}>보기</Button></td>
          </tr>
        )}
        
      </tbody>
    </table>
    
  </>
}

export default Client;