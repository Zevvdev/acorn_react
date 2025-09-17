// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//SPA 를 구현하기 위한 RouterProvider를 import
import { RouterProvider} from 'react-router-dom'
import router from './router'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux';



//routing 정보를 담고있는 router import

// redux store 에서 관리될 state 의 초기값
const initState={
  userInfo:null,
  loginModal:{
    title:null,
    show:false
  }
};

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
const reducer = (state=initState, action)=>{
  // 전달된 action을 수행할 handler 함수를 얻어낸다.
  const handler = handlers[action.type];
  // handler 함수가 존재한다면 handler 함수가 리턴하는 state 를 리턴하고
  // 아니면 원래 state를 리턴한다.
  return handler ? handler(state, action) : state;
}

// 위에서 만든 reducer 함수를 사용하는 redux store(중앙 저장소) 만들기
const store = createStore(reducer);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}/>
    <RouterProvider router={router}/>
  </StrictMode>
)
