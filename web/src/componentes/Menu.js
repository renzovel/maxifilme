import React, {useState, useContext} from "react";
import '../asset/css/Menu.css'
import { Link, useNavigate } from "react-router-dom";
import {URLs} from "../fetch-api/Api";

import ContextAuth from "../Auth/Context";

import {Nav} from 'react-bootstrap';

import ModalMaxi from './ModalMaxi';

import Channel from '../ServiceEvent';


function MenuTop(){
    const [load, setLoad] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const context = useContext(ContextAuth);
    const navigate = useNavigate();

    const sair=async (e)=>{
        e.preventDefault();
        const res=await context.logout();
        if(res===true){
            navigate("/Login");
        }
        setLoad(false)
    }

    return(
        <div className="topmenu">
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
                <li className="show-submenu"><a href="Filmes">Filmes</a>
                    <ul>
                        <Link to="/Filmes">Listar Filmes</Link> 
                        <Link to="/Filmes/Create">Criar Filmes</Link> 
                    </ul>
                </li>
                <li><a href="Usuarios">Usuarios</a>
                    <ul>
                        <li><a href="Filmes" onClick={()=>props.render("view")}>Ver</a></li>
                        <li><a href="Filmes" onClick={()=>props.render("create")}>Criar</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export {MenuTop, MenuLeft};