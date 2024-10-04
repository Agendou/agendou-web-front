import React from "react";
import styles from './FormLogin.module.css';
import logo from '../../assets/images/logoEscuraAgendou.png';

const FormLogin = () => {
    return (
        <div className="form-container">
            <img src={logo} alt="Logotipo Agendou" className={styles["logo"]} />
            <h2>Bem vindo!</h2>
            <p>Insira seus dados para continuar</p>

            <div className={styles["inputContainer"]}>
                <label htmlFor="email" className={styles["label"]}>Email</label>
                <input
                    id="email"
                    type="email"
                    className={styles["input"]}
                    placeholder="Insira seu email"
                />
            </div>

            <div className={styles["inputContainer"]}>
                <label htmlFor="senha" className={styles["label"]}>Senha</label>
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
                    id="lembrar"
                />
                <label htmlFor="lembrar" className={styles["label"]}>Lembrar</label>
            </div>

            <div className={styles["linkContainer"]}>
                <a href="#" className={styles["link"]}>Esqueceu sua senha?</a>
            </div>

            <button className={styles["button"]}>Entrar</button>

            <div className={styles["linkContainer"]}>
                <p>Não tem uma conta?</p>
                <a href="#" className={styles["link"]}>Registre-se</a>
            </div>

        </div>
    )
}

export default FormLogin;