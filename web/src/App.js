import React, {useState} from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from './Auth/RequireAuth';
import Filmes from './componentes/Filmes';
import './asset/css/App.css';



import Login from './componentes/Login';
import Painel from './componentes/Painel';
import CreateFilme from './componentes/CreateFilme';

function App(props) {
  return (
    
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<RequireAuth><Painel><Filmes /></Painel></RequireAuth>} path="/Painel" />
        <Route element={<RequireAuth><Painel><Filmes /></Painel></RequireAuth>} path="/Filmes" />
        <Route element={<RequireAuth><Painel><CreateFilme /></Painel></RequireAuth>} path="/Filmes/Create" />
      </Routes>
  );
}

export default App;
