// src/components/StudyChild.jsx

import React from 'react';
import { useSelector } from 'react-redux';

function StudyChild(props) {

  //redux store로부터 필요한 상태값을 useSelector() hook를 이용해서 얻어낸다.

  const fortuneToday = useSelector(state=>{
    //state는 redux store에서 관리하는 상태값이다.
    //필요한 상태값만 선택적으로 리턴할 수 있다.
    //여기서 리턴한 값이 useSelector() 함수의 리턴값이 된다.
    //해당 상태값이 변화가 생기면 이 컴포넌트(StudyChild)가 다시 랜더링되면서
    //새로운 상태값이 리턴된다. 
    return state.fortuneToday;
  });

  return <>
    <p>오늘의 운세 : <strong>{props.fortune}</strong> </p>
    <p>오늘의 운세 : <strong>{fortuneToday}</strong> </p>
  </>
}

export default StudyChild;