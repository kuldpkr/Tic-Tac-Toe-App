import React from 'react';
import Algo from './Algo';
import TwoPlayer from './TwoPlayer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
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
