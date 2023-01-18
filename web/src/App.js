import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";


import Login from './componentes/Login';
import Painel from './componentes/Painel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<Painel />} path="/Painel" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
