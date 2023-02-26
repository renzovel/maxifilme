import React, { useState, useEffect } from "react";
import {MenuTop, MenuLeft} from './Menu';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Channel from '../ServiceEvent';

const MessageCreate = (props) =>{
    const [show, setShow] = useState(true);
    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000}>
            <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
            <strong className="me-auto">Alerta</strong>
            <small className="text-muted">{props.data}</small>
            </Toast.Header>
            <Toast.Body>{props.msg}</Toast.Body>
        </Toast>
    )
}


function Painel(props){
    const [messager, setMessager] = useState([]);
    useEffect(() => {
        Channel.on("event:msg", message)
        return ()=>{
            Channel.removeListener("event:msg", message)
        }
    }, []);

    const message = (msg) =>{
        setMessager((message)=>{
            console.log("me llamaron")
            return [
                {
                    id: new Date().getTime(),
                    data: new Date().toUTCString(),
                    msg
                },
                ...message
            ]
        })
    }

    return(
    <>   
        <ToastContainer position="top-end">
            {messager.map((item, index)=><MessageCreate key={index} data={item.data} msg={item.msg} />)}
        </ToastContainer>
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