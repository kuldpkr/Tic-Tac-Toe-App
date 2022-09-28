import React from 'react';
import Algo from './Algo';
import TwoPlayer from './TwoPlayer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <h1 style={{fontSize: '3em', marginBottom: '0px'}}>Tic Tac Toe</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TwoPlayer />} />
          <Route path="/algo" element={<Algo/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
} 

export default App;
