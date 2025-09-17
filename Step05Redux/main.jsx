// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// SPA 를 구현하기 위한 RouterProvider 를 import
import { RouterProvider } from 'react-router-dom'
// routing 정보를 담고 있는 router import
import router from './router'

// legacy_createStore 를 createStore 라는 이름으로 사용하기(store를 만들 함수)
// from 'redux'가 가능하려면 npm install react-redux/redux를 설치해야한다.
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux'

// redux store 에서 관리될 state 의 초기값
const initState={
  fortuneToday: "동쪽으로 가면 귀인을 만나요.",
  userInfo:null,
  loginModal:{
    title:null,
    show:false
  }
};

// reducer 함수
const reducer = (state=initState, action)=>{
  let newState;

  if(action.type === "UPDATE_FORTUNE"){ //운세를 변경하는 action type
    newState={
      ...state, // 기존 상태값 펼쳐놓고
      fortuneToday:action.payload // action의 payload로 전달된 운세로 변경
    };
  }else if(action.type === "LOGIN_MODAL"){ //로그인 모달의 상태를 변경하는 action type
    newState={
      ...state,
      loginModal:action.payload
    }
  }else if(action.type === "USER_INFO"){
    newState={
      ...state,
      userInfo:action.payload
    }
  }else{
    newState=state;
  }
  return newState;

}

// reducer 함수에서 사용할 handler object
const handlers = {
  UPDATE_FORTUNE:(state, action)=>({
    ...state,
    fortuneToday:action.payload
  }),
  LOGIN_MODAL:(state, action)=>({
    ...state,
    loginModal:action.payload
  }),
  USER_INFO:(state, action)=>({
    ...state,
    userInfo:action.payload
  })
};

// handler object 를 사용하는 새로운 reducer 함수
const reducer2 = (state=initState, action)=>{
  // 전달된 action을 수행할 handler 함수를 얻어낸다.
  const handler = handlers[action.type];
  // handler 함수가 존재한다면 handler 함수가 리턴하는 state 를 리턴하고
  // 아니면 원래 state를 리턴한다.
  return handler ? handler(state, action) : state;
}

// 위에서 만든 reducer 함수를 사용하는 redux store(중앙 저장소) 만들기
const store = createStore(reducer2);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* redux store 가 동작하도록 Provider 컴포넌트로 감싸준다. */}
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
