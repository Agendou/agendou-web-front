import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../FormLogin/FormLogin.module.css';
import logo from '../../assets/images/logoEscuraAgendou.png';
import { ValidationLoginMessages } from '../FormLogin/ValidationLoginMessages';
import { toast } from "react-toastify";
import api from '../../services/api';

const FormLogin = ({ switchForm }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationMessages = ValidationLoginMessages(email, senha);

        if (validationMessages) {
            toast.error(validationMessages);
            return;
        }

        try {
            const response = await api.post('api/empresas/login', { email, senha });

            // const response = await api.post('/usuarios/login', { email, senha }, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     }
            // });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmpresa', response.data.usuario.representante);

            localStorage.setItem('empresaId', response.data.usuario.id);

            const empresaId = response.data.usuario.id;
            console.log(empresaId);

            toast.success("Seja bem vindo(a)!");

            navigate('/dashboard');

        } catch (error) {

            toast.error("Erro ao fazer login: " + (error.response?.data || error.message));

        }
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

                <button type="submit" className={styles["button"]}>Entrar</button>
            </form>

            <div className={styles["linkContainer"]}>
                <p>Não tem uma conta?</p>
                <button className={styles["link"]} onClick={switchForm}>Registre-se</button>

            </div>
            <button
                className={styles["button"]}
                onClick={() => navigate('/login-register-user')}
            >
                Entrar como cliente
            </button>
        </div>
    );
}

export default FormLogin;