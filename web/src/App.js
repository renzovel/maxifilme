import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Usuarios from './componentes/Usuarios';
import Filmes from './componentes/Filmes';



import Login from './componentes/Login';
import Painel from './componentes/Painel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<Painel render={<Usuarios />} />} path="/Painel" />
        <Route element={<Painel render={<Usuarios />} />} path="/Usuarios" />
        <Route element={<Painel render={<Filmes />} />} path="/Filmes" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
