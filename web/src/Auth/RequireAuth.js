import React, {useContext} from "react";
import Login from "../componentes/Login";
import ContextAuth from './Context'

const RequireAuth = (props)=>{
 
    const context = useContext(ContextAuth);
    
    if (!context.usuario) {
       return <Login />
    }

    return props.children;
}

export default RequireAuth;