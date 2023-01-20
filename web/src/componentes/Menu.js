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
                    <Nav.Link onClick={(e)=>{sair(e)}}>Logout</Nav.Link>
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
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/filmes"  >Filmes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/usuarios" >Usuarios</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export {MenuTop, MenuLeft};