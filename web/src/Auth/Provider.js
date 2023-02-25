import React, {useState, useEffect} from "react";
import ContextAuth  from "./Context"
import { URLs, POST } from "../fetch-api/Api"

const ProviderAuth = (props) =>{

    const [usuario, setUsuario] = useState(null);
    
    const validateSession = async () =>{
        try {
            const res = await POST(`${URLs.Usuarios}/session`, JSON.stringify({}));
            if(res.msg!=='ok'){
                localStorage.clear()
                return false
            }else{
                return res
            }
        } catch (error) {
            localStorage.clear()
            return false;
        }        
    }

    useEffect(() => {
        const validaToken = async ()=>{
            const res=await validateSession();
            if (typeof res?.data?.user!=='undefined') {
                setUsuario(res.data.user)
            }else{
                setUsuario(null)
            }
            
        }
        validaToken();
    }, []);


    const login = async (email, senha) =>{
        const res = await POST(`${URLs.Usuarios}/login`, JSON.stringify({email:email, senha:senha}));
        if(res.msg!=='ok'){
            setUsuario(null)
            return res
        }else{
            setUsuario(res.data.user)
            localStorage.clear()
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("email",res.data.user.email)
            localStorage.setItem("nome",res.data.user.nome)
            localStorage.setItem("nivel",res.data.user.nivel)
            return true
        }
    }

    const logout = async () =>{
        const res = await POST(`${URLs.Usuarios}/logout`, JSON.stringify({}));
        try {
            localStorage.clear()
        } catch (error) {
            localStorage.clear()
        }
        setUsuario(null)
        return true
    }

    return (<ContextAuth.Provider value={{usuario, login, logout, validateSession}}>
        {props.children}
    </ContextAuth.Provider>);
}

export default ProviderAuth;