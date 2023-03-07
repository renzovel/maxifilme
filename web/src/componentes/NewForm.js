import React from "react";
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import Button from 'react-bootstrap/Button';

class NewForm extends React.Component{
    static defaultProps={
        options:[]
    }
    constructor(props){
        super(props)
        this.input=this.input.bind(this);
    }

    input({type, name, title, placeholder, options, handleChangeOption, isvalid}, values, errors, handleChange, setFieldValue){
        switch (type) {
            case "text":
                return (<>
                    <Form.Group key={name} className="mb-3" controlId={`id${name.trim()}`}>
                        <Form.Label className="form-label_aling">{title}</Form.Label>
                        <Form.Control type="text" name={name} placeholder={placeholder}
                        value={values[name]} 
                        onChange={handleChange} 
                        isInvalid={!!errors[name]} 
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors[name]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </>)  
            case "multitext":
                return (<>
                     <Form.Group key={name} className="mb-3" controlId={`id${name.trim()}`}>
                        <Form.Label className="form-label_aling">{title}</Form.Label>
                        <BootstrapSelect  isMultiSelect={true} options={options} onChange={handleChangeOption} name={name} placeholder="Escolha os atores do filme..." style={{width:"-webkit-fill-available"}} className={isvalid?'':"is-invalid"}  />
                        <br/>
                        <Form.Control.Feedback type="invalid">
                        {isvalid?'':'Dados nao validos.'}
                        </Form.Control.Feedback>
                    </Form.Group>
                </>)      
            case "file":
                return (<>
                    <Form.Group key={name} className="mb-3" controlId={`id${name.trim()}`}>
                        <Form.Label className="form-label_aling">{title}</Form.Label>
                        <Form.Control type="file" required name={name} placeholder={placeholder} 
                        onChange={(evt)=>{setFieldValue(name,evt.target.files[0])}} 
                        isInvalid={!!errors[name]}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors[name]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </>)
            case "boton":
                return (<Button variant="primary" type="submit">
                    {title}
                </Button>)   
            default:
                return (<></>)
        }
    }

    render(){
        const {props} = this;
        const objeto={}
        for(const option of props.options){
            switch (option.type) {
                case "file":
                    objeto[option.name]=null;
                    break;
                case "multitext": break;            
                default:
                    objeto[option.name]="";
                    break;
            }
        }
        return (
            <>
            <Formik 
                validationSchema={props.schema}
                onSubmit={props.handleSubmit}
                initialValues={objeto}
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
                <Form key={1} className="form_createfilme" noValidate onSubmit={handleSubmit}> 
                   {props.options.map((opcion)=>this.input(opcion, values, errors, handleChange, setFieldValue))  }
                </Form>
            )}
            </Formik>
            </>
        ); 
    }

}

export default NewForm;