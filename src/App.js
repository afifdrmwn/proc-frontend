import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './component/Home';
import Adjust from './component/Adjust';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pt" element={<Adjust />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;