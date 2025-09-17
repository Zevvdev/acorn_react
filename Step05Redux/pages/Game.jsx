// src/pages/Game.jsx

import { NavLink } from "react-router-dom";



function Game() {
  return <>
    <h1>Game Page!</h1>
    <p>로그인된 회원만 게임할 수 있다!</p>
    <NavLink to="/">Index</NavLink>
  </>
}

export default Game;