import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home page';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
