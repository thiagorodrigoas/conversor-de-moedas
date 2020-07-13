import React from 'react'
import ReactDOM from 'react-dom'
import listarMoedas from './listar-moedas'

describe('Teste do componente de Listagem de Moedas', ()=>{
    it('Deve renderizar o componente sem erros.', ()=> {
        const div = document.createElement('div');
        ReactDOM.render(<listarMoedas/>,div);
        ReactDOM.unmountComponentAtNode(div);
    });
});