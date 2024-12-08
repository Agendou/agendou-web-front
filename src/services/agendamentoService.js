import api from './api';

const getToken = () => localStorage.getItem('token');

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAgendamentos = async () => {
  try {
    const response = await api.get('/agendamentos/listar');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    throw error;
  }
};

export const getTotalClientesAtivos = async () => {
  try {
    const response = await api.get('/historico/usuarios-ativos');
    return response.data.length;
  } catch (error) {
    console.error('Erro ao buscar total de usuários ativos:', error);
    throw error;
  }
};

export const getNovosClientes = async () => {
  try {
    const response = await api.get('/clientes/novos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar novos clientes:', error);
    throw error;
  }
};

export const getTotalAgendamentosMes = async () => {
  try {
    const response = await api.get('/agendamentos/mes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar total de agendamentos do mês:', error);
    throw error;
  }
};

export const getFuncionariosMaisRequisitados = async () => {
  try {
    const response = await api.get('/funcionarios/mais-requisitados');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários mais requisitados:', error);
    throw error;
  }
};

export const getServicosMaisRequisitados = async () => {
  try {
    const response = await api.get('/servicos/mais-requisitados');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar serviços mais requisitados:', error);
    throw error;
  }
};

export const getHorariosPicoAtendimento = async () => {
  try {
    const response = await api.get('/horarios/pico');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar horários de pico de atendimento:', error);
    throw error;
  }
};

export const getTaxaCancelamento = async () => {
  try {
    const response = await api.get('/historico/media-cancelados');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar taxa de cancelamento:', error);
    throw error;
  }
};