import React, { useState } from 'react';
import logo from './logo.svg';
import './conversor-moedas.css';
import ListarMoedas from './listar-moedas'
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';


function ConversorMoedas() {
  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=e4eabbdce7da4fc92ccd3cc9d0c1f4c9';
  
  const [valor, setValor] = useState('1');
  const [moedaDe, setMoedaDe] = useState('USD');
  const [moedaPara, setMoedaPara] = useState('BRL');
  const [exibirSpinner, setExibirSpinner] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [resultadoConversao, setResultadoConversao] = useState('');
  const [exibirMsgErro, setExibirMsgErro] = useState(false);

  function HandleValor(event){
    setValor(event.target.value.replace(/\D/g, ''));
  }

  function HandleMoedaDe(event){
    setMoedaDe(event.target.value);
  }

  function HandleMoedaPara(event){
    setMoedaPara(event.target.value);
  }

  function converter(event){
    event.preventDefault();
    setFormValidado(true);
    if(event.currentTarget.checkValidity()=== true){
      //TODO implementar a chamada da API ao Fixer.io
      setExibirSpinner(true);
      Axios.get(FIXER_URL)
      .then(res =>{
        const cotacao = obterCotacao(res.data);
        if(cotacao){
          setResultadoConversao(`${moedaDe} ${valor} = ${moedaPara} ${cotacao}`)
          setExibirModal(true);
          setExibirSpinner(false);
          setExibirMsgErro(false);
        } else {
            exibirErro();
        }

      }).catch(err => exibirErro());
    }
  }

  function obterCotacao(dadosCotacao){
    if(!dadosCotacao || dadosCotacao.success!== true){
      return false;
    }
    const cotacaoDe = dadosCotacao.rates[moedaDe];
    const cotacaoPara = dadosCotacao.rates[moedaPara];
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
    return cotacao.toFixed(2);
  }

  function HandleFecharModal (event){
    setValor('1');
    setMoedaDe('USD');
    setMoedaPara('BRL');
    setFormValidado(false);
    setExibirModal(false);
  }

  function exibirErro() {
    setExibirMsgErro(true);
    setExibirSpinner(false);
  }


  return (
    <>
    <h1>Conversor de Moedas</h1>
    <Alert variant="danger" show={exibirMsgErro}>Erro obtendo dados de conversão. Tente novamente.</Alert>
    <Jumbotron>
      <Form
        onSubmit={ converter } noValidate validated={formValidado}>
        <Form.Row>
          <Col sm="3">
            <Form.Control
            placeholder="0"
            value= {valor}
            onChange={HandleValor}
            required/>
          </Col>
          <Col sm="3">
            <Form.Control as="select"
            value={moedaDe}
            onChange={HandleMoedaDe}>
              <ListarMoedas/>
            </Form.Control>
          </Col>
          <Col sm="1" className="text-center" style={{paddingTop:'5px'}}>
            <FontAwesomeIcon icon={faAngleDoubleRight}/>
          </Col>
          <Col sm="3">
            <Form.Control as="select"
            value={moedaPara}
            onChange={HandleMoedaPara}>
              <ListarMoedas/>
            </Form.Control>
          </Col>
          <Col sm="2">
            <Button variant="success" type="submit" data-testid="btn-converter">
              <span className={exibirSpinner ? null:  'hidden'}>
               <Spinner animation="border" size="sm"/>
              </span>
              <span className={exibirSpinner ? 'hidden' : null }>
               Converter
              </span>
            </Button>
          </Col>
        </Form.Row>
      </Form>


      <Modal show={exibirModal} onHide={HandleFecharModal}d ata-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Conversão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultadoConversao}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={HandleFecharModal}>
            Nova Conversão
          </Button>
        </Modal.Footer>

      </Modal>
    </Jumbotron>
    </>
  );
}

export default ConversorMoedas;
