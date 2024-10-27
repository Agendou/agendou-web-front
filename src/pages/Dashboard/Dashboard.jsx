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

const getKPI = (value, thresholds) => {
  if (value >= thresholds.high) return 'Alto';
  if (value >= thresholds.medium) return 'Médio';
  return 'Baixo';
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

  const getKPIColor = (value, thresholds) => {
    if (value >= thresholds.high) return 'rgb(56, 49, 92)'; 
    if (value >= thresholds.medium) return 'rgb(85, 91, 148)'; 
    return 'rgb(116, 147, 194)'; 
  };

  const renderGrowthBar = (currentValue, previousValue) => {
    const growth = currentValue - previousValue;
    const percentageGrowth = (growth / previousValue) * 100;
  
    return (
      <div className={styles.growthBarContainer}>
        <div
          className={styles.growthBar}
          style={{
            width: `${Math.abs(percentageGrowth)}%`,
            backgroundColor: growth >= 0 ? 'green' : 'red',
          }}
        />
      </div>
    );
  };
  
  return (
      <div className={styles.bodyD}>
        <div style={{ display: 'flex' }}>
          <Sidebar isVisible={true} />
          <div style={{ flex: 1, padding: '20px' }}>
            <div className={styles.header}>
              <h1 className={styles.headerTitle}>Painel de Monitoramento Geral</h1>
              <div className={styles.headerIcons}>
                <FaBell className={styles.notificationIcon} />
              </div>
            </div>

            <div className={styles.dashboardContainer}>
              <div className={styles.leftDashboards}>
                <div className={styles.dashboardCard}>
                  <h3>Total Clientes Ativos</h3>
                  <span className={styles.dateRange}>10/10/24 à 14/10/24</span>
                  <p>67</p>
                  {renderGrowthBar(800, 450)} 
                </div>
                <div className={styles.dashboardCard}>
                  <h3>Total Agendamentos</h3>
                  <span className={styles.dateRange}>10/10/24 à 14/10/24</span>
                  <p>125</p>
                  {renderGrowthBar(325, 200)} 
                </div>
                <div className={styles.dashboardCard}>
                  <h3>Novos Clientes</h3>
                  <span className={styles.dateRange}>10/10/24 à 14/10/24</span>
                  <p>12</p>
                  {renderGrowthBar(26, 16)} 
                </div>
                <div className={styles.dashboardCard}>
                  <h3>Taxa de Cancelamento</h3>
                  <span className={styles.dateRange}>10/10/24 à 14/10/24</span>
                  <p>30%</p>
                  {renderGrowthBar(30, 50)} 
                </div>
              </div>
              <div className={`${styles.dashboardCardLarge} ${styles.rendaMensalBruta}`} style={{ marginTop: '80px', marginRight: '15px' }}>
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
              <div className={`${styles.dashboardCardLarge} ${styles.whiteBackground}`}>
                <h3>Funcionários Mais Requisitados</h3>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="200px"
                  data={[
                    ['Employee', 'Quantidade', { role: 'style' }],
                    ...mockData.employees.slice(1).map(emp => [emp[0], emp[1], getColor(emp[1], maxEmployees)]),
                  ]}
                  options={{
                    hAxis: { textStyle: { fontSize: 11 } },
                    vAxis: { title: 'Qtd. Agendamentos' },
                    legend: { position: 'none' },
                  }}
                />
                <div className={styles.kpiContainer}>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxEmployees, employeeThresholds) }}></div>
                  <span>Alto</span>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxEmployees, employeeThresholds) }}></div>
                  <span>Médio</span>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxEmployees, employeeThresholds) }}></div>
                  <span>Baixo</span>
                </div>
              </div>
              <div className={`${styles.dashboardCardLarge} ${styles.whiteBackground}`}>
                <h3>Serviços Mais Requisitados</h3>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="200px"
                  data={[
                    ['Service', 'Quantidade', { role: 'style' }],
                    ...mockData.services.slice(1).map(serv => [serv[0], serv[1], getColor(serv[1], maxServices)]),
                  ]}
                  options={{
                    hAxis: { textStyle: { fontSize: 11 } },
                    vAxis: { title: 'Qtd. Serviços' },
                    legend: { position: 'none' },
                  }}
                />
                <div className={styles.kpiContainer}>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxServices, serviceThresholds) }}></div>
                  <span>Alto</span>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxServices, serviceThresholds) }}></div>
                  <span>Médio</span>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxServices, serviceThresholds) }}></div>
                  <span>Baixo</span>
                </div>
              </div>
              <div className={`${styles.dashboardCardLarge} ${styles.whiteBackground}`}>
                <h3>Horário de Pico de Atendimento</h3>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="200px"
                  data={[
                    ['Horário', 'Quantidade', { role: 'style' }],
                    ...mockData.schedule.slice(1).map(sch => [sch[0], sch[1], getColor(sch[1], maxSchedule)]),
                  ]}
                  options={{
                    hAxis: { textStyle: { fontSize: 11 } },
                    vAxis: { title: 'Qtd. Horários' },
                    legend: { position: 'none' },
                  }}
                />
                <div className={styles.kpiContainer}>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxSchedule, scheduleThresholds) }}></div>
                  <span>Alto</span>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxSchedule, scheduleThresholds) }}></div>
                  <span>Médio</span>
                  <div className={styles.kpiSquare} style={{ backgroundColor: getKPIColor(maxSchedule, scheduleThresholds) }}></div>
                  <span>Baixo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
