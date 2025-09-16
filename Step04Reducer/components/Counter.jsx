// src/components/counter.jsx

import { useReducer, useState } from "react";

// 리듀서 함수(차원을 감소시켜서 새로운 상태값을 리턴하는 함수)
// state:현재 상태, action:동작을 담고 있는 object (지금은 string이지만 object로 변겨할 예정)
const reducer = (state, action)=>{
  // 새로운 상태값을 담을 변수
  let newState;
  // action 값에 따라 분기
  if(action === "minus"){
    newState={
      ...state,
      count:state.count-1
    }
  }else if(action === "plus"){
    newState={
      ...state,
      count:state.count+1
    }
  }else{
    newState=state;
  }
  // 새로운 상태값 리턴
  return newState;
}

function Counter() {
  
  /*
      useReducer(리듀서함수, 초기 state) 형식으로 호출하면 배열이 리턴되는데
      배열의 0번방에는 state 값, 1번방에는 상태값을 변경할 때 호출할 함수가 들어있다.

      상태값을 변경할 때 action을 발행(dispatch)하는 구조로 상태값을 변경한다.
  */

  const [state,dispatch] = useReducer(reducer, {
    userName:"김구라",
    email:"aaa@",
    count:0
  })

  return <>
    <button onClick={()=>{
      dispatch("minus");
    }}>-</button>
    <strong className="p-3">{state.count}</strong>
    <button onClick={()=>{
      dispatch("plus");      
    }}>+</button>
  </>
}

export default Counter;