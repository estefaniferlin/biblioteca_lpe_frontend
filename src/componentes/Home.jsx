import React from 'react';
import './Home.css';

const Home = () => (
    <div className="home-container">
        <h1 className="title">Biblioteca - PW</h1>
        <div className="content">
            <h3 className="welcome-message">Seja bem-vindo à Biblioteca Virtual!</h3>
            <p className="description">
                Esta biblioteca foi desenvolvida para uma avaliação da disciplina de Linguagens de Programação Emergentes.
                No menu, você pode selecionar a opção de cadastros e realizar o cadastro de
                autores, gêneros e livros. Além disso, pode realizar a manutenção
                de seus respectivos dados.
            </p>
        </div>
        <div className="footer">Copyright 2024 by Estéfani Ferlin, Ciência da Computação, IFSul</div>
    </div>
);

export default Home;
