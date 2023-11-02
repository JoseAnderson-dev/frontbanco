import { useEffect, useState } from 'react';
import './App.css';
import CadastrarTransacao from './CadastrarTransacao';
import ListarServico from './ListarServico';

function App() {
  const [transacoes, setTransacoes] = useState([]);



  useEffect(() => {
    fetch('http://localhost:8080/transacao')
      .then(response => response.json())
      .then(data => setTransacoes(data));
  }, []);

  const transacao = {
    "id": 0,
    "cartao": "",
    "comentario": "",
    "cpf": "",
    "data": "",
    "hora": "",
    "nome": "",
    "valor": 0,
    "nomeLoja": ""

  }
  const [objTransacao, setObjTransacao] = useState(transacao);

  const eventoDigitar = (e) => {
    setObjTransacao({ ...objTransacao, [e.target.name]: e.target.value });
  }

  const salvar = () => {
    fetch('http://localhost:8080/transacao', {
      method: 'POST',
      body: JSON.stringify(objTransacao),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    }).then(response => response.json())
      .then(retornoConvertido => {

        if (retornoConvertido.mensagem !== undefined) {
          alert(retornoConvertido.mensagem);
        } else {
          console.log(retornoConvertido);
          setTransacoes([...transacoes, retornoConvertido]);
          alert("Salvo com sucesso!")
          limparFormulario();
        }
      })
  }

  const limparFormulario = () => {
    setObjTransacao(transacao);
  }



  return (
    <div className="App">
      {/* <p>{JSON.stringify(objTransacao)}</p> */}
      <CadastrarTransacao obj={objTransacao} salvar={salvar} eventoTeclado={eventoDigitar} />
      <ListarServico lista={transacoes} />
    </div>
  );
}

export default App;