import { useState, useEffect } from "react";
import LivroContext from "./LivroContext";
import { getGenerosAPI }
    from "../../../servicos/GeneroServico";
import { getAutoresAPI }
    from "../../../servicos/AutorServico";
import {
    getLivrosAPI, getLivroPorCodigoAPI,
    deleteLivroPorCodigoAPI, cadastrarLivroAPI
} from "../../../servicos/LivroServico"
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import Form from "./Form";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../seguranca/Autenticacao';

function Livro() {

    //let isAuth = getToken() ? true : false;

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaAutores, setListaAutores] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", titulo: "",
        descricao: "", genero: "",
        autor: "", quantidade: ""
    });
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "", titulo: "",
            descricao: "", genero: "",
            autor: "", quantidade: ""
        });
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getLivroPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            console.log(objeto);
            let retornoAPI = await cadastrarLivroAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaLivros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaLivros = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getLivrosAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaGeneros = async () => {
        try {
            setListaGeneros(await getGenerosAPI());
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaAutores = async () => {
        try {
            setListaAutores(await getAutoresAPI());
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteLivroPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaLivros();
            } catch (err) {
                window.location.reload();
            navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaLivros();
        recuperaGeneros();
        recuperaAutores();
        //isAuth = getToken() ? true : false;
        //if (!isAuth){
        //    navigate("/login");
        //}
    }, []); // isAuth


    return (
        <LivroContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaGeneros, listaAutores
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />

        </LivroContext.Provider>
    )
}

export default WithAuth(Livro);