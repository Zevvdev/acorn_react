// src/compmonets/FriendsComponent.jsx

import React from 'react';

//props 에 names라는 키값으로 배열이 전달되어야 정상동작하는 componet
function FriendsComponent(props) {
  return (
  <>
    <h2>친구 목록</h2>
    {props.names.map(item => <li>{item}</li>)}
  
  </>
  );
}

export default FriendsComponent;