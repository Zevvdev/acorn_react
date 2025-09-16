// src/App.jsx

import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom';
import Study from './components/Study';
import { useDispatch } from 'react-redux';
import LoginModal from './components/LoginModal';

function App() {
  // React Router v6 에서 제공하는 hook
  // 현재 경로에 맞는 자식 route component 를 반환한다.
  const currentOutlet=useOutlet();

  // App Component에서 관리하는 상태값
  const [fortune, setFortune] = useState("동쪽으로 가면 귀인 만남");

  // action을 dispatch 할 함수 얻어내기
  const dispatch = useDispatch();


  // input 요소의 참조값 사용하기 위해
  const inputRef = useRef();

  return (
    <div className="container">
      <input ref={inputRef} type="text" placeholder='변경할 운세...' />
      <button onClick={()=>{
        // 입력한 문자열
        const inputFortune=inputRef.current.value;
        // action 객체
        const action = {type:"UPDATE_FORTUNE", payload:inputFortune};
        // action 발행하기
        dispatch(action);

      }}>변경하기</button>
      <Study fortune={fortune}/>
      {currentOutlet}
      <LoginModal/>
    </div>
  );
}

export default App;