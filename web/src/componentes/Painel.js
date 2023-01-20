import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalMaxi from './ModalMaxi';
import { URLs, POST } from "../fetch-api/Api"
import {MenuTop, MenuLeft} from './Menu';

import { Navigate } from "react-router-dom";


function Painel(props){
    const [redirect, setRedirect] = useState(1);
    useEffect(() => {
        POST(`${URLs.Usuarios}/session`, JSON.stringify({})).then((res) => {
            if(res.msg==='ok'){
                setRedirect(3)
            }else{
                localStorage.clear()
                setRedirect(2)
            }
        }).catch((e)=>{
            setTimeout(() => {
                localStorage.clear()
                setRedirect(2)
            }, 1000);
        })
    }, []);
    if(redirect===1){
        return <></>;
    }else if(redirect===2){
        return <Navigate to="/login" />;
    }else{
        return(
        <>    
            <MenuTop />
            <div className="painel-container">
                <MenuLeft />
                <div className="containerLayout">
                    {props.render}
                </div>
            </div>
        </>)
    }
}



export default Painel;