import { toast } from 'react-toastify';
import {
    validarEmail,
    validarSenha
} from './ValidationLogin';

export const ValidationLoginMessages = (email, senha) => {

    if (!validarEmail(email)) {
        return toast.error("Por favor, insira um e-mail válido.");
    }

    if (!validarSenha(senha)) {
        return toast.error("Por favor, insira uma senha válida.");
    }

    return null;
}