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
  },
  logoutTimer:null
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
  }),
  LOGOUT_TIMER:(state, action)=>({
    ...state,
    logoutTimer:action.payload
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

/*
  개발환경에서는 <StrictMode> 에서 실행이 되는데
  StrictMode는 동작을 엄격하게 검사하기 위해
  Component가 2번씩 초기화된다.
  결과적으로 useEffect() 함수가 두 번 호출된다.
  개발이 끝난 후 실제 build 하면 Component는 1번씩만 초기화된다.
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
