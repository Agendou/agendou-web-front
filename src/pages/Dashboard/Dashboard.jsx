import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Dashboard.module.css';
import { FaBell } from 'react-icons/fa';
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
  const [totalAgendamentosMes, setTotalAgendamentosMes] = useState([]);
  const [funcionariosMaisRequisitados, setFuncionariosMaisRequisitados] = useState([]);
  const [servicosMaisRequisitados, setServicosMaisRequisitados] = useState([]);
  const [horariosPicoAtendimento, setHorariosPicoAtendimento] = useState([]);
  const [taxaCancelamento, setTaxaCancelamento] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesAtivos, agendamentos, novosClientes, agendamentosMes, funcionarios, servicos, horarios, cancelamento] = await Promise.all([
          getTotalClientesAtivos(),
          getAgendamentos(),
          getNovosClientes(),
          getTotalAgendamentosMes(),
          getFuncionariosMaisRequisitados(),
          getServicosMaisRequisitados(),
          getHorariosPicoAtendimento(),
          getTaxaCancelamento()
        ]);

        setTotalClientesAtivos(clientesAtivos);
        setTotalAgendamentos(agendamentos.length);
        setNovosClientes(novosClientes);
        setTotalAgendamentosMes(agendamentosMes);
        setFuncionariosMaisRequisitados(funcionarios);
        setServicosMaisRequisitados(servicos);
        setHorariosPicoAtendimento(horarios);
        setTaxaCancelamento(cancelamento);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
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
            <h1 className={styles.headerTitle}>Painel de Monitoramento Geral</h1>
            <div className={styles.headerIcons}>
              <FaBell className={styles.notificationIcon} />
            </div>
          </div>

          <div className={styles.dashboardContainer}>
            <div className={styles.leftDashboards}>
              {[
                { title: 'Total Clientes Ativos', value: totalClientesAtivos, range: '10/10/24 à 14/10/24' },
                { title: 'Total Agendamentos', value: totalAgendamentos, range: '10/10/24 à 14/10/24' },
                { title: 'Novos Clientes', value: novosClientes, range: '10/10/24 à 14/10/24' },
                { title: 'Taxa de Cancelamento', value: `${taxaCancelamento}%`, range: '10/10/24 à 14/10/24', isCancellation: true },
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
              <h3>Total Agendamento Mês</h3>
              <Chart
                chartType="LineChart"
                width="100%"
                height="200px"
                data={[
                  ['Data', 'Quantidade'],
                  ...totalAgendamentosMes.map(agendamento => [new Date(agendamento.data).toLocaleDateString(), agendamento.quantidade])
                ]}
                options={{
                  hAxis: { title: 'Data' },
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
                  data={[['Item', 'Quantidade', { role: 'style' }], ...data.map(item => [item.nome, item.quantidade, getColor(item.quantidade, Math.max(...data.map(i => i.quantidade)))]),]}
                  options={{
                    hAxis: { textStyle: { fontSize: 11 } },
                    vAxis: { title: 'Quantidade' },
                    legend: { position: 'none' },
                  }}
                />
                <div className={styles.kpiContainer}>
                  {['Alto', 'Médio', 'Baixo'].map((label, i) => (
                    <React.Fragment key={label}>
                      <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(Math.max(...data.map(i => i.quantidade)), thresholds) }}></div>
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