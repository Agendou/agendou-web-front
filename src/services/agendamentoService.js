import api from './api';

export const getAgendamentos = async (token) => {
  try {
    const response = await api.get("/agendamentos/listar", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.length;
  } catch (error) {
    console.error('Erro ao buscar total de agendamentos do mês:', error);
    throw error;
  }
};

export const getTotalClientesAtivos = async (token) => {
  try {
    const response = await api.get('/historico/usuarios-ativos', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data.length;
  } catch (error) {
    console.error('Erro ao buscar total de usuários ativos:', error);
    throw error;
  }
};

export const getNovosClientes = async (token) => {
  try {
    const response = await api.get('/clientes/novos', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar novos clientes:', error);
    throw error;
  }
};

export const getTotalAgendamentosMes = async (token) => {
  try {
    const response = await api.get("/agendamentos/mes-atual-ou-ultimo", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.length;
  } catch (error) {
    console.error('Erro ao buscar total de agendamentos do mês:', error);
    throw error;
  }
};

export const getFuncionariosMaisRequisitados = async (token) => {
  try {
    const response = await api.get('/funcionarios/mais-requisitados', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários mais requisitados:', error);
    throw error;
  }
};

export const getServicosMaisRequisitados = async (token) => {
  try {
    const response = await api.get('/servicos/mais-requisitados', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar serviços mais requisitados:', error);
    throw error;
  }
};

export const getHorariosPicoAtendimento = async (token) => {
  try {
    const response = await api.get('/horarios/pico', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar horários de pico de atendimento:', error);
    throw error;
  }
};

export const getTaxaCancelamento = async (token) => {
  try {
    const response = await api.get('/historico/media-cancelados', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar taxa de cancelamento:', error);
    throw error;
  }
};
