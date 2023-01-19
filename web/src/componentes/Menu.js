import React from "react";
import '../asset/css/Menu.css'
import { Link } from "react-router-dom";
import URL from "../fetch-api/URLs";

import {Nav} from 'react-bootstrap';


function MenuTop(){
    return(
        <div className="topmenu">
            <div>
                <img src={URL.defaultUser} />
            </div>
            <div>
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/sair">Logout</Nav.Link>
                </Nav.Item>
            </Nav>
            </div>
            
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