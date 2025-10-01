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
  
  // 대댓글이 펼쳐진 상태면 댓글의 그룹번호를 추가하고
  // 대댓글이 숨겨진 상태면 댓글의 그룹번호 제거할 set
  // 초기값은 어떤 번호도 추가되지 않은 상태
  const [openGroups, setOpenGroups] = useState(new Set());
  // 대댓글 폼 펼침 상태관리
  const [openFormGroups, setOpenFormGroups] = useState(new Set());
  // 댓글 수정 폼 상태관리
  const [openUpdateFormGroups, setOpenUpdateFormGroups] = useState(new Set());

  //대댓글 보기 버튼을 눌렀을때 실행할 함수 
  const handleReplyCountBtn =(groupNum) => {
    // 기존 Set 객체를 저장된 내용을 이용해서 새로운 Set 객체 만들기
    const set = new Set(openGroups);
    if(set.has(groupNum)){  // set에 그룹번호가 존재하면
      set.delete(groupNum); // set에서 제거
    }else{                  // set에 그룹번호 없으면
      set.add(groupNum);    // set에 추가
    }
    
    setOpenGroups(set);
  };

  const handleFormToggle = (action, num)=>{
    // 기존 set 를 이용해서 새로운 Set 객체 생성
    const set = new Set(openFormGroups);
    // action 은 "add" or "delete"가 전달될 예정. num은 댓글번호
    set[action](num);
    // 새로운 Set 객체로 상태값을 변경
    setOpenFormGroups(set);
  }

  const handleUpdateFormToggle = (action, num)=>{
    // 기존 Set 이용해서 새로운 Set 객체 생성
    const set = new Set(openUpdateFormGroups);
    // action은 "add" or "delete"가 전달될 예정. num 은 댓글번호
    set[action](num);
    
    setOpenUpdateFormGroups(set);
  }


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
      
      // 만일 대댓글 폼이라면 접는다.
      if(obj.groupNum){
        // submit 이벤트 후 form 요소의 data-num="x" x 값을 읽어오기=string
        console.log(e.target.dataset.num);
        // 대댓글폼에 속해있는 댓글번호
        const num=Number(e.target.dataset.num);
        const set = new Set(openFormGroups);
        set.delete(Number(obj.num));
        setOpenFormGroups(set);
      }
    }catch(err){
      console.log(err);
    }
  }

  // 댓글 삭제 버튼 함수
  const handleDelete = async(num)=>{
    const isDelete = confirm("댓글을 삭제하시겠습니까?");
    try{
      if(isDelete){
        await api.delete(`/v1/comments/${num}`);
        onRefresh();
      }
    }catch(err){
      console.log(err);
    }
  }

  // 댓글 수정폼에 submit 이벤트 발생
  const handleUpdateSubmit = async(e)=>{
    e.preventDefault();
    const form = e.target; // submit event 가 발생한 form 의 참조값
    // 폼에 입력한 내용 -> FormData 객체로 얻어내서
    const formData = new FormData(form);
    // Object로 변환 (axios 로 json 보내려면 obj여야 함)
    const obj = Object.fromEntries(formData);
    
    try{
      await api.patch(`/v1/comments/${obj.num}`, obj);
      // 댓글 목록을 refresh 
      onRefresh();

      // 기존 Set 이용해서 새로운 Set 객체 생성 -> 수정 form 접기
      const set = new Set(openUpdateFormGroups);
      // action은 "add" or "remove"가 전달될 예정. num 은 댓글번호
      // obj.num은 string type => 숫자로 변경 필요
      set.delete(Number(obj.num));
    
      setOpenUpdateFormGroups(set);
      

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
		        <textarea id="commentContent" name="content" rows="5" className="form-control" 
                placeholder={userInfo.userName ? "댓글을 입력하세요" : '댓글 작성을 위해 로그인이 필요합니다.'}
                disabled={userInfo.userName ? false : true }></textarea>
		      </div>
			
		      <button disabled={userInfo.userName ? false : true} type="submit" className="btn btn-success">등록</button>
			</form>
		  </div>
		</div>

    <div className="comments">
      {list.map(item=>{
        // 대댓글인지 여부
        const isReRe = item.num !== item.groupNum
        // 대댓글 isOpen 여부
        const isOpen = openGroups.has(item.groupNum);
        
        return <div key={item.num} className={cn("card", "mb-3", {"ms-5" : isReRe, "d-none": isReRe && !isOpen })}>
          
          {/* 삭제된 댓글 */}
          { item.deleted === 'yes' &&
            <div className="card-body bg-light text-muted rounded">
              삭제된 댓글입니다.
            </div>            
          }
          
          {/* 댓글 - 삭제 안된 */}
          { item.deleted !== 'yes' &&
            <div className="card-body d-flex flex-column flex-sm-row position-relative">
              { item.replyCount !== 0 && !isReRe &&
                <button onClick={()=>handleReplyCountBtn(item.groupNum)} className="dropdown-btn btn btn-outline-secondary btn-sm position-absolute"
		            			style={{bottom:"16px", right:"16px"}}>
		            			<i className={cn("bi",{"bi-caret-down":!isOpen, "bi-caret-up":isOpen})}></i>
		            			답글 {item.replyCount} 개</button>
              }

              { isReRe &&
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
                <button className="btn btn-sm btn-outline-secondary"
                  onClick={()=>handleUpdateFormToggle("add", item.num)}>수정</button>

                <div className={cn({"d-none":!openUpdateFormGroups.has(item.num)})}>
                  <form onSubmit={handleUpdateSubmit} method="patch">
                    <input type="hidden" name="num" value={item.num} />
                    <input type="hidden" name="parentNum" value={parentNum}/>
                      <textarea name="content" className="form-control mb-2" rows="2" placeholder={userInfo.userName ? "댓글을 입력하세요" : '댓글 작성을 위해 로그인이 필요합니다.'}>{item.content}</textarea>
                      <button type="submit" className="btn btn-sm btn-success">수정 완료</button>
                      <button type="reset" className="btn btn-sm btn-secondary"
                          onClick={()=>handleUpdateFormToggle("delete", item.num)}>취소</button>
                  </form>
                </div>
                </>
              }
			        { item.writer !== userInfo.userName &&
              <>
                  <button className="btn btn-sm btn-outline-primary show-reply-btn"
                    onClick={()=>handleFormToggle("add", item.num)}>댓글</button>  
                  <div className={cn({"d-none":!openFormGroups.has(item.num)})}>
                      <form onSubmit={handleSubmit} action="/v1/comments" method="post" data-num={item.num}>
                        <input type="hidden" name="parentNum" value={parentNum}/>
                        <input type="hidden" name="targetWriter" value={item.writer}/>
                        <input type="hidden" name="groupNum" value={item.groupNum}/>
                        <textarea name="content" className="form-control mb-2" rows="2" 
                            placeholder={userInfo.userName ? '댓글을 입력하세요' : '댓글 작성을 위해 로그인이 필요합니다'}
                            disabled={userInfo.userName ? false : true}></textarea>
                        <button disabled={userInfo.userName ? false : true} type="submit" className="btn btn-sm btn-success">등록</button>
                        <button disabled={userInfo.userName ? false : true} type="reset" className="btn btn-sm btn-secondary cancel-reply-btn"
                          onClick={()=>handleFormToggle("delete", item.num)}>취소</button>
                      </form>
                  </div>                     
              </>
              }         
              </div>
            </div>            
          }
        </div>
      })}

    </div>
  </>
}

export default Comment;