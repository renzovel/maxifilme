import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { URLs, GET } from '../fetch-api/Api';
import ModalMaxi from './ModalMaxi';




export default class Filmes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      allFilmes: null,
      load : true
    };
  }
  componentDidMount() {
    var _this = this;
    GET(`${URLs.Filmes}/all/`).then((res) => {
      const allFilmes = res.data.map((res) => {
        return (
          <div className="contentCard" style={{ height: "fit-content" }} key={res.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={`${URLs.urlImages}/${res.image}`} />
              <Card.Body>
                <Card.Title>{res.nome}</Card.Title>
                <Card.Text>
                  {res.descricao}
                </Card.Text>
                <Button variant="primary" onClick={() => alert(res.id)}>Ver</Button>&nbsp;
                <Button variant="primary" onClick={() => alert(res.id)}>Editar</Button>&nbsp;
                <Button variant="primary" onClick={() => alert(res.id)}>Apagar</Button>&nbsp;
              </Card.Body>
            </Card>
          </div>
        )
      })
      _this.setState({ allFilmes: allFilmes });
      _this.setState({ load: false });
    })
  }

  render() {
    const {allFilmes, load} = this.state;
    return (<>
            <ModalMaxi
              type={"LOAD"}
              show={load}
            />            
            {allFilmes}
            </>);
  }
}


