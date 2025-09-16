/*
  src/router/index.jsx

  - 파일명을 index.js or index.jsx로 작성하면 외부에서
    router 폴더까지 import 했을 때 자동으로 index.js or index.jsx
    파일에서 export default 된 자원을 사용할 수 있다.

  - index는 약속된 파일명

*/

import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Study from "../pages/Study";
import Client from "../pages/Client";
import ClientForm from "../pages/ClientForm";
import ClientDetail from "../pages/ClientDetail";
import ClientUpdateForm from "../pages/ClientUpdateForm";
import NotFound from "../pages/NotFound";

//페이지 routing 정보를 배열에 미리 저장해둔다.
const routes=[
     // spring boot 서버에 넣어서 실행하면 최초 로딩될때  /index.html 경로로 로딩된다.
    // 그럴때도  Home 컴포넌트가 활성화 될수 있도록 라우트 정보를 추가한다. 
    {path:"/index.html", element: <Home/>},
    {path:"/", element:<Home/>},
    {path:"/game", element:<Game/>},
    {path:"/study", element:<Study/>},
    {path:"/client", element:<Client/>},
    {path:"/client/new", element:<ClientForm/>},
    {path:"/client/:num", element:<ClientDetail/>},
    {path:"/client/:num/edit", element:<ClientUpdateForm/>},
    {Path:"*", element:<NotFound/>}
];

//export 해줄 router 객체를 만든다
const router = createHashRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);

export default router;