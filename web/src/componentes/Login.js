
import React, { useState, useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../asset/css/Login.css';
import ModalMaxi from './ModalMaxi';
import { URLs, POST } from "../fetch-api/Api"
import { useNavigate } from "react-router-dom";
import ContextAuth from '../Auth/Context'



function Login() {

  const [modalRead, setModalRead] = useState(false);
  const [msgRead, setMsglRead] = useState(null);
  
  const [load, setLoad] = useState(false);
  const [dados, setDados] = useState({});

  const context = useContext(ContextAuth);
  const navigate = useNavigate();
  const clearForm=()=>{
    setDados({})
  }

  useEffect(() => {
    if(context.usuario){
      navigate("/Painel")
    }
  }, [context]);

  const loginUser = async (e) => {
    e.preventDefault();
    setDados({});
    setLoad(true);
    let dados = { email: e.target.email.value, senha: e.target.senha.value };

    const res = await context.login(dados.email, dados.senha);
    if (res===true) {
      navigate("/Painel")
    } else {
      setLoad(false)
      setDados(res.data)
      setModalRead(true)
      setMsglRead(res.msg)
    }
  }

  

  return (
    <div className="loginContainer">
      <ModalMaxi
        type={"READ"}
        title={"Aviso"}
        subtitle={""}
        message={
          <p>{msgRead}</p>
        }
        show={modalRead}
        onHide={() => { setModalRead(modalRead => !modalRead) }}
      />
      <ModalMaxi
        type={"LOAD"}
        show={load}
      />
      <Form onSubmit={(e) => loginUser(e)} >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email..." onClick={clearForm} />
          {dados.email!==undefined?<Form.Text className="text-muted">
            Formato de e-mail errado.
          </Form.Text>:null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Senha..." onClick={clearForm} />
          {dados.senha!==undefined?<Form.Text className="text-muted">
            Senha errada mínimo 8 máximo 20.
          </Form.Text>:null}
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Entrar
          </Button>
        </div>

      </Form>
    </div>
  );
}

export default Login;
