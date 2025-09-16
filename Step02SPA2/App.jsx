// src/App.jsx


import 'bootstrap/dist/css/bootstrap.css';
// app.module.css를 import해서 styles 라는 이름으로 사용하기
// css 파일명을 xxx.module.css 로 지으면 반드시 어떤 별명으로 import 해서 사용해야 한다.
// 여기서 styles는 object이다.
import styles from './css/app.module.css';
import { NavLink, useOutlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function App() {
  //React Router v6에서 제공하는 hook
  //현재 경로에 맞는 자식 route component를 반환한다
  const currentOutlet = useOutlet();

  // styles object의 구조 확인!
  console.log(styles);

  return <>
    <div className={`mb-3 w-100 ${styles["my-bg"]}`}>
      <Nav className="container nav-fill">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/game">Game</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/study">Study</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/client">Client</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>    
    
    <div className="container">

      {currentOutlet}
      
    </div>

  </>
    
  
}

export default App; 