import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Dashboard.module.css';
import api from '../../services/api';
import Navigation from '../../components/Navigation/Navigation';
import { toast } from 'react-toastify';

const getColor = (value, maxValue) => {
  const ratio = value / maxValue;
  if (ratio < 0.33) return 'rgb(136, 131, 160)';
  if (ratio < 0.67) return 'rgb(85, 91, 148)';
  return 'rgb(116, 147, 194)';
};

const getKPIColor = (value, thresholds) => {
  if (value >= thresholds.high) return 'rgb(56, 49, 92)';
  if (value >= thresholds.medium) return 'rgb(85, 91, 148)';
  return 'rgb(116, 147, 194)';
};

const Dashboard = () => {
  const [totalClientesAtivos, setTotalClientesAtivos] = useState(0);
  const [totalAgendamentos, setTotalAgendamentos] = useState(0);
  const [novosClientes, setNovosClientes] = useState(0);
  const [totalAgendamentosMes, setTotalAgendamentosMes] = useState(0);
  const [servicosMaisRequisitados, setServicosMaisRequisitados] = useState([]);
  const [horariosPicoAtendimento, setHorariosPicoAtendimento] = useState([]);
  const [taxaCancelamento, setTaxaCancelamento] = useState(0);

  const fetchTotalClientesAtivos = async () => {
    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');

    if (!token || !empresaId) {
      console.warn("[fetchServicosMaisRequisitados] Token ou Empresa ID ausente.");
      toast.warn("Sessão expirada ou dados de empresa não encontrados. Faça login novamente.");
      return;
    }

    try {
      const response = await api.get(`/historico/usuarios-ativos/${empresaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (Array.isArray(response.data)) {
        const total = response.data.length;
        setTotalClientesAtivos(total);
        console.log(`[Frontend] Total de usuários ativos: ${total}`);

        if (total === 0) {
          toast.info('Nenhum cliente ativo encontrado nos últimos 2 meses.');
        }

        return total;
      } else {
        console.warn('[Frontend] Resposta inesperada da API:', response.data);
        toast.error('Erro ao processar os dados de usuários ativos.');
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.info('[Frontend] Nenhum usuário ativo encontrado (404).');
        setTotalClientesAtivos(0);
        toast.info('Nenhum cliente ativo encontrado nos últimos 2 meses.');
        return 0;
      }
    }
  };

  const fetchTotalAgendamentos = async () => {
    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');

    if (!token || !empresaId) {
      console.warn("[fetchServicosMaisRequisitados] Token ou Empresa ID ausente.");
      toast.warn("Sessão expirada ou dados de empresa não encontrados. Faça login novamente.");
      return;
    }

    try {
      const response = await api.get(`/agendamentos/empresa/${empresaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (Array.isArray(response.data)) {
        setTotalAgendamentos(response.data.length);
        console.log(`[Frontend] Total de agendamentos recebidos: ${response.data.length}`);
        return response.data.length;
      } else {
        console.error('[Frontend] Resposta inesperada da API:', response.data);
        toast.error('Erro ao processar os dados de agendamento.');
      }

    } catch (error) {
      console.error('[Frontend] Erro ao buscar total de agendamentos por empresa:', error);
      toast.error('Erro ao buscar agendamentos. Tente novamente mais tarde.');
      setTotalAgendamentos(0);
      throw error;
    }
  };


  useEffect(() => {
    fetchTotalAgendamentos();
    fetchTotalClientesAtivos();
    fetchTotalAgendamentosMes();
    fetchNovosClientes();
    fetchTaxaCancelamento();
    fetchServicosMaisRequisitados();
  }, []);

  const fetchNovosClientes = async () => {

    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');

    if (!token || !empresaId) {
      console.warn("[fetchServicosMaisRequisitados] Token ou Empresa ID ausente.");
      toast.warn("Sessão expirada ou dados de empresa não encontrados. Faça login novamente.");
      return;
    }

    try {
      const response = await api.get(`/agendamentos/empresa/novos-clientes-mes-atual/${empresaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const totalClientes = response.data;

      setNovosClientes(totalClientes);
      console.log("Novos clientes:", totalClientes);
      return totalClientes;

    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.info('Nenhum novo cliente encontrado neste mês.');
        console.log("Nenhum novo cliente encontrado neste mês (404 recebido).");
        setNovosClientes([]);
        return [];
      }
      console.error('Erro ao buscar total de agendamentos do mês:', error);
      toast.error('Erro ao buscar novos clientes. Tente novamente mais tarde.');
      setNovosClientes(0);
      throw error;
    }
  };

  const fetchTotalAgendamentosMes = async () => {

    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');

    if (!token || !empresaId) {
      console.warn("[fetchServicosMaisRequisitados] Token ou Empresa ID ausente.");
      toast.warn("Sessão expirada ou dados de empresa não encontrados. Faça login novamente.");
      return;
    }


    try {
      const response = await api.get(`/agendamentos/empresa/agendamentos-por-mes/${empresaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Dados recebidos de agendamentos por mês:", response.data);

      const mesesDoAno = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];

      const formattedData = mesesDoAno.map(mes => [
        mes,
        response.data[mes] || 0
      ]);

      const chartData = [['Mês', 'Total Agendamentos'], ...formattedData];

      setTotalAgendamentosMes(chartData);

      console.log("Dados formatados para o gráfico:", chartData);
    } catch (error) {
      console.error('Erro ao buscar total de agendamentos do mês:', error);
      toast.error('Erro ao buscar total de agendamentos do mês. Tente novamente mais tarde.');
      setTotalAgendamentosMes([]);
    }
  };

  const fetchServicosMaisRequisitados = async () => {

    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');

    if (!token || !empresaId) {
      console.warn("[fetchServicosMaisRequisitados] Token ou Empresa ID ausente.");
      toast.warn("Sessão expirada ou dados de empresa não encontrados. Faça login novamente.");
      return;
    }

    try {
      const response = await api.get(`agendamentos/empresa/servicos-mais-requisitados/${empresaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setServicosMaisRequisitados(response.data.map(item => [item.nome, item.quantidade]));

      console.log("Serviços mais requisitados:", response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços mais requisitados:', error);
      toast.error('Erro ao buscar serviços mais requisitados. Tente novamente mais tarde.');
      setServicosMaisRequisitados([]);
    }
  };

  const fetchHorariosPicoAtendimento = async () => {

    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');

    if (!token || !empresaId) {
      console.warn("[fetchHorariosPicoAtendimento] Token ou Empresa ID ausente.");
      toast.warn("Sessão expirada ou dados de empresa não encontrados. Faça login novamente.");
      return;
    }

    try {

      console.log(`[fetchHorariosPicoAtendimento] Buscando horários de pico para empresa ID ${empresaId}...`);

      const response = await api.get(`/agendamentos/empresa/horarios-pico/${empresaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const horarios = response.data.map(item => [
        `Hora: ${item[0]}`,
        item[1],
      ]);
      console.log("[fetchHorariosPicoAtendimento] Horários de pico:", horarios);
      setHorariosPicoAtendimento(horarios);
      console.log("Horários de pico de atendimento:", horarios);
    } catch (error) {
      console.error('Erro ao buscar horários de pico de atendimento:', error);
      toast.error('Erro ao buscar horários de pico de atendimento. Tente novamente mais tarde.');
      setHorariosPicoAtendimento([]);
    }
  };

  const fetchTaxaCancelamento = async () => {

    const token = localStorage.getItem('token');
    const empresaId = localStorage.getItem('empresaId');

    if (!token || !empresaId) {
      console.warn("[fetchTaxaCancelamento] Token ou empresaId não encontrados.");
      toast.warn("Sessão expirada ou dados da empresa ausentes. Faça login novamente.");
      return;
    }

    try {
      console.log(`[fetchTaxaCancelamento] Buscando taxa de cancelamento para empresa ID ${empresaId}...`);

      const response = await api.get(`/historico/cancelados/empresa/${empresaId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const totalCancelados = response.data;

      if (totalCancelados === 0) {
        console.info("[fetchTaxaCancelamento] Nenhum cancelamento registrado.");
        toast.success("Nenhum cancelamento registrado para esta empresa. Ótimo sinal!");
      }

      setTaxaCancelamento(totalCancelados);
      console.log(`[fetchTaxaCancelamento] Total de cancelamentos: ${totalCancelados}`);
      return totalCancelados;

    } catch (error) {
      console.error("[fetchTaxaCancelamento] Erro ao buscar taxa de cancelamento:", error);

    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchTotalClientesAtivos(token);
      fetchTotalAgendamentos(token);
      fetchNovosClientes(token);
      fetchTotalAgendamentosMes(token);
      fetchServicosMaisRequisitados(token);
      fetchHorariosPicoAtendimento(token);
      fetchTaxaCancelamento(token);
    }
  }, []);

  const renderGrowthBar = (currentValue, previousValue, isCancellation = false) => {
    const growth = currentValue - previousValue;
    const percentageGrowth = (growth / previousValue) * 100;

    return (
      <div className={styles.growthBarContainer}>
        <div
          className={styles.growthBar}
          style={{
            width: `${Math.abs(percentageGrowth)}%`,
            backgroundColor: isCancellation ? 'red' : 'green',
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.bodyD} style={{ overflow: 'hidden', height: '100vh' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar isVisible={true} />
        <div style={{ flex: 1, padding: '20px', overflow: 'hidden' }}>
          <div className={styles.header}>
            < Navigation />
            <h1 className={styles.headerTitle}>Painel de Monitoramento Geral</h1>
            <div className={styles.headerIcons}>
              {/* <FaBell className={styles.notificationIcon} /> */}
            </div>
          </div>

          <div className={styles.dashboardContainer}>
            <div className={styles.leftDashboards}>
              {[
                { title: 'Total Clientes Ativos', value: totalClientesAtivos },
                { title: 'Total Agendamentos', value: totalAgendamentos },
                { title: 'Novos Clientes', value: novosClientes },
                { title: 'Total Agendamentos Cancelados', value: `${taxaCancelamento}` },
              ].map(({ title, value, range, isCancellation }, index) => (
                <div className={styles.dashboardCard} key={index}>
                  <h3>{title}</h3>
                  <span className={`${styles.dateRange} ${isCancellation ? styles.redDateRange : ''}`}>{range}</span>
                  <p>{value}</p>
                  {isCancellation && renderGrowthBar(800, 550, isCancellation)}
                </div>
              ))}
            </div>

            <div className={`${styles.dashboardCardLarge} ${styles.rendaMensalBruta}`} style={{ marginTop: '50px', marginRight: '10px' }}>
              <h3>Total Agendamentos Mês</h3>
              <Chart
                chartType="LineChart"
                width="100%"
                height="200px"
                data={totalAgendamentosMes} // Verifique se é uma matriz 2D
                options={{
                  hAxis: { title: 'Mês' },
                  vAxis: { title: 'Quantidade' },
                  legend: { position: 'none' },
                  colors: ['#010726'],
                  lineWidth: 3,
                  pointsVisible: true,
                }}
              />

            </div>


          </div>

          <div className={styles.dashboardContainer}>
            {[
              { title: 'Serviços Mais Requisitados', data: servicosMaisRequisitados, thresholds: { high: 200, medium: 160, down: 80 } },
              { title: 'Horário de Pico de Atendimento', data: horariosPicoAtendimento, thresholds: { high: 700, medium: 500, down: 300 } },
            ].map(({ title, data, thresholds }, index) => (
              <div key={index} className={`${styles.dashboardCardLarge} ${styles.whiteBackground}`}>
                <h3>{title}</h3>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="200px"
                  data={[
                    [title, 'Quantidade', { role: 'style' }],
                    ...data.map(item => [
                      item[0],
                      item[1],
                      getColor(item[1], Math.max(...data.map(i => i[1])))
                    ]),
                  ]}
                  options={{
                    hAxis: { textStyle: { fontSize: 11 } },
                    vAxis: { title: 'Quantidade de Agendamentos' },
                    legend: { position: 'none' },
                  }}
                />
                <div className={styles.kpiContainer}>
                  {['Alto', 'Médio', 'Baixo'].map((label, i) => (
                    <React.Fragment key={label}>
                      <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(Math.max(...data.map(i => i[1])), thresholds) }}></div>
                      <span>{label}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;