import {
    validarCampoTexto,
    validarTelefone,
    validarEmail,
    validarSenha,
} from './ValidationRegisterCliente';

export const ValidationClienteMessages = (formValues) => {
    const { nome, telefone, email, senha } = formValues;

    if (!validarTelefone(telefone)) {
        return "Por favor, insira um número de telefone válido.";
    }

    if (!validarCampoTexto(nome)) {
        return "Por favor insira o nome da empresa.";
    }

    if (!validarEmail(email)) {
        return "Por favor insira um email válido.";
    }

    if (!validarSenha(senha)) {
        return "A senha deve conter no mínimo 8 caracteres.";
    }

    return null;
}