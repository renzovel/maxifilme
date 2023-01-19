import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalMaxi from './ModalMaxi';
import { URLs, POST } from "../fetch-api/Api"
import {MenuTop, MenuLeft} from './Menu';



function Painel(props){
    return(
    <>    
        <MenuTop />
        <div className="painel-container">
            <MenuLeft />
            <div style={{width: "inherit"}}>
              {props.render}
            </div>
        </div>
    </>
    )
}



export default Painel;