// src/pages/MemberUpdateForm.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";



function MemberUpdateForm() {

  // "/members/:num/edit" 에서 num 에 전달된 값
  const {num} = useParams();

  const [dto, setDto] = useState({
    // 초기값 설정
    name:"",
    addr:""
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();


  useEffect(()=>{
    axios.get(`/api/v1/members/${num}`)
      .then(res=>setDto(res.data));
  },[]);

  // input 요소에 입력한 값 -> 상태값 반영
  const handleChange = (e)=>{
    setDto({
      ...dto,
      [e.target.name]:e.target.value
    });
  };

  // form 에 submit 이벤트 함수
  const handleSubmit = async(e)=>{
    e.preventDefault();
    // e.target 은 form 요소 / action 속성의 값
    // axios.put("요청 url", object) object 를 전달-> 자동으로json 변경
    try{
      await axios.put(e.target.action, dto);  
      alert("수정했습니다.");
      navigate(`/members/${num}`, {
        state:{message:"수정된 회원정보입니다."}
      });
    }catch(err){
      console.log(err);
      // 필드 에러 객체를 상태값
      setErrors(err.response.data.errors);
    }
  };


  return <>
    <h1>회원 수정 양식</h1>
    <form action={`/api/v2/members/${dto.num}`} onSubmit={handleSubmit}>
      <input type="hidden" />
      <div>
        <label className="form-label" htmlFor="name">이름</label>
        <input className="form-control" onChange={handleChange} name="name" id="name" type="text" value={dto.name}/>
        { errors.name && <p className="form-text text-danger">{errors.name}</p>}
      </div>
      <div>
        <label className="form-label" htmlFor="addr">주소</label>
        <input className="form-control" onChange={handleChange} name="addr" id="addr" type="text" value={dto.addr}/>
        { errors.addr && <p className="form-text text-danger">{errors.addr}</p>}
      </div>
      <Button className="btn btn-success" type="submit">수정</Button>
    </form>

  
  </>
}

export default MemberUpdateForm;