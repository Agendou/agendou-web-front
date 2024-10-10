import React, { useState } from "react";
import styles from './FormRegisterCliente.module.css';
import logo from '../../assets/images/logoEscuraAgendou.png';
import { ValidationClienteMessages } from "./ValidationClienteMessages";

const FormRegisterCliente = () => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [aceitarTermos, setAceitarTermos] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formValues = { nome, telefone, email, senha, aceitarTermos };
        const validationMessages = ValidationClienteMessages(formValues);

        if (validationMessages) {
            alert(validationMessages);
            return;
        }

        alert("Cadastrado com sucesso!");
    };

    return (
        <div className={styles["form-container"]}>
            <img src={logo} alt="Logotipo Agendou" className={styles["logo"]} />
            <h2>Cadastre-se</h2>
            <p>Saiba como podemos revolucionar o seu negócio!</p>

            <form onSubmit={handleSubmit}>

                <div className={styles["inputContainer"]}>
                    <label htmlFor="nome" className={styles["label"]}>Nome</label>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        id="nome"
                        type="text"
                        className={`${styles["input"]} ${styles["input-large"]}`}
                        placeholder="Insira seu nome"
                    />
                </div>

                <div className={styles["inputContainer"]}>
                    <label htmlFor="telefone" className={styles["label"]}>Telefone</label>
                    <input
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                        id="telefone"
                        type="text"
                        className={`${styles["input"]} ${styles["input-large"]}`}
                        placeholder="Insira seu telefone"
                    />
                </div>

                <div className={styles["inputContainer"]}>
                    <label htmlFor="email" className={styles["label"]}>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="email"
                        type="text"
                        className={`${styles["input"]} ${styles["input-large"]}`}
                        placeholder="Insira seu email"
                    />
                </div>

                <div className={styles["inputContainer"]}>
                    <label htmlFor="senha" className={styles["label"]}>Senha</label>
                    <input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        id="senha"
                        type="password"
                        className={`${styles["input"]} ${styles["input-large"]}`}
                        placeholder="Insira sua senha"
                        minLength={8}
                    />
                </div>

                <div className={styles["checkboxContainer"]}>
                    <input
                        checked={aceitarTermos}
                        onChange={(e) => setAceitarTermos(e.target.checked)}
                        required
                        type="checkbox"
                        className={styles["checkboxInput"]}
                        id="aceitar"
                    />
                    <label htmlFor="aceitar" className={styles["label"]}>
                        Eu aceito os <a href="#" className={styles["linkTerms"]}>Termos e Condições</a>
                    </label>
                </div>

                <button type="submit" className={styles["button"]}>Cadastrar</button>
            </form>

            <div className={styles["linkContainer"]}>
                <p>Já tem uma conta?</p>
                <a href="#" className={styles["link"]}>Acesse aqui</a>
            </div>
        </div>
    );
};

export default FormRegisterCliente;
