import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Dashboard.module.css';
import { FaBell } from 'react-icons/fa';
import api from '../../services/api';
import {
  getAgendamentos,
  getTotalClientesAtivos,
  getNovosClientes,
  getTotalAgendamentosMes,
  getFuncionariosMaisRequisitados,
  getServicosMaisRequisitados,
  getHorariosPicoAtendimento,
  getTaxaCancelamento
} from '../../services/agendamentoService';
import Navigation from '../../components/Navigation/Navigation';

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
  const [funcionariosMaisRequisitados, setFuncionariosMaisRequisitados] = useState([]);
  const [servicosMaisRequisitados, setServicosMaisRequisitados] = useState([]);
  const [horariosPicoAtendimento, setHorariosPicoAtendimento] = useState([]);
  const [taxaCancelamento, setTaxaCancelamento] = useState(0);

  const fetchTotalClientesAtivos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/agendamentos/usuarios-ativos", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setTotalClientesAtivos(response.data.length);
      console.log("Usuarios ativos:" + response.data.length);
      return response.data.length;
    } catch (error) {
      console.error('Erro ao buscar usuários ativos:', error);
      throw error;
    }
  };

  const fetchTotalAgendamentos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/agendamentos/listar", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setTotalAgendamentos(response.data.length);
      console.log(response.data.length);
      return response.data.length;
    } catch (error) {
      console.error('Erro ao buscar total de agendamentos do mês:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTotalAgendamentos();
    fetchTotalClientesAtivos();
    fetchTotalAgendamentosMes();
    fetchNovosClientes();
    fetchTaxaCancelamento();
    fetchFuncionariosMaisRequisitados();
    fetchServicosMaisRequisitados();
  }, []);

  const fetchNovosClientes = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/usuarios/novos-clientes", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setNovosClientes(response.data);
      console.log("Novos clientes" + response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar total de agendamentos do mês:', error);
      throw error;
    }
  };

  const fetchTotalAgendamentosMes = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/agendamentos/agendamentos-por-mes", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Dados recebidos de agendamentos por mês:", response.data);

      // Converte o objeto em um array de pares [mês, totalAgendamentos]
      const formattedData = Object.entries(response.data).map(([mes, totalAgendamentos]) => [
        mes,
        totalAgendamentos,
      ]);

      // Adiciona o cabeçalho ao array de dados
      const chartData = [['Mês', 'Total Agendamentos'], ...formattedData];

      // Atualiza o estado com os dados formatados
      setTotalAgendamentosMes(chartData);

      // Exibe os dados formatados no console
      console.log("Dados formatados para o gráfico:", chartData);
    } catch (error) {
      console.error('Erro ao buscar total de agendamentos do mês:', error);
    }
  };


  const fetchFuncionariosMaisRequisitados = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/agendamentos/funcionarios-mais-requisitados", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setFuncionariosMaisRequisitados(
        response.data.map((item) => [item.nome, item.quantidade])
      );
      console.log("Funcionários mais requisitados:", JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Erro ao buscar funcionários mais requisitados:', error);
    }
  };

  const fetchServicosMaisRequisitados = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/agendamentos/servicos-mais-requisitados", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setServicosMaisRequisitados(response.data.map((item) => [item.nome, item.quantidade]));
      console.log("Serviços mais requisitados:", response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços mais requisitados:', error);
    }
  };

  const fetchHorariosPicoAtendimento = async (token) => {
    try {
      const response = await api.get("/agendamentos/horarios-pico", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const horarios = response.data.map(item => [
        `Hora: ${item[0]}`,
        item[1],
      ]);
      setHorariosPicoAtendimento(horarios);
      console.log("Horários de pico de atendimento:", horarios);
    } catch (error) {
      console.error('Erro ao buscar horários de pico de atendimento:', error);
    }
  };

  const fetchTaxaCancelamento = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.get("/historico/cancelados", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setTaxaCancelamento(response.data);
      console.log("Número de cancelados" + response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar total de agendamentos do mês:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchTotalClientesAtivos(token);
      fetchTotalAgendamentos(token);
      fetchNovosClientes(token);
      fetchTotalAgendamentosMes(token);
      fetchFuncionariosMaisRequisitados(token);
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
              { title: 'Funcionários Mais Requisitados', data: funcionariosMaisRequisitados, thresholds: { high: 200, medium: 160, down: 100 } },
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