// src/pages/ClientEdit.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";



function ClientUpdateForm() {

  const {num} = useParams();

  const [dto, setDto] = useState({
    userName:"",
    birthday:""
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(()=>{
    try{
      axios.get(`/api/v2/clients/${num}`)
      .then(res=>setDto(res.data));
    }catch(err){
      console.log(err);
    }
    
      
  },[]);

  const handleChange = (e)=>{
    setDto({
      ...dto,
      [e.target.name]:e.target.value
    });
  };


  const handleSubmit = async(e)=>{

    e.preventDefault();

    const form = e.target;
    const formData=new FormData(form);
    const obj=Object.fromEntries(formData);

    try{
      await axios.put(form.action, obj);
      navigate(`/client/${num}`, {
        state:{message:"수정된 회원정보입니다."}
      });
      alert("수정 완료되었습니다.");
    }catch(err){
      console.log(err);
      setErrors(err.response.data.errors);
    };
  };

  return <>
    <h1>고객 정보 수정 양식</h1>

    <form action={`/api/v2/clients/${num}`} onSubmit={handleSubmit}>
    <input type="hidden" />
      <div>
        <label className="form-label" htmlFor="userName">userName</label>
        <input className="form-control" onChange={handleChange} name="userName" id="userName" value={dto.userName} type="text" />
        {errors.userName && <p className="form-text text-danger">{errors.userName}</p>}
      </div>
      <div>
        <label className="form-label" htmlFor="birthday">birthday</label>
        <input className="form-control" onChange={handleChange} name="birthday" id="birthday" value={dto.birthday} type="date" />
        {errors.birthday && <p className="form-text text-danger">{errors.birthday}</p>}
      </div>
      <Button type="submit" className="btn btn-success">수정</Button>
      <Button type="reset" className="ms-1 btn btn-secondary" onClick={()=>navigate(`/client/${num}`)}>취소</Button>
    </form>
    
  </>
}

export default ClientUpdateForm;