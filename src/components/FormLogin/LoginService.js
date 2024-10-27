import axios from 'axios';

const API_URL = '/api/login'; //url API

export const login = async (email, senha, lembrar) => {
    try {
        const response = await axios.post(API_URL, { email, senha, lembrar });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Erro ao tentar fazer login";
    }
};
