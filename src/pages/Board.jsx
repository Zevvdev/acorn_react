// src/pages/Board.jsx

import { useEffect, useState } from "react";
import api from "../api";
import ToastEditor from "../components/ToastEditor";
import { NavLink } from "react-router-dom";



function Board() {
  // 글 정보를 state로 관리
  const [pageInfo, setPageInfo] = useState({
    list:[]
  });

  // 컴포넌트 활성화되는 시점에 page 정보 얻어오기
  useEffect(()=>{
    api.get("/v1/board")
    .then(res=>{
      setPageInfo(res.data);
    })
    .catch(err=>{
      console.log(err);
    });
  },[]);
    
  return <>
  
    <h1>게시글 목록입니다.</h1>
    <NavLink to="/board/new">새글 작성</NavLink>
    <table className="table table-bordered">
			<thead>
				<tr>
					<th>글번호</th>
					<th>작성자</th>
				 	<th>제목</th>
					<th>조회수</th>
					<th>작성일</th>
				</tr>
			</thead>
			<tbody>
        {pageInfo.list?.map(item =>
          <tr key={item.num}>
            <td>{item.num}</td>
            <td>{item.writer}</td>
            <td>{item.title}</td>
            <td>{item.viewCount}</td>
            <td>{item.createdAt}</td>
          </tr> 
        )}
				
			</tbody>
		</table>
		<ToastEditor/>

  </>
}

export default Board;