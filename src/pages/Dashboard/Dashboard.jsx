import React from 'react';
import { Chart } from 'react-google-charts';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Dashboard.module.css';
import { FaBell } from 'react-icons/fa';

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

const mockData = {
  revenue: [
    ['Month', 'Value'],
    ['Jan', 100],
    ['Fev', 33],
    ['Mar', 50],
    ['Abr', 20],
    ['Mai', 80],
    ['Jun', 80],
    ['Jul', 10],
    ['Ago', 40],
    ['Set', 45],
    ['Out', 50],
  ],
  employees: [
    ['Employee', 'Quantidade'],
    ['Joel Lemos', 50],
    ['Mariana Silva', 180],
    ['João Albuquerque', 140],
    ['Carlos Alvares', 200],
    ['Juliana Alves', 350],
    ['Bruno Araújo', 190],
  ],
  services: [
    ['Service', 'Quantity'],
    ['Corte', 250],
    ['Sobrancelha', 180],
    ['Barba', 100],
    ['Pintura', 40],
    ['Hidratação', 120],
  ],
  schedule: [
    ['Time', 'Quantity'],
    ['07:00', 600],
    ['10:00', 1120],
    ['13:00', 200],
    ['16:00', 680],
    ['19:00', 540],
  ],
};

const Dashboard = () => {
  const maxEmployees = Math.max(...mockData.employees.slice(1).map(emp => emp[1]));
  const maxServices = Math.max(...mockData.services.slice(1).map(serv => serv[1]));
  const maxSchedule = Math.max(...mockData.schedule.slice(1).map(sch => sch[1]));

  const employeeThresholds = { high: 200, medium: 160, down: 100 };
  const serviceThresholds = { high: 200, medium: 160, down: 80 };
  const scheduleThresholds = { high: 700, medium: 500, down: 300 };

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
              {['Total Clientes Ativos', 'Total Agendamentos', 'Novos Clientes', 'Taxa de Cancelamento'].map((title, index) => {
                const isCancelamento = title === 'Taxa de Cancelamento';
                const value = isCancelamento ? 67 : Math.floor(Math.random() * 100); 
                return (
                  <div className={styles.dashboardCard} key={index}>
                    <h3>{title}</h3>
                    <span className={`${styles.dateRange} ${isCancelamento ? styles.redDateRange : ''}`}>
                      10/10/24 à 14/10/24
                    </span>
                    <p>{isCancelamento ? `${value}%` : value}</p>
                    {renderGrowthBar(800, 550, isCancelamento)} 
                  </div>
                );
              })}
            </div>

            <div className={`${styles.dashboardCardLarge} ${styles.rendaMensalBruta}`} style={{ marginTop: '50px', marginRight: '10px' }}>
              <h3>Total Agendamento Mês</h3>
              <Chart
                chartType="LineChart"
                width="100%"
                height="200px"
                data={mockData.revenue}
                options={{
                  hAxis: { title: 'Mês' },
                  vAxis: { title: 'Qtd.' },
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
              { title: 'Funcionários Mais Requisitados', data: mockData.employees, thresholds: employeeThresholds },
              { title: 'Serviços Mais Requisitados', data: mockData.services, thresholds: serviceThresholds },
              { title: 'Horário de Pico de Atendimento', data: mockData.schedule, thresholds: scheduleThresholds },
            ].map(({ title, data, thresholds }, index) => (
              <div key={index} className={`${styles.dashboardCardLarge} ${styles.whiteBackground}`}>
                <h3>{title}</h3>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="200px"
                  data={[['Item', 'Quantidade', { role: 'style' }], ...data.slice(1).map(item => [item[0], item[1], getColor(item[1], Math.max(...data.slice(1).map(i => i[1])))]),]}
                  options={{
                    hAxis: { textStyle: { fontSize: 11 } },
                    vAxis: { title: 'Qtd. Agendamentos' },
                    legend: { position: 'none' },
                  }}
                />
                <div className={styles.kpiContainer}>
                  {['Alto', 'Médio', 'Baixo'].map((label, i) => (
                    <React.Fragment key={label}>
                      <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(Math.max(...data.slice(1).map(i => i[1])), thresholds) }}></div>
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
