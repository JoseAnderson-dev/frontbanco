function ListarServico({ lista,eventoRemover,editar}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Estabelecimento</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Cartao</th>
                    <th>Comentario</th>
                    <th>Cpf</th>
                </tr>
            </thead>
            <tbody>
                {
                    lista.map((item, i) => (
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.valor}</td>
                            <td>{item.estabelecimento}</td>
                            <td>{item.data}</td>
                            <td>{item.hora}</td>
                            <td>{item.cartao}</td>
                            <td>{item.comentario}</td>
                            <td>{item.cpf}</td>
                            <td>
                                <button type="button" onClick={() => (eventoRemover(item.id))} className="btn btn-outline-danger">
                                    <span className="bi-trash"></span>Remover
                                </button>
                                <button type="button" className="btn btn-outline-warning"
                                    onClick={() => (editar(item))}
                                >
                                    <span className="bi-pen"></span>Editar
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default ListarServico;