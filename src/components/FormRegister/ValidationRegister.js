export const validarCnpj = (cnpj) => {
    const cnpjNumerico = cnpj.replace(/\D/g, '');

    if (cnpjNumerico.lentgh !== 14) {
        return false;
    }

    return true;
};

export const validarTelefone = (telefone) => {
    const telefoneNumerico = telefone.replace(/\D/g, '');

    if (telefoneNumerico.lentgh < 10 || telefoneNumerico.lentgh > 11) {
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

export const validarCheckboxTermos = (termoAceito) => {
    if (!termoAceito) {
        return false;
    }

    return true;
}

export const validarCampoTexto = (texto) => {
    if (texto.trim() === "") {
        return false;
    }

    return true;
}