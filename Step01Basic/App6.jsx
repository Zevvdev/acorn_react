// src/App6.jsx

import React from 'react';
import FriendsComponent from './components/FriendsComponent';

function App6() {
  const names=["김구라", "해골", "원숭이"]
  return (
    <div className="container">
      <FriendsComponent names={names}/>      
    </div>
  );
}

export default App6;