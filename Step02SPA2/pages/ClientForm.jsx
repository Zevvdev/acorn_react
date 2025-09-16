// src/pages/ClientForm.jsx

import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";




function ClientForm() {

  const [client, setClient] = useState({});

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();

    // 폼에 입력한 내용을 FormData 객체에 답고 object로 변환
    const formData=new FormData(e.target);
    const obj = Object.fromEntries(formData);

    // post 요청
    axios.post("/api/v2/clients", obj)
      .then(res=>{
        navigate(`/client/${res.data.num}`, {state:{message:"새로 추가한 고객 정보"}});
        })
      .catch(err=>{
        console.log(err);
        setErrors(err.response.data.errors);
        });

  };


  return <>
    <h1>회원추가양식</h1>

    <form action="/api/v2/clients" method="post" onSubmit={handleSubmit}>
      <div>
        <label className="form-label" htmlFor="userName">userName</label>
        <input className="form-control" name="userName" id="userName" placeholder="이름을 입력하세요.." type="text" />
        {errors.userName && <p className="form-text text-danger">{errors.userName}</p>}
      </div>
      <div>
        <label className="form-label" htmlFor="birthday">birthday</label>
        <input className="form-control" name="birthday" id="birthday" type="date" />
      </div>
      <Button type="submit">저장</Button>
    </form>
  </>
}

export default ClientForm;