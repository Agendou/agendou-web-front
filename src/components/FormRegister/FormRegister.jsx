import React, { useState } from "react";
import styles from './FormRegister.module.css';
import logo from '../../assets/images/logoEscuraAgendou.png';
import { ValidationRegisterMessages } from "./ValidationRegisterMessages";

const FormRegister = () => {

    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [representanteLegal, setRepresentanteLegal] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [aceitarTermos, setAceitarTermos] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formValues = { cnpj, telefone, nomeEmpresa, representanteLegal, email, senha, aceitarTermos };
        const validationMessages = ValidationRegisterMessages(formValues);

        if (validationMessages) {
            alert(validationMessages);
            return;
        }

        alert("Cadastrado com sucesso!")
    };

    return (
        <div className={styles["form-container"]}>
            <img src={logo} alt="Logotipo Agendou" className={styles["logo"]} />
            <h2>Cadastre-se</h2>
            <p>Saiba como podemos revolucionar o seu negócio!</p>

            <div className={styles["small-inputs-container"]}>
                <div className={`${styles["inputContainer"]} ${styles["input-small"]}`}>
                    <label htmlFor="cnpj" className={styles["label"]}>CNPJ</label>
                    <input
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        required
                        id="cnpj"
                        type="text"
                        className={styles["input"]}
                        placeholder="Insira seu CNPJ"
                    />
                </div>

                <div className={`${styles["inputContainer"]} ${styles["input-small"]}`}>
                    <label htmlFor="telefone" className={styles["label"]}>Telefone</label>
                    <input
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                        id="telefone"
                        type="text"
                        className={styles["input"]}
                        placeholder="Insira seu telefone"
                    />
                </div>
            </div>

            <div className={styles["inputContainer"]}>
                <label htmlFor="nomeEmpresa" className={styles["label"]}>Nome Empresa</label>
                <input
                    value={nomeEmpresa}
                    onChange={(e) => setNomeEmpresa(e.target.value)}
                    required
                    id="nomeEmpresa"
                    type="text"
                    className={`${styles["input"]} ${styles["input-large"]}`}
                    placeholder="Insira o nome da sua empresa"
                />
            </div>

            <div className={styles["inputContainer"]}>
                <label htmlFor="representanteLegal" className={styles["label"]}>Representante Legal</label>
                <input
                    value={representanteLegal}
                    onChange={(e) => setRepresentanteLegal(e.target.value)}
                    required
                    id="representanteLegal"
                    type="text"
                    className={`${styles["input"]} ${styles["input-large"]}`}
                    placeholder="Insira o nome do representante legal"
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

export default FormRegister;