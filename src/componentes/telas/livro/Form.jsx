import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import LivroContext from './LivroContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaAutores, listaGeneros } = useContext(LivroContext);

    (() => {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
        console.log(objeto)
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
      
            form.classList.add('was-validated')
          }, false)
        })
      })()

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Formulário de Livro</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="mb-3">
                                <label htmlFor="txtCodigo" className="form-label">Código</label>
                                <input type="number" className="form-control" id="txtCodigo"
                                    readOnly name="codigo" value={objeto.codigo} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtTitulo" className="form-label">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtTitulo"
                                    name="titulo"
                                    placeholder='Informe o título'
                                    value={objeto.titulo}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Título OK!
                                </div>
                                <div className="invalid-feedback">
                                    Título deve ser informado!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDescricao" className="form-label">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtDescricao"
                                    name="descricao"
                                    placeholder='Informe a descrição'
                                    value={objeto.descricao}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Descrição OK!
                                </div>
                                <div className="invalid-feedback">
                                    Descrição deve ser informado!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectAutor" className="form-label">
                                    Autor
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectAutor"
                                    value={objeto.autor}
                                    name="autor"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione o autor)</option>
                                    {listaAutores.map((autor) => (
                                        <option key={autor.codigo} value={autor.codigo}>
                                            {autor.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">
                                    Autor OK!
                                </div>
                                <div className="invalid-feedback">
                                    Selecione um autor...
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectGenero" className="form-label">
                                    Gênero
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectGenero"
                                    value={objeto.genero}
                                    name="genero"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione o gênero)</option>
                                    {listaGeneros.map((genero) => (
                                        <option key={genero.codigo} value={genero.codigo}>
                                            {genero.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">
                                    Gênero OK!
                                </div>
                                <div className="invalid-feedback">
                                    Selecione um gênero...
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtQuantidade" className="form-label">
                                    Quantidade
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtQuantidade"
                                    name="quantidade"
                                    value={objeto.quantidade}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Quantidade OK!
                                </div>
                                <div className="invalid-feedback">
                                    Quantidade deve ser informada!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;