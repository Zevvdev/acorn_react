// src/pages/ClientDetail.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";



function ClientDetail() {

  const {num} = useParams();

  const [dto, setDto] = useState({});

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(()=>{
    
    ( async ()=>{
        try{
          axios.get(`/api/v2/clients/${num}`)
            .then(res=>setDto(res.data));
        }catch(err){
          setErrors(err);
        }

    })();
  },[]);
  
  const handleDelete = ()=>{
    try {
      axios.delete(`/api/v2/clients/${dto.num}`);
      alert("삭제했습니다.");
      navigate("/client");
    } catch (err) {
      console.log(err);
    }
  }

  return <>
    <h1>고객정보</h1>
    
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>번호</th>
          <td>{dto.num}</td>
        </tr>
        <tr>
          <th>이름</th>
          <td>{dto.userName}</td>
        </tr>
        <tr>
          <th>생일</th>
          {/* 생일을 단순히 출력할 때는 formattedBirthday를 출력한다. */}
          <td>{dto.formattedBirthday}</td>
        </tr>
        <tr>
          <th>등록일</th>
          <td>{dto.createdAt}</td>
        </tr>
        <tr>
          <th>수정일</th>
          <td>{dto.updatedAt}</td>
        </tr>

      </thead>
    </table>
    <Button variant="primary" as={NavLink} to="/client">목록</Button>
    <Button variant="primary" as={NavLink} to={`/client/${dto.num}/edit`} className="ms-1">수정</Button>
    <Button variant="warning" onClick={handleDelete} className="ms-1">삭제</Button>
    

  </>
}

export default ClientDetail;