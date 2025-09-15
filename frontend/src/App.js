import { useEffect } from 'react';
import './App.css';
import Home from './components/Home/Home.jsx';
import Layout from './components/layout/layout.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = "Prem Team";
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
