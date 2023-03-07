import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { URLs, GET,  DELETE } from '../../fetch-api/Api';
import ModalMaxi from '../ModalMaxi';
import { Link } from 'react-router-dom';

export default class FilmeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      allFilmes: null,
      load : true,
      loadingDelete:false,
      modalDelete:false,
      deletaId:null,
      deleteNome:null,
      allFilmesData:{}
    };
    this.deletarFilme = this.deletarFilme.bind(this);
    this.deletarFilmeShow = this.deletarFilmeShow.bind(this);
    this.filmeItem = this.filmeItem.bind(this);
  }
  componentDidMount() {
    var _this = this;
    GET(`${URLs.Filmes}/all/`).then((res) => {
      const allFilmes = res.data.map((res) => {
        return _this.filmeItem(res);
      })
      _this.setState({ allFilmes: allFilmes, allFilmesData: res.data});
      _this.setState({ load: false });
    })
  }

  deletarFilmeShow(id,nome){
    this.setState({deletaId:id, modalDelete:true, deleteNome:nome })
  }

  deletarFilme(confirmado){
    var _this=this;
    if(confirmado){
      this.setState({load:true, modalDelete:false})
      DELETE(URLs.Filmes+"/apagar", JSON.stringify({id:this.state.deletaId})).then((res)=>{
        if(res.msg==="ok"){
          let listaFilmes=_this.state.allFilmesData.filter(filme => filme.id !== this.state.deletaId);
          let allFilmes = listaFilmes.map((res) => {
            return _this.filmeItem(res);
          })
          _this.setState({allFilmes:allFilmes, deletaId:null, load:false, modalDelete:false, allFilmesData:listaFilmes})
          console.log(allFilmes.length, _this.state.allFilmes.length)
        }else{
          _this.setState({ deletaId:null, load:false, modalDelete:false})
        }
      })
    }else{
      this.setState({load:false, modalDelete:false})
    }
  }

  filmeItem(res){
    var _this=this;
    return (
      <div className="contentCard" style={{ height: "fit-content" }} key={res.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`${URLs.urlImages}/${res.image}`} />
          <Card.Body>
            <Card.Title>{res.nome}</Card.Title>
            <Card.Text>
              {res.descricao}
            </Card.Text>
            <Card.Text style={{textAlign:"left"}}>
              Diretor: {res.diretor}
            </Card.Text>
            {localStorage.nivel==="1"?<><Button variant="primary" onClick={() => alert("Ver")}>Ver</Button>&nbsp;
            <Link to={`/Filmes/Edit/${res.id}`}><Button variant="primary">Editar</Button></Link>&nbsp;
            <Button variant="primary" onClick={() => _this.deletarFilmeShow(res.id,res.nome)}>Apagar</Button>&nbsp;</>:<></>}
          </Card.Body>
        </Card>
      </div>
    )
  }  

  render() {
    const { load, loadingDelete, modalDelete, deleteNome} = this.state;
    return (<>
            <ModalMaxi
                type={"DELETE"}
                title={"Apagar"}
                subtitle={loadingDelete?null:"Você realmente deseja excluir o filme?"}
                message={loadingDelete?<div className="loading"></div>:<p>{`Você excluirá a trilha de titulo : "`}<strong>{deleteNome}</strong>{`" clica no botão `}<strong>{`"Concordo"`}</strong>{` se você realmente deseja excluí-lo.`}</p>}
                show={modalDelete}
                onHide={this.deletarFilme}
            />
            <ModalMaxi
              type={"LOAD"}
              show={load}
            />            
            {this.state.allFilmes}
            </>); 
  }
}


