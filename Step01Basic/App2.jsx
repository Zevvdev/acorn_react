// src/App3.jsx

import { useState } from "react";

export default function App3(){
  const foods = [
    <li>김밥</li>,
    <li>라면</li>,
    <li>떡볶이</li>
  ];

  //배열에 들어있는 String 이용해서
  const data = ["java", "jsp", "spring"]
  //li 요소 여러개 들어있는 jsx 배열 만들어 아래에서 랜더링하기
  const programming = data.map(item=><li>{item}</li>);

  //상태값을 이용해서 랜더링 해보기
  const [state, setState] = useState([]);

  return (
      <div className="container">

        <h1>음식</h1>
        <ul>
          {foods}
        </ul>

        <h1>교육과정1</h1>
        <ul>
          {data.map(item=><li>{item}</li>)}
        </ul>

        <h1>교육과정2</h1>
        <button onClick={()=>{
          //원래는 빈 배열[] 이었는데 새로운 배열로 상태값 변경하기
          setState(data);
        }}>출력하기</button>
        <ul>
          {state.map(item=><li>{item}</li>)}
        </ul>
      </div>
  )
}