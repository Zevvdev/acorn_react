// src/pages/MemberDetail.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";



function MemberDetail() {
  // location은 object 인데 location 객체가 가지고 있는 정보를 확인할 수 있다.
  // const location = useLocation();

  //location 객체에서 state 정보만 얻어낸다 (null 일 수도)
  const {state} = useLocation();

  // ui에 출력할 회원정보 state 값으로 관리
  const [dto, setDto] = useState({});
  
  // 경로 변수에 있는 값 얻어내기
  const {num} = useParams();

  const navigate = useNavigate();

  // 컴포넌트가 활성화되는 시점에 자세히 보여줄 회원정보를 api로부터 얻어내기
  useEffect(()=>{

    /*
    아래 구조가 3개 반복되면 몇 번째가 먼저 응답될 지 모름.
    axios.get(`/api/v1/members/${num}`)
      .then(res=>setDto(res.data))
      .then(err=>console.log(err));
    */

    // 비동기로 동작하는 함수를 만들어서 바로 호출하기 -- 순차적으로 할 때 활용
    // 함수 안에 await 있으면 해당 함수에는 반드시 async 를 붙여줘야한다.
    ( async ()=>{
        try{
           // await 뒤의 promise 가 응답(해결)될 때까지 기다림
          // 그 후 res 에 응답객체 대입됨
          const res = await axios.get(`/api/v1/members/${num}`);

          // 상태값 변경
          setDto(res.data);

        }catch (err) {
          console.log(err);
        }

    })();

  }, []);

  // 함수 내부에 await 있기 땜문에 async 예약어를 함수에 붙여준다.
  const handleDelete = async() => {
    try{
      //axios 를 이용해서 삭제 요청
      axios.delete(`/api/v1/members/${dto.num}`);
      alert("삭제했습니다.");
      navigate("/members");
    }catch(err){
      console.log(err);
    }
    

  }

  return <>
  { state && <Alert className="mt-3" variant="info">{state.message}</Alert>}
    <h1>회원 자세히 보기</h1>
    <p>번호 : <strong>{dto.num}</strong></p>
    <p>이름 : <strong>{dto.name}</strong></p>
    <p>주소 : <strong>{dto.addr}</strong></p>
    <Button variant="primary" as={NavLink} to={`/members/${dto.num}/edit`}>수정</Button>
    <Button variant="danger" onClick={handleDelete}>삭제</Button>
  </>
}

export default MemberDetail;