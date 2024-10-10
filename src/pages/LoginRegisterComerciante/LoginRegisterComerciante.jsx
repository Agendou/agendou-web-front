import React, { useState } from "react";
import FormLogin from '../../components/FormLogin/FormLogin';
import FormRegister from '../../components/FormRegisterComerciante/FormRegisterComerciante';
import AuthPanel from '../../components/AuthPanel/AuthPanel';
import styles from './LoginRegisterComerciante.module.css';

const LoginRegisterComerciante = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className={`${styles.container} ${isLogin ? '' : styles.registerMode}`}>
            {isLogin ? (
                <>
                    <div className={styles["leftPanel"]}>
                        <FormLogin />
                    </div>
                    <div className={styles["rightPanel"]}>
                        <AuthPanel
                            isLogin={isLogin}
                            switchForm={switchForm}
                            titleLogin="Cadastro"
                            titleRegister="Já tem uma conta?"
                            messageLogin="Junte-se a nós e comece a otimizar o seu tempo!
                            Ao se cadastrar, você terá acesso a uma plataforma fácil e intuitiva, onde poderá agendar seus serviços de uma forma rápida e prática.
                            Aproveite todos os benefícios de gerenciar seus compromissos em um só lugar."
                            messageRegister="Acesse sua conta e continue gerenciando seus agendamentos com facilidade. Mantenha seu
                            tempo otimizado e seus compromissos sempre organizados."
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
                            titleLogin="Cadastro"
                            titleRegister="Já tem uma conta?"
                            messageLogin="Junte-se a nós e comece a otimizar o seu tempo!
                            Ao se cadastrar, você terá acesso a uma plataforma fácil e intuitiva, onde poderá agendar seus serviços de uma forma rápida e prática.
                            Aproveite todos os benefícios de gerenciar seus compromissos em um só lugar."
                            messageRegister="Acesse sua conta e continue gerenciando seus agendamentos com facilidade. Mantenha seu
                            tempo otimizado e seus compromissos sempre organizados."
                            buttonTextLogin="Entrar"
                            buttonTextRegister="Cadastre-se"
                        />
                    </div>
                    <div className={styles["rightPanel"]}>
                        <FormRegister />
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginRegisterComerciante;



