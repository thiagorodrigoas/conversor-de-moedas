import React from 'react'

export default function ListarMoedas(){
    const MOEDAS = [
        {"sigla": "AUD", "descricao": "Dólar Australiano"},
        {"sigla": "USD", "descricao": "Dólar Americano"},
        {"sigla": "BRL", "descricao": "Real Brasileiro"},
        {"sigla": "GBP", "descricao": "Libra Esterlina"},
        {"sigla": "EUR", "descricao": "Euro"},
        {"sigla": "JPY", "descricao": "Iene Japonês"},
        {"sigla": "CHF", "descricao": "Franco Suiço"}
    ];

    function compare(moeda1, moeda2){
        if(moeda1.descricao < moeda2.descricao){
            return -1
        }else if(moeda1.descricao > moeda2.descricao){
            return 1
        }
        return 0
    }
    return (MOEDAS.sort(compare).map(moeda => 
    <option value={moeda.sigla} key={moeda.sigla}>
        {moeda.descricao}
    </option>));
}