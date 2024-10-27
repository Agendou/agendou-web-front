import {
    validarCnpj,
    validarTelefone,
    validarEmail,
    validarSenha,
    validarCheckboxTermos,
    validarCampoTexto
} from './ValidationRegisterComerciante';

export const ValidationComercianteMessages = (formValues) => {
    const { cnpj, telefone, nomeEmpresa, representanteLegal, email, senha, aceitarTermos } = formValues;

    if (!validarCnpj(cnpj)) {
        return "CNPJ inválido.";
    }

    if (!validarTelefone(telefone)) {
        return "Por favor, insira um número de telefone válido.";
    }

    if (!validarCampoTexto(nomeEmpresa)) {
        return "Por favor insira o nome da empresa.";
    }

    if (!validarCampoTexto(representanteLegal)) {
        return "Por favor insira o nome do representante legal.";
    }

    if (!validarEmail(email)) {
        return "Por favor insira um email válido.";
    }

    if (!validarSenha(senha)) {
        return "A senha deve conter no mínimo 8 caracteres.";
    }

    if (!validarCheckboxTermos(aceitarTermos)) {
        return "Você deve aceitar os termos e condições para prosseguir."
    }

    return null;
}