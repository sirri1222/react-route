import React, { useEffect, useState } from "react";

// axios api
import instance from "./api/axios";

import requests from "./api/request";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Members from "./pages/Members";
import SongList from "./pages/SongList";
import Player from "./pages/Player";
import PlayerIndex from "./pages/PlayerIndex";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import react from "react";
const App = () => {
  // 멤버목록 데이터
  // useState 는 state 가 변경되면 실행된느 Hook이다
  // useState() 를 실행하면 [] 리턴이되낟
  // 배열은  [state, state업데이트 함수] 돌려 받는다
  // 배열은  [getter, setter업데이트 함수] 돌려 받는다
  // useStaed(초기값) 초기값이라함은 state의 초기값
  const [members, setMembers] = useState([]);

  // 플레이 리스트 State
  // 화면을 Re-Render 할 수있는 조건은 state / props 변경
  const [songs, setSongs] = useState([]);
  // 외부데이터 가져오기
  const fetchData = async () => {
    // 맴버 목록 가져오기
    const resultMember = await instance.get(requests.fetchMember);
    setMembers(resultMember.data); 
    // 맴버 목록 가져오기
    const resultSong = await instance.get(requests.fetchSong);
    setSongs(resultSong.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          {/* <Route path="개발자가 설정한 URL"/> */}

          <Route path="/" element={<Navigate to="/home"/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About title="인디밴드" />} />
          <Route path="/members" element={<Members members={members} />} />
          <Route path="/songs" element={<SongList songs={songs} />}>
            <Route index element={<PlayerIndex />} />
            <Route path=":id" element={<Player songs={songs} />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
