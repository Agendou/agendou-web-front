import React from "react";
import styles from './AuthPanel.module.css';

const AuthPanel = ({ isLogin, switchForm }) => {
    return (
        <div className={styles["container"]}>
            <div className={styles["leftPanel"]}>
                {isLogin ? (
                    <>
                        <h2>Cadastro</h2>
                        <p>Junte-se a nós e comece a otimizar o seu tempo!</p>
                        <p>Ao se cadastrar, você está acesso a uma plataforma fácil e intuitiva, onde poderá agendar seus serviços de forma rápida e prática.</p>
                        <p>Aproveite todos os benefícios de gerenciar seus compromissos em um só lugar!</p>
                        <button onClick={switchForm} className={styles["button"]}>Cadastre-se</button>
                    </>
                ) : (
                    <>
                        <h2>Já tem conta?</h2>
                        <p>Acesse sua conta e continue gerenciando seus agendamentos com facilidade. Mantenha seu tempo otimizado e seus compromissos sempre organizados!</p>
                        <button onClick={switchForm} className={styles["button"]}>Entrar</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPanel;
