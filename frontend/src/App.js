import { useEffect } from 'react';
import './App.css';
import Home from './components/Home/Home.jsx';
import Layout from './components/layout/layout.jsx';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search/Search.jsx';

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
