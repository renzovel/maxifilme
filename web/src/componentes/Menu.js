import React, {useState} from "react";
import '../asset/css/Menu.css'
import { Link, Navigate } from "react-router-dom";
import {URLs, POST} from "../fetch-api/Api";

import {Nav} from 'react-bootstrap';

import ModalMaxi from './ModalMaxi';


function MenuTop(){
    const [load, setLoad] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const sair=(e)=>{
        e.preventDefault();
        POST(`${URLs.Usuarios}/logout`, JSON.stringify({})).then((res) => {
            localStorage.clear()
            setRedirect(true)
            setLoad(true) 
        }).catch((e)=>{
            localStorage.clear()
            setRedirect(true)
            setLoad(true) 
        })
    }

    return(
        <div className="topmenu">
            {!redirect?null:<Navigate to="/login" />}
            <div>
                <img src={URLs.defaultUser} />
            </div>
            <div>
            <Nav>
                <Nav.Item>
                    <Nav.Link onClick={sair}>Logout</Nav.Link>
                </Nav.Item>
            </Nav>
            </div>
            <ModalMaxi
                type={"LOAD"}
                show={load}
            />
        </div>        
    )
}

function MenuLeft(props){
    return(
        <div className="nav-left">
            <ul>
                <li className="show-submenu"><a href="">Filmes</a>
                    <ul>
                        <li><a href="">Ver</a></li>
                        <li><a href="">Crear</a></li>
                    </ul>
                </li>
                <li><a href="">Usuarios</a>
                    <ul>
                        <li><a href="">Ver</a></li>
                        <li><a href="">Crear</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export {MenuTop, MenuLeft};