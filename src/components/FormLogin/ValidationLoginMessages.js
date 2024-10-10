import {
    validarEmail,
    validarSenha
} from './ValidationLogin';

export const ValidationLoginMessages = (formValues) => {
    const { email, senha } = formValues;

    if (!validarEmail(email)) {
        return "Por favor insira um email válido.";
    }

    if (!validarSenha(senha)) {
        return "Por favor insira sua senha.a";
    }

    return null;
}