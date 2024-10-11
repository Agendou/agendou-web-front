import React, { useState } from "react";
import FormLogin from '../../components/FormLogin/FormLogin';
import AuthPanel from '../../components/AuthPanel/AuthPanel';
import styles from './LoginRegisterCliente.module.css';
import FormRegisterCliente from "../../components/FormRegisterCliente/FormRegisterCliente";

const LoginRegisterCliente = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className={`${styles.container} ${isLogin ? '' : styles.registerMode}`}>
            {isLogin ? (
                <>
                    <div className={styles["leftPanel"]}>
                        <FormLogin switchForm={switchForm} />
                    </div>
                    <div className={styles["rightPanel"]}>
                        <AuthPanel
                            isLogin={isLogin}
                            switchForm={switchForm}
                            titleLogin="Não tem conta?"
                            titleRegister="Já tem conta?"
                            messageLogin="Junte-se a nós e comece a agendar com seu profissional favorito!"
                            messageRegister="Acesse sua conta e continue agendando com seu profissional favorito!"
                            buttonTextLogin="Entrar"
                            buttonTextRegister="Cadastre-se"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className={styles["leftPanel"]}>
                        <AuthPanel
                            isLogin={isLogin}
                            switchForm={switchForm}
                            titleLogin="Não tem conta?"
                            titleRegister="Já tem conta?"
                            messageLogin="Junte-se a nós e comece a agendar com seu profissional favorito!"
                            messageRegister="Acesse sua conta e continue agendando com seu profissional favorito!"
                            buttonTextLogin="Entrar"
                            buttonTextRegister="Cadastre-se"
                        />
                    </div>
                    <div className={styles["rightPanel"]}>
                        <FormRegisterCliente switchForm={switchForm} />
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginRegisterCliente;
