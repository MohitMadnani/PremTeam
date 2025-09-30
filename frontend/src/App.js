import { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Layout from './components/layout/layout.jsx';
import Search from './components/Search/Search.jsx';
import Team from './components/Teams/Team.jsx';
import TeamData from './components/TeamData/TeamData.jsx';
import Nation from './components/Nations/Nation.jsx'
import Position from "./components/Position/Position.jsx";

function App() {
  useEffect(() => {
    document.title = "Prem Team";
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/data" element={<TeamData />} />
          <Route path="/nations" element={<Nation />} />
          <Route path="/positions" element={<Position />} />
          <Route path="/teamdata" element={<TeamData />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
