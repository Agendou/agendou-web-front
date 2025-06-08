import React, { useEffect, useState, Component, useCallback } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { FaUsers, FaCalendarCheck, FaChartLine, FaTimesCircle, FaMoneyBillWave, FaExchangeAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import api from '../../services/api';
import Navigation from '../../components/Navigation/Navigation';
import { toast } from 'react-toastify';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Chart Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`${styles.errorText} text-sm`}>
          Erro ao renderizar o gráfico: {this.state.error?.message || 'Erro desconhecido'}
        </div>
      );
    }
    return this.props.children;
  }
}

const getColor = (value, maxValue) => {
  if (!maxValue || isNaN(value) || isNaN(maxValue)) return '#D1D5DB';
  const ratio = value / maxValue;
  if (ratio < 0.33) return '#D1D5DB';
  if (ratio < 0.67) return '#3B82F6';
  return '#1E3A8A';
};

const getKPIColor = (value, thresholds) => {
  if (!value || !thresholds) return '#D1D5DB';
  if (value >= thresholds.high) return '#1E3A8A';
  if (value >= thresholds.medium) return '#3B82F6';
  return '#D1D5DB';
};

const Dashboard = () => {
  const [totalClientesAtivos, setTotalClientesAtivos] = useState({ count: 0, list: [] });
  const [totalAgendamentos, setTotalAgendamentos] = useState(0);
  const [novosClientes, setNovosClientes] = useState({ count: 0, list: [] });
  const [totalAgendamentosMes, setTotalAgendamentosMes] = useState([]);
  const [servicosMaisRequisitados, setServicosMaisRequisitados] = useState([]);
  const [horariosPicoAtendimento, setHorariosPicoAtendimento] = useState([]);
  const [taxaCancelamento, setTaxaCancelamento] = useState(0);
  const [ganhosPrevistos, setGanhosPrevistos] = useState({ total: 0, monthly: [] });
  const [movimentacoes, setMovimentacoes] = useState(0);
  const [agendamentosRealizados, setAgendamentosRealizados] = useState(0);
  const [hasShownNoCancellationToast, setHasShownNoCancellationToast] = useState(false);
  const [hasShownSuccessToast, setHasShownSuccessToast] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkCache = useCallback((key, ttl) => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl && data) {
        return data;
      }
    }
    return null;
  }, []);

  const setCache = useCallback((key, data) => {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  }, []);

  const clearCache = useCallback((key) => {
    localStorage.removeItem(key);
  }, []);

  const fetchTotalClientesAtivos = useCallback(async (token, empresaId) => {
    const cacheKey = `clientesAtivos_${empresaId}`;
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setTotalClientesAtivos(cachedData);
      console.log(`[fetchTotalClientesAtivos] Dados carregados do cache: ${JSON.stringify(cachedData)}`);
      return cachedData;
    }

    try {
      console.log(`[fetchTotalClientesAtivos] Buscando dados do endpoint /api/historico/usuarios-ativos/${empresaId}`);
      const response = await api.get(`/api/historico/usuarios-ativos/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (Array.isArray(response.data)) {
        const data = {
          count: response.data.length,
          list: response.data.map(nome => ({ nome: nome || 'Sem nome' }))
        };
        setTotalClientesAtivos(data);
        setCache(cacheKey, data);
        console.log(`[fetchTotalClientesAtivos] Total de clientes ativos: ${data.count}, Lista: ${JSON.stringify(data.list)}`);
        if (data.count === 0) {
          toast.info('Nenhum cliente ativo encontrado nos últimos 2 meses.');
        }
        return data;
      } else {
        console.warn(`[fetchTotalClientesAtivos] Resposta inesperada: ${JSON.stringify(response.data)}`);
        toast.error('Erro ao carregar clientes ativos. Tente novamente.');
        return { count: 0, list: [] };
      }
    } catch (error) {
      console.error(`[fetchTotalClientesAtivos] Erro: ${error.message}`);
      if (error.response?.status === 404) {
        setTotalClientesAtivos({ count: 0, list: [] });
        toast.info('Nenhum cliente ativo encontrado nos últimos 2 meses.');
      } else {
        toast.error('Erro ao conectar com o servidor. Verifique sua conexão.');
      }
      return { count: 0, list: [] };
    }
  }, [checkCache, setCache]);

  const fetchTotalAgendamentos = useCallback(async (token, empresaId) => {
    const cacheKey = `agendamentos_${empresaId}`;
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setTotalAgendamentos(cachedData);
      console.log(`[fetchTotalAgendamentos] Dados carregados do cache: ${cachedData}`);
      return cachedData;
    }

    try {
      console.log(`[fetchTotalAgendamentos] Buscando dados do endpoint /api/agendamentos/empresa/${empresaId}`);
      const response = await api.get(`/api/agendamentos/empresa/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (Array.isArray(response.data)) {
        const count = response.data.length;
        setTotalAgendamentos(count);
        setCache(cacheKey, count);
        console.log(`[fetchTotalAgendamentos] Total de agendamentos: ${count}`);
        if (count >= 100 && !hasShownSuccessToast) {
          toast.success('Parabéns! Você atingiu 100 agendamentos hoje! 🎉');
          setHasShownSuccessToast(true);
        }
        return count;
      } else {
        console.warn(`[fetchTotalAgendamentos] Resposta inesperada: ${JSON.stringify(response.data)}`);
        toast.error('Erro ao carregar agendamentos.');
        return 0;
      }
    } catch (error) {
      console.error(`[fetchTotalAgendamentos] Erro: ${error.message}`);
      toast.error('Erro ao buscar agendamentos. Tente novamente.');
      setTotalAgendamentos(0);
      return 0;
    }
  }, [checkCache, setCache, hasShownSuccessToast]);

  const fetchNovosClientes = useCallback(async (token, empresaId) => {
    const cacheKey = `novosClientes_${empresaId}`;
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setNovosClientes(cachedData);
      console.log(`[fetchNovosClientes] Dados carregados do cache: ${JSON.stringify(cachedData)}`);
      return cachedData;
    }

    try {
      console.log(`[fetchNovosClientes] Buscando dados do endpoint /api/agendamentos/empresa/novos-clientes-mes-atual/${empresaId}`);
      const response = await api.get(`/api/agendamentos/empresa/novos-clientes-mes-atual/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = Array.isArray(response.data)
        ? { count: response.data.length, list: response.data.map(item => ({ nome: item.nome || 'Sem nome', ...item })) }
        : { count: response.data?.count || 0, list: [] };
      setNovosClientes(data);
      setCache(cacheKey, data);
      console.log(`[fetchNovosClientes] Total de novos clientes: ${data.count}, Lista: ${JSON.stringify(data.list)}`);
      if (data.count === 0) {
        toast.info('Nenhum novo cliente registrado este mês.');
      }
      return data;
    } catch (error) {
      console.error(`[fetchNovosClientes] Erro: ${error.message}`);
      if (error.response?.status === 404) {
        toast.info('Nenhum novo cliente registrado este mês.');
        setNovosClientes({ count: 0, list: [] });
      } else {
        toast.error('Erro ao carregar novos clientes.');
      }
      return { count: 0, list: [] };
    }
  }, [checkCache, setCache]);

  const fetchTotalAgendamentosMes = useCallback(async (token, empresaId) => {
    const cacheKey = `agendamentosMes_${empresaId}`;
    clearCache(cacheKey);
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setTotalAgendamentosMes(cachedData);
      console.log(`[fetchTotalAgendamentosMes] Dados carregados do cache: ${JSON.stringify(cachedData)}`);
      return cachedData;
    }

    try {
      console.log(`[fetchTotalAgendamentosMes] Buscando dados do endpoint /api/agendamentos/empresa/agendamentos-por-mes/${empresaId}`);
      const response = await api.get(`/api/agendamentos/empresa/agendamentos-por-mes/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      const mesesDoAno = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      const formattedData = mesesDoAno.map(mes => ({
        month: mes,
        count: response.data[mes] || 0
      }));

      setTotalAgendamentosMes(formattedData);
      setCache(cacheKey, formattedData);
      console.log(`[fetchTotalAgendamentosMes] Dados formatados: ${JSON.stringify(formattedData)}`);
      return formattedData;
    } catch (error) {
      console.error(`[fetchTotalAgendamentosMes] Erro: ${error.message}`);
      toast.error('Erro ao carregar agendamentos mensais');
      setTotalAgendamentosMes([]);
      return [];
    }
  }, [checkCache, setCache, clearCache]);

  const fetchServicosMaisRequisitados = useCallback(async (token, empresaId) => {
    const cacheKey = `servicosRequisitados_${empresaId}`;
    clearCache(cacheKey);
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setServicosMaisRequisitados(cachedData);
      console.log(`[fetchServicosMaisRequisitados] Dados carregados do cache: ${JSON.stringify(cachedData)}`);
      return cachedData;
    }

    try {
      console.log(`[fetchServicosMaisRequisitados] Buscando dados do endpoint /api/agendamentos/empresa/servicos-mais-requisitados/${empresaId}`);
      const response = await api.get(`/api/agendamentos/empresa/servicos-mais-requisitados/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!Array.isArray(response.data)) {
        console.warn(`[fetchServicosMaisRequisitados] Resposta inválida: ${JSON.stringify(response.data)}`);
        toast.error('Dados de serviços mais requisitados inválidos.');
        setServicosMaisRequisitados([]);
        return [];
      }

      const data = response.data.map(item => ({
        service: item.nome || 'Sem nome',
        count: Number(item.quantidade || 0)
      }));
      setServicosMaisRequisitados(data);
      setCache(cacheKey, data);
      console.log(`[fetchServicosMaisRequisitados] Dados formatados: ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      console.error(`[fetchServicosMaisRequisitados] Erro: ${error.message}`);
      toast.error('Erro ao carregar serviços mais requisitados.');
      setServicosMaisRequisitados([]);
      return [];
    }
  }, [checkCache, setCache, clearCache]);

  const fetchHorariosPicoAtendimento = useCallback(async (token, empresaId) => {
    const cacheKey = `horariosPico_${empresaId}`;
    clearCache(cacheKey);
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setHorariosPicoAtendimento(cachedData);
      console.log(`[fetchHorariosPicoAtendimento] Dados carregados do cache: ${JSON.stringify(cachedData)}`);
      return cachedData;
    }

    try {
      console.log(`[fetchHorariosPicoAtendimento] Buscando dados do endpoint /api/agendamentos/empresa/horarios-pico/${empresaId}`);
      const response = await api.get(`/api/agendamentos/empresa/horarios-pico/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!Array.isArray(response.data)) {
        console.warn(`[fetchHorariosPicoAtendimento] Resposta inválida: ${JSON.stringify(response.data)}`);
        toast.error('Dados de horários de pico inválidos.');
        setHorariosPicoAtendimento([]);
        return [];
      }

      const data = response.data.map(item => ({
        hour: `${Number(item[0]).toString().padStart(2, '0')}:00`,
        count: Number(item[1] || 0)
      }));
      setHorariosPicoAtendimento(data);
      setCache(cacheKey, data);
      console.log(`[fetchHorariosPicoAtendimento] Dados formatados: ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      console.error(`[fetchHorariosPicoAtendimento] Erro: ${error.message}`);
      toast.error('Erro ao carregar horários de pico.');
      setHorariosPicoAtendimento([]);
      return [];
    }
  }, [checkCache, setCache, clearCache]);

  const fetchTaxaCancelamento = useCallback(async (token, empresaId) => {
    const cacheKey = `taxaCancelamento_${empresaId}`;
    clearCache(cacheKey);
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setTaxaCancelamento(cachedData);
      console.log(`[fetchTaxaCancelamento] Dados carregados do cache: ${cachedData}`);
      return cachedData;
    }

    try {
      console.log(`[fetchTaxaCancelamento] Buscando dados do endpoint /api/historico/cancelados/empresa/${empresaId}`);
      const response = await api.get(`/api/historico/cancelados/empresa/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const totalCancelados = Array.isArray(response.data) ? response.data.length : response.data || 0;
      setTaxaCancelamento(totalCancelados);
      setCache(cacheKey, totalCancelados);
      console.log(`[fetchTaxaCancelamento] Total de cancelamentos: ${totalCancelados}`);
      if (totalCancelados === 0 && !hasShownNoCancellationToast) {
        toast.success('Nenhum cancelamento registrado. Ótimo trabalho! 🎉');
        setHasShownNoCancellationToast(true);
      }
      if (totalAgendamentos > 0 && (totalCancelados / totalAgendamentos) * 100 > 10 && !hasShownNoCancellationToast) {
        toast.warn('Atenção! A taxa de cancelamentos está aumentando. Considere revisar sua política de agendamentos.');
        setHasShownNoCancellationToast(true);
      }
      return totalCancelados;
    } catch (error) {
      console.error(`[fetchTaxaCancelamento] Erro: ${error.message}`);
      toast.error('Erro ao carregar taxa de cancelamento.');
      setTaxaCancelamento(0);
      return 0;
    }
  }, [checkCache, setCache, clearCache, hasShownNoCancellationToast, totalAgendamentos]);

  const fetchGanhosPrevistos = useCallback(async (token, empresaId) => {
    const cacheKey = `ganhosPrevistos_${empresaId}`;
    clearCache(cacheKey);
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setGanhosPrevistos(cachedData);
      console.log(`[fetchGanhosPrevistos] Dados carregados do cache: ${JSON.stringify(cachedData)}`);
      return cachedData;
    }

    try {
      console.log(`[fetchGanhosPrevistos] Buscando dados do endpoint /api/agendamentos/empresa/ganhos/${empresaId}`);
      const response = await api.get(`/api/agendamentos/empresa/ganhos/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log(`[fetchGanhosPrevistos] Resposta crua do backend: ${JSON.stringify(response.data)}`);

      const total = Number(response.data) || 0;
      const data = { total, monthly: [] };

      setGanhosPrevistos(data);
      setCache(cacheKey, data);
      console.log(`[fetchGanhosPrevistos] Ganhos formatados: ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      console.error(`[fetchGanhosPrevistos] Erro: ${error.message}`);
      toast.error('Erro ao carregar ganhos previstos.');
      const fallbackData = { total: 0, monthly: [] };
      setGanhosPrevistos(fallbackData);
      setCache(cacheKey, fallbackData);
      return fallbackData;
    }
  }, [checkCache, setCache, clearCache]);

  const fetchMovimentacoes = useCallback(async (token, empresaId) => {
    const cacheKey = `movimentacoes_${empresaId}`;
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setMovimentacoes(cachedData);
      console.log(`[fetchMovimentacoes] Dados carregados do cache: ${cachedData}`);
      return cachedData;
    }

    try {
      console.log(`[fetchMovimentacoes] Buscando dados do endpoint /api/historico/empresa/listar/${empresaId}`);
      const response = await api.get(`/api/historico/empresa/listar/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const count = Array.isArray(response.data) ? response.data.length : response.data || 0;
      setMovimentacoes(count);
      setCache(cacheKey, count);
      console.log(`[fetchMovimentacoes] Total de movimentações: ${count}`);
      return count;
    } catch (error) {
      console.error(`[fetchMovimentacoes] Erro: ${error.message}`);
      toast.error('Erro ao carregar movimentações.');
      setMovimentacoes(0);
      return 0;
    }
  }, [checkCache, setCache]);

  const fetchAgendamentosRealizados = useCallback(async (token) => {
    const cacheKey = `agendamentosRealizados`;
    const cachedData = checkCache(cacheKey, 5 * 60 * 1000);
    if (cachedData) {
      setAgendamentosRealizados(cachedData);
      console.log(`[fetchAgendamentosRealizados] Dados carregados do cache: ${cachedData}`);
      return cachedData;
    }

    try {
      console.log(`[fetchAgendamentosRealizados] Buscando dados do endpoint /api/historico/por-status?status=REALIZADO`);
      const response = await api.get(`/api/historico/por-status?status=REALIZADO`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const count = Array.isArray(response.data) ? response.data.length : response.data || 0;
      setAgendamentosRealizados(count);
      setCache(cacheKey, count);
      console.log(`[fetchAgendamentosRealizados] Total de agendamentos realizados: ${count}`);
      return count;
    } catch (error) {
      console.error(`[fetchAgendamentosRealizados] Erro: ${error.message}`);
      toast.error('Erro ao carregar agendamentos realizados.');
      setAgendamentosRealizados(0);
      return 0;
    }
  }, [checkCache, setCache]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');
    if (!token || !empresaId) {
      toast.warn('Sessão expirada! Faça login novamente para continuar.');
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchTotalClientesAtivos(token, empresaId),
          fetchTotalAgendamentos(token, empresaId),
          fetchNovosClientes(token, empresaId),
          fetchTotalAgendamentosMes(token, empresaId),
          fetchServicosMaisRequisitados(token, empresaId),
          fetchHorariosPicoAtendimento(token, empresaId),
          fetchTaxaCancelamento(token, empresaId),
          fetchGanhosPrevistos(token, empresaId),
          fetchMovimentacoes(token, empresaId),
          fetchAgendamentosRealizados(token)
        ]);
      } catch (error) {
        console.error(`[fetchAllData] Erro ao carregar dados: ${error.message}`);
        toast.error('Erro ao carregar dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [
    fetchTotalClientesAtivos,
    fetchTotalAgendamentos,
    fetchNovosClientes,
    fetchTotalAgendamentosMes,
    fetchServicosMaisRequisitados,
    fetchHorariosPicoAtendimento,
    fetchTaxaCancelamento,
    fetchGanhosPrevistos,
    fetchMovimentacoes,
    fetchAgendamentosRealizados
  ]);

  useEffect(() => {
    console.log('totalAgendamentosMes:', JSON.stringify(totalAgendamentosMes));
    console.log('servicosMaisRequisitados:', JSON.stringify(servicosMaisRequisitados));
    console.log('horariosPicoAtendimento:', JSON.stringify(horariosPicoAtendimento));
    console.log('totalClientesAtivos:', JSON.stringify(totalClientesAtivos));
    console.log('ganhosPrevistos:', JSON.stringify(ganhosPrevistos));
  }, [totalAgendamentosMes, servicosMaisRequisitados, horariosPicoAtendimento, totalClientesAtivos, ganhosPrevistos]);

  const renderGrowthBar = (currentValue, previousValue, isCancellation = false) => {
    const growth = currentValue - previousValue;
    const percentageGrowth = previousValue ? (growth / previousValue) * 100 : 0;

    return (
      <div className="w-full bg-gray-200 rounded h-2.5">
        <div
          className="h-2.5 rounded"
          style={{
            width: `${Math.min(Math.abs(percentageGrowth), 100)}%`,
            backgroundColor: isCancellation ? '#EF4444' : '#10B981'
          }}
        />
      </div>
    );
  };

  const agendamentosMesChartData = {
    labels: totalAgendamentosMes.map(item => item.month),
    datasets: [{
      label: 'Total Agendamentos',
      data: totalAgendamentosMes.map(item => item.count),
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F6',
      fill: false,
      tension: 0.1,
      pointRadius: 4
    }]
  };

  const servicosRequisitadosChartData = {
    labels: servicosMaisRequisitados.map(item => item.service),
    datasets: [{
      label: 'Quantidade',
      data: servicosMaisRequisitados.map(item => item.count),
      backgroundColor: servicosMaisRequisitados.map(item =>
        getColor(item.count, Math.max(...servicosMaisRequisitados.map(i => i.count) || [1]))
      ),
      borderColor: '#1E3A8A',
      borderWidth: 1
    }]
  };

  const horariosPicoChartData = {
    labels: horariosPicoAtendimento.map(item => item.hour),
    datasets: [{
      label: 'Quantidade',
      data: horariosPicoAtendimento.map(item => item.count),
      backgroundColor: horariosPicoAtendimento.map(item =>
        getColor(item.count, Math.max(...horariosPicoAtendimento.map(i => i.count) || [1]))
      ),
      borderColor: '#1E3A8A',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      x: {
        title: { display: true, text: '', color: '#ffffff', font: { size: 10 } },
        ticks: { color: '#ffffff', font: { size: 10 } }
      },
      y: {
        title: { display: true, text: 'Quantidade', color: '#ffffff', font: { size: 10 } },
        ticks: { color: '#ffffff', font: { size: 10 } },
        beginAtZero: true
      }
    },
    animation: { duration: 800, easing: 'easeOutCubic' }
  };

  if (loading) {
    return <div className={`${styles.loadingText} text-center p-4`}>Carregando dashboard...</div>;
  }

  return (
    <div className={styles.container}>
      <Link to="/manual-appointment-admin" className={styles.arrowLink} title="Voltar para Agendamentos">
        <FaArrowLeft />
      </Link>
      <div className={styles.content}>
        <div className={styles.header}>
          <Navigation />
          <h1 className="text-lg font-bold text-white">Painel de Monitoramento Geral</h1>
          <div>{/* Ícones de notificação ou perfil podem ser adicionados aqui */}</div>
        </div>

        <div className={styles.kpiGrid}>
          {[
            {
              title: 'Total Clientes Ativos',
              subtitle: 'Usuários que realizaram agendamentos nos últimos 2 meses',
              value: totalClientesAtivos.count,
              icon: <FaUsers />,
              list: totalClientesAtivos.list
            },
            {
              title: 'Total Agendamentos',
              subtitle: 'Total de agendamentos registrados na plataforma',
              value: totalAgendamentos,
              icon: <FaCalendarCheck />
            },
            {
              title: 'Novos Clientes',
              subtitle: 'Clientes que realizaram seu primeiro agendamento este mês',
              value: novosClientes.count,
              icon: <FaUsers />,
              list: novosClientes.list
            },
            {
              title: 'Agendamentos Cancelados',
              subtitle: 'Total de agendamentos cancelados recentemente',
              value: taxaCancelamento,
              icon: <FaTimesCircle />,
              isCancellation: true
            },
            {
              title: 'Ganhos Previstos',
              subtitle: 'Ganhos previstos nos agendamentos ainda não realizados',
              value: `R$ ${ganhosPrevistos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: <FaMoneyBillWave />
            },
            {
              title: 'Movimentações',
              subtitle: 'Movimentações dos usuários dentro do app',
              value: movimentacoes,
              icon: <FaExchangeAlt />
            },
            {
              title: 'Atendimentos Realizados',
              subtitle: 'Total de agendamentos concluídos com sucesso',
              value: agendamentosRealizados,
              icon: <FaChartLine />
            }
          ].map(({ title, subtitle, value, icon, list, isCancellation }, index) => (
            <div key={index} className={styles.kpiCard}>
              <div className="flex items-center space-x-2">
                <div className="text-white text-2xl">{icon}</div>
                <div>
                  <h3 className={styles.kpiTitle}>{title}</h3>
                  <p className={styles.kpiSubtitle}>{subtitle}</p>
                </div>
              </div>
              <p className={styles.kpiValue}>{value}</p>
              {list && list.length > 0 && (
                <details className="mt-2">
                  <summary className={`${styles.clientListText} text-sm cursor-pointer`}>Ver clientes</summary>
                  <ul className={`${styles.clientListText} text-sm list-disc pl-5`}>
                    {list.map((usuario, i) => (
                      <li key={i}>
                        {usuario.nome} <button className={`${styles.detailButton} hover:underline`}>Oferecer Desconto</button>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              {isCancellation && renderGrowthBar(800, 550, true)}
            </div>
          ))}
        </div>

        <div className={styles.chartGrid}>
          {totalAgendamentosMes.length > 0 ? (
            <ErrorBoundary>
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Total Agendamentos por Mês</h3>
                <div style={{ height: '200px' }}>
                  <Line
                    data={agendamentosMesChartData}
                    options={{
                      ...chartOptions,
                      scales: {
                        ...chartOptions.scales,
                        x: { ...chartOptions.scales.x, title: { ...chartOptions.scales.x.title, text: 'Mês' } }
                      }
                    }}
                  />
                </div>
              </div>
            </ErrorBoundary>
          ) : (
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Total Agendamentos por Mês</h3>
              <p className={`${styles.clientListText} text-sm`}>Nenhum dado disponível para exibição.</p>
            </div>
          )}

          {servicosMaisRequisitados.length > 0 ? (
            <ErrorBoundary>
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Serviços Mais Requisitados</h3>
                <div style={{ height: '200px' }}>
                  <Bar
                    data={servicosRequisitadosChartData}
                    options={{
                      ...chartOptions,
                      scales: {
                        ...chartOptions.scales,
                        x: { ...chartOptions.scales.x, title: { ...chartOptions.scales.x.title, text: 'Serviço' } }
                      }
                    }}
                  />
                </div>
                <div className="flex justify-center mt-1 space-x-2 text-xs">
                  {['Alto', 'Médio', 'Baixo'].map((label, i) => (
                    <div key={label} className="flex items-center">
                      <div
                        className="w-2 h-2 rounded"
                        style={{
                          backgroundColor: getKPIColor(
                            Math.max(...servicosMaisRequisitados.map(i => i.count) || [0]),
                            { high: 10, medium: 5, down: 1 }
                          )
                        }}
                      ></div>
                      <span className={`${styles.clientListText} ml-1`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ErrorBoundary>
          ) : (
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Serviços Mais Requisitados</h3>
              <p className={`${styles.clientListText} text-sm`}>Nenhum dado disponível para exibição.</p>
            </div>
          )}

          {horariosPicoAtendimento.length > 0 ? (
            <ErrorBoundary>
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Horários de Pico</h3>
                <div style={{ height: '200px' }}>
                  <Bar
                    data={horariosPicoChartData}
                    options={{
                      ...chartOptions,
                      scales: {
                        ...chartOptions.scales,
                        x: { ...chartOptions.scales.x, title: { ...chartOptions.scales.x.title, text: 'Hora' } }
                      }
                    }}
                  />
                </div>
                <div className="flex justify-center mt-1 space-x-2 text-xs">
                  {['Alto', 'Médio', 'Baixo'].map((label, i) => (
                    <div key={label} className="flex items-center">
                      <div
                        className="w-2 h-2 rounded"
                        style={{
                          backgroundColor: getKPIColor(
                            Math.max(...horariosPicoAtendimento.map(i => i.count) || [0]),
                            { high: 8, medium: 4, down: 1 }
                          )
                        }}
                      ></div>
                      <span className={`${styles.clientListText} ml-1`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ErrorBoundary>
          ) : (
            <div className={styles.chartCard}>
              <h3 className={styles.chartTitle}>Horários de Pico</h3>
              <p className={`${styles.clientListText} text-sm`}>Nenhum dado disponível para exibição.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;