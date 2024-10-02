import React from "react";

const AuthPanel = ({ isLogin, switchForm }) => {
    return (
        <div className="auth-panel">
            {isLogin ? (
                <div>
                    <h2>Cadastro</h2>
                    <p>Junte-se e comece a gerenciar seus agendamentos!</p>
                    <button onClick={switchForm}>Cadastre-se</button>
                </div>
            ) : (
                <div>
                    <h2>Já tem uma conta?</h2>
                    <p>Acesse sua conta para continuar!</p>
                    <button onClick={switchForm}>Entrar</button>
                </div>
            )}
        </div>
    );
};

export default AuthPanel;