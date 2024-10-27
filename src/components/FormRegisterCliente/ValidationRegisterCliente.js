export const validarCampoTexto = (nome) => {
    if (nome.trim() === "") {
        return false;
    }

    return true;
}

export const validarTelefone = (telefone) => {
    const telefoneNumerico = telefone.replace(/\D/g, '');

    if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
        return false;
    }

    return true;
};

export const validarEmail = (email) => {
    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }

    return true;
}

export const validarSenha = (senha) => {
    if (senha.length < 8) {
        return false;
    }

    return true;
};