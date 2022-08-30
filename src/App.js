import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Home from './component/Home';
import Adjust from './component/Adjust';
import List from './component/pages/List';
import Create from './component/pages/Create';
import Edit from './component/pages/Edit';
import Show from './component/pages/Show';
import Login from './component/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="pt" element={<Adjust />}/> */}
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />}/>
          <Route path="/edit" element={<Edit />}/>
          <Route path="/show/:id" element={<Show />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;