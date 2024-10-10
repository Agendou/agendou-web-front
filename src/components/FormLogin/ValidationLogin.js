export const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !regexEmail.test(email)) {
        return false;
    }

    return true;
};


export const validarSenha = (senha) => {
    if (!senha) {
        return false;
    }

    return true;
};

