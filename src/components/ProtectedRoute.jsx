// src/components/ProtectedRout.jsx


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({children}) {
    //로그인 여부를 알기위해 userInfo 를 얻어낸다.
    const userInfo = useSelector(state=>state.userInfo);
    //현재 경로를 알아내기 위해
    const location=useLocation();
    //action 을 발행하기 위해
    const dispatch=useDispatch();
    //만일 로그인 상태가 아니라면
    if(!userInfo){
        //원래 가려던 목적지 정보와 query 파라미터 정보를 읽어내서 
        const url = location.pathname + location.search;
        //테스트로 출력해보기
        //console.log(url);
        const payload={
            show:true,
            title:"해당 페이지는 로그인이 필요 합니다!"
        }
        //로그인창을 띄우는 action 을 발행하면서 payload 를 전달한다.
        dispatch({type:"LOGIN_MODAL", payload});
        // return null 하면  currentRoute 에 빈 페이지가 출력된다.
        return null;
    }
    // 여기서 children은 <ProtectedRoute> 컴포넌트의(감싸져있는) 자식 컴포넌트를 가리킨다.

    return children;
}

export default ProtectedRoute;

