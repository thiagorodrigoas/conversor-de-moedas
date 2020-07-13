import React from 'react';
import ReactDOM from 'react-dom';
import ConversorMoedas from './conversor-moedas';
import { render, fireEvent, getByText} from '@testing-library/react' //render: pra testar renderização fireEvent: testar eventos de clicks do usuário
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import axios from './__mocks__/axios';


describe('Teste do componente de conversão de moedas',() => {
  it('Deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConversorMoedas />,div);
    ReactDOM.unmountComponentAtNode(div);
  }); 

  if('Deve simular uma conversão de moedas', async () => {
    const {findByTestId, getByTestId} = render(<ConversorMoedas/>); //findByTestId suporta funcão assincrona o getByTestId não aceita
    axiosMock.get.mockResolvedValueOnce({
      data: {
        success:true,
        rates: {
          BRL: 4.564292,
          USD: 1.101049
        }
      }});
      fireEvent.click(getByTestId('btn-converter'));
      const modal = await findByTestId('modal');
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
      expect(modal).toHaveTextContent('1 BRL = 0.24 USD');

  });
});

