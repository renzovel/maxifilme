import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Usuarios from './componentes/Usuarios';
import Filmes from './componentes/Filmes';
import './asset/css/App.css';



import Login from './componentes/Login';
import Painel from './componentes/Painel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<Login />} path="/" />
        <Route element={<Painel render={<Filmes />} />} path="/Painel" />
        <Route element={<Painel render={<Usuarios />} />} path="/Usuarios" />
        <Route element={<Painel render={<Filmes />} />} path="/Filmes" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
