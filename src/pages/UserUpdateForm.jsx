// src/pages/UserUpdateForm.jsx

import { useEffect, useRef, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";



function UserUpdateForm() {

  const personRef = useRef();
  const personStyle = {
    width:"100px",
    height:"100px",
    display:"none"
  };

  const [dto, setDto]= useState({
    userName:"",
    email:"",
    profileImage:""
  });

  // 이미지 데이터를 상태값으로 관리
  const [imageUrl, setImageUrl] = useState({
    original:"",
    current:""
  });

  // 가입정보를 요청을 통해서 받아온다.
  useEffect(()=>{
    api.get("/v1/user")
    .then(res=>{
      setDto(res.data);
      // 만일 등록된 프사가 있다면
      if(res.data.profileImage){
        const url = `/upload/${res.data.profileImage}`;
        setImageUrl({original:url, current:url});
      }else{ // 없으면 svg를 디코딩한 data url을 넣어준다.
        // svg 이미지를 2 진 데이터 문자열로 읽어들여서 
        const svgString=new XMLSerializer().serializeToString(personRef.current)
        // 2진데이터 문자열을 btoa (binary to ascii) 함수를 이용해서 ascii 코드로 변경
        const encodedData = btoa(svgString)
        // 변경된 ascii 코드를 이용해서 dataUrl 을 구성한다 
        const url = "data:image/svg+xml;base64," + encodedData;
        setImageUrl({original:url, current:url});
      }
    })
    .catch(err=>console.log(err));
  },[]);

  // input type="file" 요소의 참조값을 얻어내기 위해
  const inputRef = useRef();
  // 이미지 링크를 클릭했을 때 실행할 함수
  const handleClick = ()=>{
    // input type="file"을 강제 클릭
    inputRef.current.click();
  };

  // 파일을 변경했을 때
  const handleImageChange = (e)=>{
    // 선택한 파일 객체
    const file = e.target.files[0];
    // FileReader 객체로 읽어들이기
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event)=>{
      // 선택한 이미지 파일을 data url로 읽은 데이터
      const data=event.target.result;
      setImageUrl({
        ...imageUrl,
        current:data
      });
    }
  };

  // 취소 버튼
  const handleReset = ()=>{
    setImageUrl({
      ...imageUrl,
      current:imageUrl.original // 최초의 이미지 출력할 수 있도록
    })
  }
  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    // 폼에 입력한 내용을 이용해서 FormData 객체를 생성한다.
    const formData = new FormData(e.target);
    try{
      const res = await api.patch("/v1/user", formData, {
        headers:{"Content-Type":"multipart/form-data"}
      });
      alert("가입정보가 성공");
      navigate("/user");
    }catch(err){
      console.log(err);
    }
  }

  return<>
    {/* 사람 모양의 svg(vector 이미지) */}
    <svg ref={personRef} style={personStyle} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
    </svg>
    <h1>회원정보 수정 양식</h1>
    <form action="" onSubmit={handleSubmit} method="post"
			enctype="multipart/form-data" className="p-4 border rounded shadow-sm bg-light">
			
      <div>
				<label htmlFor="userName" className="form-label">아이디</label>
				<input className="form-control" type="text" name="userName" id="userName" value={dto.userName} readOnly />
			</div>

			<div>
				<label className="form-label" htmlFor="email">이메일</label>
				<input className="form-control" type="text" name="email" id="email" 
            defaultValue={dto.email} placeholder="이메일을 입력하세요"/>
			</div>

			<div>
				<label className="form-label d-block">프로필 이미지</label>
				<div className="text-center mb-2">
					<a href="javascript:" id="profileLink" onClick={handleClick}>
						
						{ imageUrl.current && <img src={imageUrl.current}
							className="rounded-circle border"
							style={{width:"100px",height:"100px",objectFit:"cover"}} /> }
					
					</a>
				</div>
				<input ref={inputRef} onChange={handleImageChange} type="file" 
					className="form-control d-none" 
					name="profileFile" accept="image/*" />
				<div className="form-text">클릭해서 프로필 이미지를 변경하세요.</div>
			</div>

			<div className="d-flex justify-content-between">
				<button type="submit" className="btn btn-primary">수정 확인</button>
				<button onClick={handleReset} type="reset" className="btn btn-outline-secondary">취소</button>
			</div>
			
		</form>
  
  </>
}

export default UserUpdateForm;