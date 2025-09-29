// src/pages/Board.jsx

import { useEffect, useState } from "react";
import api from "../api";
import ToastEditor from "../components/ToastEditor";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";



function Board() {
  // 자세히 보여줄 글의 번호
  const {num} = useParams();

  // "/board?pageNum=x"에서 pageNum을 추출
  const [params] = useSearchParams();

  // 글 정보를 state로 관리
  const [pageInfo, setPageInfo] = useState({
    list:[],
    pageNum:0,
    startPageNum:0,
    endPageNum:0,
    totalPageCount:0
  });

  // 컴포넌트 활성화 + [params] 변경되는 시점에 회원 목록
  useEffect(()=>{
    // params 정보 얻어오기
    const pageNum = params.get("pageNum");
    const search = params.get("search");
    const keyword = params.get("keyword");
    
    // api 서버에 요청할 query 문자열 
    const qs = new URLSearchParams();
    if(pageNum){
      qs.set("pageNum", pageNum);
    }
    if(keyword){
      qs.set("search", search);
      qs.set("keyword", keyword);
    }
    console.log(qs.toString());

    api.get(`/v1/board?${qs.toString()}`)
    .then(res=>{
      setPageInfo(res.data)
    })
    .catch(err=>{
      console.log(err);
    })
  },[params]);

  
  //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수 
  function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
  }


  // 페이지 번호를 출력할 때 사용하는 숫자를 배열에 미리 준비
  const pageArray = range(pageInfo.startPageNum, pageInfo.endPageNum);
  // 이동을 하기위한 hook
  const navigate = useNavigate();

  // 페이지를 이동하는 함수
    const pageMove = (num)=>{
       
        //현재 URLSearchParams 를 복사하고
        const qs = new URLSearchParams(params);
        // pageNum 만 교체 한다.
        qs.set("pageNum", num);

        navigate(`/board?${qs.toString()}`);
    };
  
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

  // 검색조건과 키워드 상태값으로 관리하기
  const [search, setSearch] = useState({
    search:"title_content",
    keyword:""
  });

  // 검색조건에 변화 생겼을 때
  const handleSearchChange = (e)=>{
    setSearch({
      ...search,
      [e.target.name]:e.target.value
    })
  }

  // 검색 버튼 눌렀을 떄
  const handleSearchClick =()=>{
    // search 상태값 object에 저장된 내용을 query 문자열로 변경
    // {search:"title_content", keyword:"kim"}
    const query = new URLSearchParams(search).toString();
    navigate(`/board?${query}`);
  }

  // 새로고침
  const handleRefreshClick = ()=>{
    setSearch({
      search:"title_content",
      keyword:""
    });
    // 1 page로 이동 
    navigate("/board");
  }

  const getQuery = ()=>{
    let query="";
    if(pageInfo.keyword){
      query=`?serch=${pageInfo.search}&keyword=${pageInfo.keyword}`;
    }
    return query;
  };
    
  return <>
  
    <NavLink to="/board/new">새글 작성</NavLink>
    <h1>게시글 목록입니다.</h1>
    
    <div className="col-md-6 ms-auto">
      <label htmlFor="search">검색조건</label>
    <select onChange={handleSearchChange} value={search.search} name="search" id="search">
      <option value="title_content">제목+내용</option>
      <option value="title">제목</option>
      <option value="content">내용</option>
      <option value="writer">작성자</option>
    </select>
    <input onChange={handleSearchChange} value={search.keyword} type="text" name="keyword" placeholder="검색어를 입력하세요.."/>
    <button onClick={handleSearchClick} className="btn btn-outline-secondary">
      <i className="bi bi-search"></i>
      <span className="visually-hidden">검색</span>
    </button>
    <button onClick={handleRefreshClick} className="btn btn-outline-danger">
      <i className="bi bi-arrow-clockwise"></i>
      <span className="visually-hidden">새로고침</span>
    </button>
    </div>

    { pageInfo.keyword &&
      <p className="alert alert-success">
        <strong>{pageInfo.keyword}</strong>에 대한 검색결과
        <strong>{pageInfo.totalRow}</strong>개        
      </p>}

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
            <td>
              <NavLink to={`/board/${item.num}`}>{item.title}</NavLink>
            </td>
            <td>{item.viewCount}</td>
            <td>{item.createdAt}</td>
          </tr> 
        )}
				
			</tbody>
		</table>

    <Pagination>
      <Pagination.Item
        onClick={()=>pageMove(pageInfo.startPageNum-1)}
        disabled={pageInfo.startPageNum === 1}>Prev</Pagination.Item>
      {
        pageArray.map(num =>
          <Pagination.Item
            onClick={()=>pageMove(num)}
            active={pageInfo.pageNum === num}
            key={num}
          >
            {num}
          </Pagination.Item>
        )
      }
      
      <Pagination.Item
        onClick={()=>pageMove(pageInfo.endPageNum+1)}
        disabled={pageInfo.endPageNum === pageInfo.totalPageCount}
      >
        Next
      </Pagination.Item>
    </Pagination>



	

  </>
}

export default Board;