function CadastrarTransacao({modo, eventoTeclado,salvar,obj}) {
  return (
    <form>
      <input type='text' value={obj.cartao} onChange={eventoTeclado} name="cartao" placeholder='Cartao' className="form-control" />
      <input type='text' value={obj.comentario} onChange={eventoTeclado} name="comentario" placeholder='Comentario' className="form-control"/>
      <input type='text' value={obj.cpf} onChange={eventoTeclado} name="cpf" placeholder='Cpf' className="form-control" />
      <input type='date' value={obj.data} onChange={eventoTeclado} name="data" placeholder='Data' className="form-control" />
      <input type='text' value={obj.hora} onChange={eventoTeclado} name="hora" placeholder='Hora' className="form-control" />
      <input type='text' value={obj.nome} onChange={eventoTeclado} name="nome" placeholder='Nome' className="form-control" />
      <input type='text' value={obj.valor} onChange={eventoTeclado} name="valor" placeholder='Valor' className="form-control" />
      <input type='text' value={obj.nomeLoja} onChange={eventoTeclado} name="nomeLoja" placeholder='Estabelecimento' className="form-control" />
      <input type='button' onClick={salvar} value='Salvar' className="btn btn-success" />|
    </form>

  );
}

export default CadastrarTransacao;