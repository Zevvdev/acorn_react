import React, { useEffect, useState } from 'react';

function App4() {
  //회원 목록 상태값으로 관리하기
  const [members, setMembers] = useState([]);

  //회원정보를 수정 중인지 여부를 상태값으로 관리하기
  const [editing, setEditing] = useState(false);
  //선택한 회원정보 상태값으로 관리하기
  const [member, setMember] = useState({});

  /*
    useXXX() 형식을 react 에서 자주 사용 => 'hook'이라 부른다.
    hook : react에서 사용하는 유틸리티 개념

    useEffect(()=>{}. [])

    두번째 매개변수에 빈 배열을 전달하면 첫번째 매개변수에 전달한 함수가
    이 component (App4 component) 가 준비가 되었을 때 최초 1번 호출된다.
    무언가 준비할 게 있으면 해당 함수 안에서 준비하면 된다.

  */
  useEffect(()=>{
    //component 가 준비완료되면 api 서버로부터 회원 목록을 받아와서 출력하는 작업을 한다.
    getMembers();
  }, []);

  //회원 목록을 요청해서 상태값을 변경해주는 함수
  const getMembers = ()=>{
    //table에 출력할 회원목록 받아와서 state 변경한다.
    fetch("/api/v1/members")
      .then(res=>res.json())
      .then(data=>{
        //data 는 회원목록이 들어있는 배열
        //spring boot 서버로부터 받아온 데이터로 상태값을 변경하면 ui가 업데이트 된다.
        setMembers(data);
    }); 
  };

  //삭제버튼에 호출되는 함수
  const handleDelete = (num)=>{
    const isDelete = confirm(num+"번 회원을 삭제하시겠습니까?");
    if(isDelete){
      fetch(`/api/v1/members/${num}`,{
          method:"delete"
      })
      .then(res=>res.json())
      .then(data=>{
          //삭제 성공시 여기가 호출됨
          getMembers();
      })
    }
  };

  //이름과 주소를 변경했을 때 실행할 함수
  const handleChange = (e)=>{
    //이벤트가 일어난 요소의 name 속성값 : name="name" or name="addr"
    const name=e.target.name;
    //이벤트가 일어난 요소에 입력한 값 "입력한 문자열"
    const value=e.target.value;
    //상태값 변경하기
    setMember({
      ...member, //기존 object 안에 있는 값 펼쳐놓고
      [name]:value //수정한 내용의 value만 덮어쓰기
    });
  };

  //회원정보 수정 form 에 submit 이벤트가 일어났을 때 실행할 함수
  const handleUpdateSubmit = (e)=>{
    //폼 전송 막기
    e.preventDefault();
    const form=e.target; //수정 form 요소의 참조값
    fetch(form.action, { //action 은 밑 form action="여기"
        method:"put", 
        headers:{"Content-Type":"application/json"}, //json 문자열을 보낸다고 알림
        body:JSON.stringify(member) //상태값으로 관리되는 member object를 json 문자열로 변경
    }) 
      .then(res=>res.json())
      .then(data=>{
        alert(`${data.num}번 회원 정보를 수정했습니다`)
        setEditing(false);
        setMember({
          num:0,name:"",addr:""
        });
        getMembers();
      })

  }

  return (
    <div className="container">     
    
      {editing && 
        <div>
          <h1><span>{member.num}</span>번 회원 수정 양식</h1>
          <form onSubmit={handleUpdateSubmit} action={`/api/v1/members/${member.num}`}>
            <div>
              <label htmlFor="name">이름</label>
              <input onChange={handleChange} type="text" name="name" id="name" value={member.name}/>
            </div>
            <div>
              <label htmlFor="addr">주소</label>
              <input onChange={handleChange} type="text" name="addr" id="addr" value={member.addr}/>
            </div>
            <button type="submit">수정확인</button>
            <button type="reset" onClick={()=>setEditing(false)}>취소</button>
          </form>
        </div>
      } 
      <h1>회원 추가 양식</h1>
      <form action="/api/v1/members" method="post" onSubmit={(e)=>{
        //폼 제출막기
        e.preventDefault();
        //이벤트가 일어난 바로 그 요소(form)
        const form=e.target;
        //폼에 입력한 내용을 담고있는 FormData 객체를 얻어낸다.
        const formData=new FormData(form);
        //폼에 입력한 내용을 object로 변환
        const obj = Object.fromEntries(formData);
        //object를 json 문자열로 변환
        const json=JSON.stringify(obj);
        //fetch() 함수를 이용해서 전송하기
        fetch(form.action, {
          method:form.method, //요청 method
          headers:{"Content-Type":"application/json"}, //요청 header
          body:json //요청 body
        })
        .then(res=>res.json())
        .then(data=>{
          //data는 방금 추가한 회원
          console.log(data);
          getMembers();
        });
      }}>
        <input type="text" name="name" placeholder="이름입력.."/>
        <input type="text" name="addr" placeholder="주소입력.."/>
        <button type="submit">추가</button>
      </form>
      
      <h1>회원목록</h1>
      <table>
          <thead>
              <tr>
                  <th>번호</th>
                  <th>이름</th>
                  <th>주소</th>
                  <th>삭제</th>
              </tr>
          </thead>
          <tbody>
            {members.map(item=><tr key={item.num}>
              <td>{item.num}</td>
              <td>{item.name}</td>
              <td>{item.addr}</td>
              <td>
                <button onClick={()=>{
                  setEditing(true);
                  //수정할 회원 정보 받아와서 상태값 변경한다
                  fetch(`/api/v1/members/${item.num}`)
                    .then(res=>res.json())
                    .then(data=>setMember(data));
                  }}>Edit</button>
              </td>
              <td>
                <button onClick={()=>handleDelete(item.num)}>x</button>
              </td>
            </tr>)}
          </tbody>
      </table>
  </div>
  );
}

export default App4;




