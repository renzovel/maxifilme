import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import '../asset/css/CreateFilme.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import ModalMaxi from './ModalMaxi';
import {URLs, POSTFile} from '../fetch-api/Api'


class CreateFilme extends Component{
    constructor(props){
        super(props);
        this.state={
            atoresIsValid:true,
            generosIsValid:true,
            generos:[],
            atores:[],
            load:false
        }
        this.schema = yup.object().shape({
            nome: yup.string().required("Campo obrigatório."),
            descricao: yup.string().required("Campo obrigatório."),
            diretor: yup.string().required("Campo obrigatório."),
            image:yup.mixed().test('image', 'Tipo de imagen nao permitida.', (value)=>{
                let valid=false;
                if(value==null || typeof value!=='object'){
                    return false;
                }
                if([
                    'image/png',
                    'image/jpg',
                    'image/pneg',
                    'image/jpeg',
                ].includes(value.type)){
                    valid=true;
                }else{
                    valid=false;
                } 
                return valid;
            }).required("Campo obrigatório.")
          });
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        POSTFile(URLs.Filmes+'/')
    }

    
    handleChange(value){
        switch (value.el.getAttribute("name")) {
            case 'generos':
                    if(value.selectedValue.length==0){
                        this.setState({
                            generosIsValid:false,
                            generos:[]
                        })
                    }else{
                        this.setState({
                            generosIsValid:true,
                            generos: value.selectedKey
                        })
                    }
                break;
            case 'atores':
                    if(value.selectedValue.length==0){
                        this.setState({
                            atoresIsValid:false,
                            atores:[]
                        })
                    }else{
                        this.setState({
                            atoresIsValid:true,
                            atores: value.selectedValue
                        })
                    }
                break;
        }
        
    }
    

    async handleSubmit(data, func){
        if(this.state.atoresIsValid&&this.state.generosIsValid){
            this.setState({
                load:true
            })
            const form=new FormData();
            for(const item in data){
                form.append(item, data[item])
            }
            form.append("atores", this.state.atores)
            form.append("generos", this.state.generos)
        }
    }


    render(){
        const {state} = this;
        return(<>
            <ModalMaxi
              type={"LOAD"}
              show={state.load}
            />    
            <Formik 
                validationSchema={this.schema}
                onSubmit={this.handleSubmit}
                initialValues={{
                    nome: '',
                    descricao:'',
                    diretor:'',
                    image:null
                }}
            >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                setFieldValue,
                values,
                touched,
                isValid,
                errors
            }) => (
            <Form className="form_createfilme" noValidate onSubmit={handleSubmit}> 
                <Form.Group className="mb-3" controlId="idNome">
                    <Form.Label className="form-label_aling">Nome :</Form.Label>
                    <Form.Control type="text" name="nome" placeholder="Nome do filme..."
                    value={values.nome} 
                    onChange={handleChange} 
                    isInvalid={!!errors.nome} 
                     />
                    <Form.Control.Feedback type="invalid">
                     {errors.nome}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="idDescricao">
                    <Form.Label className="form-label_aling">Descricao :</Form.Label>
                    <Form.Control type="text" name="descricao" placeholder="Descricao do filme..."
                    value={values.descricao} 
                    onChange={handleChange} 
                    isInvalid={!!errors.descricao} 
                     />
                    <Form.Control.Feedback type="invalid">
                     {errors.descricao}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="idDiretor">
                    <Form.Label className="form-label_aling">Diretor :</Form.Label>
                    <Form.Control type="text" name="diretor" placeholder="Diretor do filme..." 
                    value={values.diretor} 
                    onChange={handleChange} 
                    isInvalid={!!errors.diretor} 
                     />
                    <Form.Control.Feedback type="invalid">
                     {errors.diretor}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="idAtores">
                    <Form.Label className="form-label_aling">Atores :</Form.Label>
                    <BootstrapSelect  isMultiSelect={true} options={[
                        {
                            labelKey: "optionItem1",
                            value: "Option item 1",
                            isSelected: true
                        },
                        {
                            labelKey: "optionItem2",
                            value: "Option item 2"
                        }
                    ]} onChange={this.handleChange} name="atores" placeholder="Escolha os atores do filme..." style={{width:"-webkit-fill-available"}} className={state.atoresIsValid?'':"is-invalid"}  />
                    <br/>
                    <Form.Control.Feedback type="invalid">
                     {state.atoresIsValid?'':'Atores nao validos.'}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="idGeneros">
                    <Form.Label className="form-label_aling">Generos :</Form.Label>
                    <BootstrapSelect  isMultiSelect={true} options={[
                        {
                            labelKey: "optionItem1",
                            value: "Option item 1",
                            isSelected: true,
                        },
                        {
                            labelKey: "optionItem2",
                            value: "Option item 2"
                        }
                    ]} onChange={this.handleChange} name="generos" placeholder="Escolha os generos do filme..." style={{width:"-webkit-fill-available"}} className={state.generosIsValid?'':"is-invalid"} />
                    <br />
                    <Form.Control.Feedback type="invalid">
                    {state.generosIsValid?'':'Atores nao validos.'}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="idImage">
                    <Form.Label className="form-label_aling">Imagen :</Form.Label>
                    <Form.Control type="file" required name="image" placeholder="Imagen do filme..." 
                    onChange={(evt)=>{setFieldValue("image",evt.target.files[0])}} 
                    isInvalid={!!errors.image}
                     />
                    <Form.Control.Feedback type="invalid">
                     {errors.image}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>)}
            </Formik>
            </>
        )
    }
}

export default CreateFilme;