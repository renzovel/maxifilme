import React from "react";
import {MenuTop, MenuLeft} from './Menu';
import ProviderAuth from '../Auth/Provider'

import { Navigate } from "react-router-dom";


function Painel(props){
    return(
    <>    
        <MenuTop />
        <div className="painel-container">
            <MenuLeft />
            <div className="containerLayout">
                <props.children.type>
                    {props.children}
                </props.children.type>
            </div>
        </div>
    </>)
    
}



export default Painel;