// src/pages/BoardForm.jsx

import ToastUIEditor from "@toast-ui/editor";
import { useState } from "react";
import ToastEditor from "../components/ToastEditor";
import api from "../api";
import { useNavigate } from "react-router-dom";



function BoardForm() {

  const [state, setState] = useState({
    title:"",
    content:""
  });

  // 제목을 수정했을 때 
  const handleTitleChange = (e)=>{
    // 함수형 setState를 이용해서 상태값 변경
    setState(prev => ({
      ...prev,
      title:e.target.value
    }));
  }

  // 내용을 작성했을 때 (작성한 내용을 함수의 매개변수에 전달받도록)
  const handleContentChange = (content)=>{
    setState(prev => ({
      ...prev,
      content
    }));
  }

  const navigate = useNavigate();

  // 폼 제출 버튼
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await api.post("/v1/board", state);
      alert("글을 저장했습니다.");
      // 글 자세히 보기로 이동
      navigate(`/board`); // /${res.num}
    }catch(err){
      console.log(err);
    }
    
  }

  return <>
  <h1>게시글 작성 양식</h1>
  <form onSubmit={handleSubmit} action="/v1/board" method="post">
    <div className="mb-2">
      <label htmlFor="title" className="form-label">제목</label>
      <input onChange={handleTitleChange} className="form-control" id="title" type="text"/>
    </div>
    <div className="mb-2">
      <label htmlFor="editor" className="form-label">내용</label>
      <ToastEditor onChange={handleContentChange}/>
    </div>
    <button className="btn btn-success btn-sm" type="submit">저장</button>
  </form>
  </>
}

export default BoardForm;