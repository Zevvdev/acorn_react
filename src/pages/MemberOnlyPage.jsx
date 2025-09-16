// pages/MemberOnlyPage.jsx

import { useSelector } from "react-redux";



function MemberOnlyPage() {

  const userInfo=useSelector(state=>state.userInfo);

  return <>
    <h1>로그인 된 회원 전용 페이지</h1>
    <p>
      <strong>{userInfo.userName}</strong>님 반갑습니다.
    </p>
    <p>어쩌구 저쩌구...</p>
  </>
}

export default MemberOnlyPage;