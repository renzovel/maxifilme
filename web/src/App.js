import React, {useState} from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from './Auth/RequireAuth';
import Filmes from './componentes/Filmes/FilmeList';
import './asset/css/App.css';



import Login from './componentes/Login';
import Painel from './componentes/Painel';
import {FilmeCreate, FilmeEdit, FilmeList} from "./componentes/Filmes"

function App(props) {
  return (
    
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<RequireAuth><Painel><FilmeList /></Painel></RequireAuth>} path="/Painel" />
        <Route element={<RequireAuth><Painel><FilmeList /></Painel></RequireAuth>} path="/Filmes" />
        <Route element={<RequireAuth><Painel><FilmeCreate /></Painel></RequireAuth>} path="/Filmes/Create" />
        <Route element={<RequireAuth><Painel><FilmeEdit /></Painel></RequireAuth>} path="/Filmes/Edit/:id" />
      </Routes>
  );
}

export default App;
