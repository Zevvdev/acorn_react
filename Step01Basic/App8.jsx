// src/App8.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

function App8() {

      //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수를 만들어 두고 활용하자 
    function range(start, end){
        const result=[];
        for(let i=start; i<=end ;i++){
            result.push(i);
        }
        return result;
    }

  //API 서버로부터 받아온 페이지 정보라고 가정하자
  const pageInfo = {
    startPageNum:1,
    endPageNum:10,
    totalPageCount:13,
    pageNum:3,
    list:[] //글목록
  };
  
  //페이지를 출력할 배열
  const pageArray=range(pageInfo.startPageNum, pageInfo.endPageNum);

  return (
    <div className="container">
      <h1>페이징처리</h1>
      <ul className="pagination">
        <li className={`page-item ${pageInfo.startPageNum === 1 ? 'disabled' : ''}`}>
          <a href="#" className="page-link">Prev</a>
        </li>
        {pageArray.map(num =>
          <li className={`page-item ${pageInfo.pageNum === num ? 'active' : ''}`}>
            <a className="page-link" href="#">{num}</a>
          </li>
        )}
        <li className={`page-item ${pageInfo.totalPageCount > pageInfo.endPageNum ? '' : 'disabled'}`}>
          <a className="page-link" href="#">Next</a>
        </li>
      </ul>


      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">Prev</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">1</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">2</a>
        </li>
        <li className="page-item">
          <a className="page-link active" href="#">3</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">Next</a>
        </li>

      </ul>
    </div>
  );
}

export default App8;