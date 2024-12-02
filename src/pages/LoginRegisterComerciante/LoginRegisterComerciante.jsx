import React, { useState } from "react";
import FormLogin from "../../components/FormLogin/FormLogin";
import FormRegister from "../../components/FormRegisterCliente/FormRegisterCliente";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import styles from "./LoginRegisterComerciante.module.css";

const LoginRegisterCliente = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.page}>
      <div
        className={`${styles.container} ${isLogin ? "" : styles.registerMode}`}
      >
        <div
          className={`${styles.leftPanel} ${
            isLogin ? styles.showLeftPanel : ""
          }`}
        >
          {isLogin ? (
            <FormLogin switchForm={switchForm} />
          ) : (
            <AuthPanel
              isLogin={isLogin}
              switchForm={switchForm}
              titleLogin="Cadastro"
              titleRegister="Já tem uma conta?"
              messageLogin="Seja bem-vindo! Cadastre-se para acessar uma plataforma personalizada para seus agendamentos. 
                            Simplifique sua rotina e aproveite o melhor serviço."
              messageRegister="Acesse sua conta e continue organizando seus compromissos com praticidade. 
                            Tudo ao seu alcance em um só lugar."
              buttonTextLogin="Entrar"
              buttonTextRegister="Cadastre-se"
            />
          )}
        </div>
        <div
          className={`${styles.rightPanel} ${
            !isLogin ? styles.showRightPanel : ""
          }`}
        >
          {isLogin ? (
            <AuthPanel
              isLogin={isLogin}
              switchForm={switchForm}
              titleLogin="Cadastro"
              titleRegister="Já tem uma conta?"
              messageLogin="Seja bem-vindo! Cadastre-se para acessar uma plataforma personalizada para seus agendamentos. 
                            Simplifique sua rotina e aproveite o melhor serviço."
              messageRegister="Acesse sua conta e continue organizando seus compromissos com praticidade. 
                            Tudo ao seu alcance em um só lugar."
              buttonTextLogin="Entrar"
              buttonTextRegister="Cadastre-se"
            />
          ) : (
            <FormRegister switchForm={switchForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterCliente;
