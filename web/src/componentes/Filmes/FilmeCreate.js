import React from "react";
import NewForm from "../NewForm";
import '../../asset/css/Filme.css';
import * as yup from 'yup';
import {URLs, POSTFile, GET} from '../../fetch-api/Api';
import ModalMaxi from "../ModalMaxi";


class Create extends React.Component{
    constructor(props){
        super(props);
        this.state={
            atoresIsValid:true,
            generosIsValid:true,
            generos:[],
            atores:[],
            load:false,
            allGeneros:[],
            modalAviso:false,
            modalAvisoMsg:""
        }
        this.schema = yup.object().shape({
            nome: yup.string().required("Campo obrigatório."),
            descricao: yup.string().required("Campo obrigatório."),
            diretor: yup.string().required("Campo obrigatório.").min(4,"Minimo 4 caracteres").max(10, "Maximo 10 caracteres"),
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

        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.hideModalAviso= this.hideModalAviso.bind(this);
    }

    async componentDidMount(){
        const Generos = await GET(URLs.Generos+'/all');
 
         const allGeneros = Generos.data.map((item)=> { return { labelKey: item.id, value : item.nome } })
         allGeneros[0].isSelected=true;
 
        this.setState({
         allGeneros: allGeneros
        })
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
            form.append("atores", JSON.stringify(this.state.atores))
            form.append("generos", JSON.stringify(this.state.generos))
            const res =await POSTFile(URLs.Filmes+"/cadastrar", form);
        
            if(res.msg==="ok"){
                func.resetForm();
                this.setState({
                    load:false,
                    modalAvisoMsg:"O filme foi cadastrado con sucesso.",
                    modalAviso:true
                })
            }else{
                for(const item in res.data){
                    func.setFieldError(item, res.msg);
                }
                this.setState({
                    load:false,
                    modalAvisoMsg:"Aconteceu um erro ao tentar cadastrar o filme.",
                    modalAviso:true
                })
            }
            
        }
    }

    handleChange(value){
        switch (value.el.getAttribute("name")) {
            case 'generos':
                    if(value.selectedValue.length===0){
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
                    if(value.selectedValue.length===0){
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
            default: 
                break;
        }
        
    }
    
    hideModalAviso(){
        this.setState({
            modalAviso:false
        })
    }

    render(){
        const {state} = this;
        return (<>
        <ModalMaxi
              type={"LOAD"}
              show={state.load}
        />  
        <ModalMaxi
            type={"READ"}
            show={state.modalAviso}
            onHide={this.hideModalAviso}
            message={state.modalAvisoMsg}
        /> 
        <NewForm handleSubmit={this.handleSubmit} schema={this.schema} options={[
        {type:"text", name:"nome", title:"Nome :", placeholder:"Nome do filme..."},
        {type:"text", name:"descricao", title:"Descricao :", placeholder:"Descricao do filme..."},
        {type:"text", name:"diretor", title:"Diretor :", placeholder:"Diretor do filme..."},
        {type:"multitext", name:"atores", title:"Atores :", placeholder:"Escolha os atores do filme...", options:[
            {
                labelKey: "optionItem1",
                value: "Option item 1",
                isSelected: true
            },
            {
                labelKey: "optionItem2",
                value: "Option item 2"
            }
        ], handleChangeOption:this.handleChange, isvalid:state.atoresIsValid},
        {type:"multitext", name:"generos", title:"Generos :", placeholder:"Escolha os generos do filme...", options:state.allGeneros, handleChangeOption:this.handleChange, isvalid:state.generosIsValid},
        {type:"file", name:"image", title:"Imagen :", placeholder:"Imagen do filme..."},
        {type:"boton", title:"Criar Filme"}]} /></>);
    }
}

export default Create;