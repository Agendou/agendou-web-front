import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './FormLogin.module.css';
import logo from '../../assets/images/logoEscuraAgendou.png';
import { ValidationLoginMessages } from './ValidationLoginMessages';
import { toast } from "react-toastify";

const FormLogin = ({ switchForm }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [lembrar, setLembrar] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationMessages = ValidationLoginMessages(email, senha);

        if (validationMessages) {
            toast.error(validationMessages);
            return;
        }

        return toast.success("Bem vindo(a) de volta!");
    };

    const handleLogoClick = () => {
        navigate("/home");
    };

    return (
        <div className={styles["form-container"]}>
            <img src={logo} alt="Logotipo Agendou" className={styles["logo"]} onClick={handleLogoClick} />
            <h2>Bem vindo!</h2>
            <p>Insira seus dados para continuar</p>

            <form onSubmit={handleSubmit}>
                <div className={styles["inputContainer"]}>
                    <label htmlFor="email" className={styles["label"]}>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="email"
                        type="email"
                        className={styles["input"]}
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
                        className={styles["input"]}
                        placeholder="Insira sua senha"
                    />
                </div>

                <div className={styles["checkboxLinkContainer"]}>
                    <div className={styles["checkboxContainer"]}>
                        <input
                            checked={lembrar}
                            onChange={(e) => setLembrar(e.target.checked)}
                            type="checkbox"
                            className={styles["checkboxInput"]}
                            id="lembrar"
                        />
                        <label htmlFor="lembrar" className={styles["label"]}>Lembrar</label>
                    </div>

                    <a href="#" className={styles["link"]}>Esqueceu sua senha?</a>
                </div>

                <button type="submit" className={styles["button"]}>Entrar</button>
            </form>

            <div className={styles["linkContainer"]}>
                <p>Não tem uma conta?</p>
                <a href="#" className={styles["link"]} onClick={switchForm}>Registre-se</a>
            </div>
        </div>
    );
}

export default FormLogin;
