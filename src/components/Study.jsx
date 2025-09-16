// src/components/Study.jsx

import StudyChild from "./StudyChild";


function Study(props) {
  return <div>
    <h3>Study 컴포넌트</h3>
    {/* 
        porops.fortune 이 가능하려면
        부모 component가 
        <Study fortune={운세}/> 와 같이 props로 전달을 해줘야한다.
    */}
    <StudyChild fortune={props.fortune}/>
  </div>
}

export default Study;