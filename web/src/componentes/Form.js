import React from "react";

class Form extends React.Component{
    constructor(props){
        super(props)

        this.inputType=this.inputType.bind(this);
    }

    inputType({type, name}){
        switch (type) {
            case "text":
                return <></>               
                break;        
            default:
                return <></>
                break;
        }
    }



    render(){
        return (
            <>
            </>
        ); 
    }

}

export default Form;