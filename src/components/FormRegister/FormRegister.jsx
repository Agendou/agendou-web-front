import React from "react";
import styles from './FormRegister.module.css';
import logo from '../../assets/images/logoEscuraAgendou.png';

const FormRegister = () => {
    return (
        <div className="form-container">
            <img src={logo} alt="Logotipo Agendou" className="Voltar à página inicial" />
            <h2>Cadastre-se</h2>
            <p>Saiba como podemos revolucionar o seu negócio!</p>

            <div className={styles["inputContainer"]}>
                <label htmlFor="cnpj" className={styles["label"]}></label>
                <input
                    id="cnpj"
                    type="text"
                    className={styles["input"]}
                    placeholder="Insira seu CNPJ"
                />
            </div>

            <div className={styles["inputContainer"]}>
                <label htmlFor="telefone" className={styles["label"]}></label>
                <input
                    id="telefone"
                    type="text"
                    className={styles["input"]}
                    placeholder="Insira seu telefone"
                />
            </div>

            <div className={styles["inputContainer"]}>
                <label htmlFor="nomeEmpresa" className={styles["label"]}></label>
                <input
                    id="nomeEmpresa"
                    type="text"
                    className={styles["input"]}
                    placeholder="Insira o nome da sua empresa"
                />
            </div>

            <div className={styles["inputContainer"]}>
                <label htmlFor="email" className={styles["label"]}></label>
                <input
                    id="email"
                    type="text"
                    className={styles["input"]}
                    placeholder="Insira seu email"
                />
            </div>

            <div className={styles["inputContainer"]}>
                <label htmlFor="senha" className={styles["label"]}></label>
                <input
                    id="senha"
                    type="password"
                    className={styles["input"]}
                    placeholder="Insira sua senha"
                />
            </div>

            <div className={styles["checkboxContainer"]}>
                <input
                    type="checkbox"
                    className={styles["checkboxInput"]}
                    id="aceitar"
                />
                <label htmlFor="aceitar" className={styles["label"]}>Eu aceito os <a href="#" className={styles["linkTerms"]}>Termos e Condições</a></label>
            </div>

            <button className={styles["button"]}>Cadastrar</button>

            <div className={styles["linkContainer"]}>
                <p>Já tem uma conta?</p>
                <a href="#" className={styles["link"]}>Acesse aqui</a>
            </div>

        </div>
    )
}