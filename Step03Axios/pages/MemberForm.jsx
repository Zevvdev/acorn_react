// src/pages/MemberForm.jsx

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'


function MemberForm() {

  //javasript로 라우팅할 수 있는 함수 얻어내기
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  //form에 submit 이벤트가 발생했을 때 실행할 함수
  const handleSubmit = (e)=>{
    //기본동작 막기(form 제출 막기)
    e.preventDefault();
    //이벤트가 발생한 요소의 참조값(form 요소의 참조값)
    const form=e.target;
    //폼에 입력한 내용을 담고 있는 FormData 객체를 얻어낸다.
    const formData=new FormData(form);
    //폼에 입력한 내용을 object 로 변환
    const obj=Object.fromEntries(formData);
    // axios 이용하여 post 방식 요청하기
    axios.post("/api/v2/members", obj)
      .then(res=>{
        //res.data : 방금 추가한 회원의 정보
        console.log(res.data);
        //추가한 회원 자세히 보기로 이동
        navigate(`/members/${res.data.num}`, {state:{message:"새로 추가한 회원정보"}});
      })
      .catch(err => {
        // err : 에러 정보 담고있는 object
        console.log(err);
        // 필드 에러 객체를 상태값에 넣어준다.
        setErrors(err.response.data.errors);
      });
    
  };



  return <>

    <h1>회원 추가 양식</h1>
    <form action="/api/v2/members" method="post" onSubmit={handleSubmit}>
      <div>
        <label className="form-label" htmlFor="name">이름</label>
        <input className="form-control" type="text" name="name" id="name"/>
        {/* 필드 에러객체에 name 에러 정보가 있으면 에러 정보를 출력한다 */}
        { errors.name && <p className="form-text text-danger">{errors.name}</p>}
        
      </div>
      <div>
        <label className="form-label" htmlFor="addr">주소</label>
        <input className="form-control" type="text" name="addr" id="addr"/>
        {/*<small className="form-text text-danger">{errors.addr}</small>*/}
      </div>
      { errors.addr && <p className="form-text text-danger">{errors.addr}</p>}
      <button className="btn btn-primary my-3" type="submit">저장</button>
    </form>
  </>

}

export default MemberForm;