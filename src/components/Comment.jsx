// src/components/Comment.jsx

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../api";
import cn from 'classnames';
import { useSelector } from "react-redux";



function Comment( { category, parentNum, parentWriter, list, onRefresh } ) {

  // redux store 로부터 로그인 정보를 얻어낸다.
  let userInfo = useSelector(state=>state.userInfo);

  // 만일 로그인 X userInfo = null -> error
  // 빈 object 넣어주기
  if(!userInfo)userInfo={};

  // const [commentList, setCommentList] = useState([]);
  // const {writer} = useParams();
  // // const [params] = useSearchParams();
  
  // useEffect(()=>{
  //   api.get(`/v1/board/${num}/comments`)
  //   .then(res => setCommentList(res.data))
  //   .catch(err => console.log(err));
  // },[])

  //대댓글 보기 버튼을 눌렀을때 실행할 함수 
  const handleReplyCountBtn = (e)=>{
    //click 이벤트가 발생한 버튼의 참조값
    const item=e.target;
    //click 이벤트가 발생한 그 버튼의 자손요소 중에서 caret up 또는 caret down 요소를 찾는다
    const caret = item.querySelector(".bi-caret-up, .bi-caret-down");
    // caret 모양을 위 아래로 토글 시킨다 	
    caret.classList.toggle("bi-caret-down");
    caret.classList.toggle("bi-caret-up");
    
    // 1. 버튼(item)의 두 단계 부모 요소로 이동
    const grandParent = item.parentElement.parentElement;
    // 2. 두단계 부모요소의 바로 다음 형제 요소의 참조값을 얻어낸다 
    let next = grandParent.nextElementSibling;
    // 3. 반복문 돌면서 (다음 형제 요소가 있는 동안에 반복문 돌기)
    while (next) {
      //만일 re-re 클래스가 존재한다면 
      if (next.classList.contains("re-re")) {
          // d-none 클래스를 토글시켜서 보였다 숨겼다를 반복 시킨다
          next.classList.toggle("d-none");
      }else{//존재하지 않으면 
          //반복문 탈출 
          break;
      }
      //다음 형제 요소의 참조값 얻어내기  
      next = next.nextElementSibling;
    }
  };

  // 댓글 등록 버튼
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const form = e.target; // submit event 가 발생한 form 의 참조값
    // 폼에 입력한 내용 -> FormData 객체로 얻어내서
    const formData = new FormData(form);
    // Object로 변환 (axios 로 json 보내려면 obj여야 함)
    const obj = Object.fromEntries(formData);
    try{
      await api.post("/v1/comments", obj);
      // 댓글 목록을 refresh 
      onRefresh();
    }catch(err){
      console.log(err);
    }
    

  }

  return <>

    <div className="card my-3">
		<div className="card-header bg-primary text-white">
		    댓글을 입력해 주세요
		</div>

			<div className="card-body">
		    <form action="/v1/comments" method="post" onSubmit={handleSubmit}>
		      <input type="hidden" name="parentNum" value={parentNum}/>
		      <input type="hidden" name="targetWriter" value={parentWriter} />
		
		      <div className="mb-3">
		        <label htmlFor="commentContent" className="form-label">댓글 내용</label>
		        <textarea id="commentContent" name="content" rows="5" className="form-control" placeholder={userInfo.userName ? "댓글을 입력하세요" : '댓글 작성을 위해 로그인이 필요합니다.'}></textarea>
		      </div>
			
		      <button disabled={userInfo.userName ? false : true} type="submit" className="btn btn-success">등록</button>
			</form>
		  </div>
		</div>

    <div className="comments">
      {list.map(item=>
        <div key={item.num} className={cn("card", "mb-3", {"ms-5 re-re d-none": item.num !== item.groupNum})}>
          
          {/* 삭제된 댓글 */}
          { item.deleted === 'yes' &&
            <div className="card-body bg-light text-muted rounded">
              삭제된 댓글입니다.
            </div>            
          }
          
          {/* 댓글 - 삭제 안된 */}
          { item.deleted !== 'yes' &&
            <div className="card-body d-flex flex-column flex-sm-row position-relative">
              { item.replyCount !== 0 && item.num === item.groupNum &&
                <button className="dropdown-btn btn btn-outline-secondary btn-sm position-absolute"
		            			style={{bottom:"16px", right:"16px"}}>
		            			<i className="bi bi-caret-down"></i>
		            			답글 {item.replyCount} 개</button>
              }

              { item.num !== item.groupNum &&
                <i className="bi bi-arrow-return-right position-absolute" 
                  style={{top:"0", left:"-30px"}}/> }

              { item.writer === userInfo.userName &&
                <button data-num={item.num}
                  className="btn-close position-absolute top-0 end-0 m-2"></button>
              }

              {/* profile */}
              { item.profileImage === null ? 
                <i style={{fontSize:"50px"}} className="bi me-3 align-self-center bi-person-circle"></i>
                :
                <img src={`/upload/${item.profileImage}`} 
                  alt="프로필 이미지" 
                  className="rounded-circle me-3 align-self-center"
                  style={{width:"50px", height:"50px"}}/>
              }

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <div>
                      <strong>{item.writer}</strong>
                      <span>@{item.targetWriter}</span>
                      <small className="text-muted">{item.createdAt}</small>
                  </div>                  
                </div>

              
              
              {/* content */}
              <pre>{item.content}</pre>
              { item.writer === userInfo.userName &&
              <>
                <button className="btn btn-sm btn-outline-secondary edit-btn">수정</button>

                <div className="d-none form-div">
                  <form action="" method="post">
                    <input type="hidden" name="num" value={item.num} />
                    <input type="hidden" name="parentNum" value={parentNum}/>
                      <textarea name="content" className="form-control mb-2" rows="2" placeholder={userInfo.userName ? "댓글을 입력하세요" : '댓글 작성을 위해 로그인이 필요합니다.'}>{item.content}</textarea>
                      <button type="submit" className="btn btn-sm btn-success">수정 완료</button>
                      <button type="reset" className="btn btn-sm btn-secondary cancel-edit-btn">취소</button>
                  </form>
                </div>
                </>
              }
			        { item.writer !== userInfo.userName &&
              <>
                  <button className="btn btn-sm btn-outline-primary show-reply-btn">댓글</button>  
                  <div className="d-none form-div">
                      <form action="" method="post">
                          <input type="hidden" name="parentNum" value={parentNum}/>
                          <input type="hidden" name="targetWriter" value={item.writer}/>
                          <input type="hidden" name="groupNum" value={item.groupNum}/>
                          <textarea name="content" className="form-control mb-2" rows="2" 
                              placeholder="댓글을 입력하세요..."></textarea>
                          <button type="submit" className="btn btn-sm btn-success">등록</button>
                          <button type="reset" className="btn btn-sm btn-secondary cancel-reply-btn">취소</button>
                      </form>
                  </div>                     
              </>
              }         
              </div>
            </div>            
          }
        </div>
      )}

    </div>
  </>
}

export default Comment;