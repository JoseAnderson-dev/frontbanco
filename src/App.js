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

  const remover = (id) => {
    fetch("http://localhost:8080/transacao/" + id, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retornoConvertidoEmJson) => {
        if (retornoConvertidoEmJson.mensagem !== undefined) {
          alert(retornoConvertidoEmJson.mensagem);
        } else {
          alert("Removido com sucesso!");
        }
      })
      .then(
        () => {
          fetch("http://localhost:8080/transacao")
            .then((retorno) => retorno.json())
            .then((retornoConvertidoEmJson) => setTransacoes(retornoConvertidoEmJson));
        }
      );
  };

  //editar
  const [modoCadastro, setModoCadastro] = useState("cadastro");

  const editarTransacao = (transacaoParaEditar) => {
    setModoCadastro("edicao");
    setObjTransacao(transacaoParaEditar);
  };

  const atualizar = () => {
    fetch("http://localhost:8080/transacao/" + objTransacao.id, {
      method: "put",
      body: JSON.stringify(objTransacao),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retornoConvertidoEmJson) => {
        if (retornoConvertidoEmJson.mensagem !== undefined) {
          alert(retornoConvertidoEmJson.mensagem);
        } else {
          alert("Atualizado com sucesso!");
        }
      }).then(() => {
        fetch("http://localhost:8080/transacao")
          .then((retorno) => retorno.json())
          .then((retornoConvertidoEmJson) => setTransacoes(retornoConvertidoEmJson));
      });;
  };

  return (
    <div className="App">
      {/* <p>{JSON.stringify(objTransacao)}</p> */}
      <CadastrarTransacao  obj={objTransacao} modo = {modoCadastro} salvar={ () => {
            if (modoCadastro === "cadastro") {
              salvar();
            } else if (modoCadastro === "edicao") {
              atualizar();
              setModoCadastro("cadastro");
            }
            limparFormulario();
          }} eventoTeclado={eventoDigitar} />
      <ListarServico lista={transacoes} eventoRemover={remover}
        editar={editarTransacao} />
    </div>
  );
}

export default App;