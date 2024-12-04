import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderApp from '../../components/HeaderApp/HeaderApp';
import {
    IconButton,
    Typography,
    Card,
    CardContent,
    Grid,
    Box,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { Chart } from 'react-google-charts';
import styles from './DashboardIndividual.module.css';
import { fontSize } from '@mui/system';

const DashboardIndividual = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        clientes: 0,
        agendamentos: 0,
        avaliacao: '',
        cancelamento: 0,
        servicos: [],
        horarios: [],
    });

    useEffect(() => {
      
        fetch('/api/funcionarios')
            .then(response => response.json())
            .then(data => setFuncionarios(data))
            .catch(error => console.error('Error fetching funcionarios:', error));
    }, []);

    useEffect(() => {
        if (selectedFuncionario) {
           
            fetch(`/api/funcionarios/${selectedFuncionario.id}/dashboard`)
                .then(response => response.json())
                .then(data => setDashboardData(data))
                .catch(error => console.error('Error fetching dashboard data:', error));
        }
    }, [selectedFuncionario]);

    const handleFuncionarioClick = (funcionario) => {
        setSelectedFuncionario(funcionario);
    };

    const getKPIColor = (value, thresholds) => {
        if (value >= thresholds.high) return '#070035';
        if (value >= thresholds.medium) return '#241f44';
        return '#6b668a';
    };

    const thresholds = {
        high: 400,
        medium: 200,
    };

    const optionsServicos = {
        title: 'Serviços Mais Requisitados',
        hAxis: { title: 'Serviço' },
        vAxis: { title: 'Quantidade' },
        legend: 'none',
    };

    const optionsHorarios = {
        title: 'Horários Mais Agendados',
        hAxis: { title: 'Horário' },
        vAxis: { title: 'Quantidade' },
        legend: 'none',
    };

    return (
        <Box className={styles.bodyDash} sx={{ display: 'flex', backgroundColor: '#f0f0f0' }}>
            <Sidebar />
            <Box sx={{ flex: 1 }}>
                <HeaderApp title="Painel de Funcionários" />
                <Box
                    sx={{
                        p: 2,
                        width: '80vw',
                        mx: 'auto',
                        mr: 4,
                        mt: 7,
                        height: 'calc(100vh - 70px)',
                    }}
                >
                    <Grid container spacing={2} sx={{ height: '100%' }}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%', backgroundColor: '#010726', borderRadius: '10px' }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 2,
                                            color: '#f8f4f8',
                                        }}
                                    >
                                        <Typography variant="h6">Funcionários</Typography>
                                        <Box>
                                            <IconButton sx={{ color: '#f8f4f8', backgroundColor: '#010726' }}>
                                                <FilterList />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            maxHeight: 'calc(500px - 38px)',
                                            overflow: 'auto',
                                            backgroundColor: '#010726',
                                            borderRadius: '10px',
                                            color: '#f8f4f8',
                                            p: 1,
                                            mt: 1,
                                            '&::-webkit-scrollbar': {
                                                width: '8px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: '#f8f4f8',
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: '#d1d1d1',
                                                },
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                backgroundColor: '#010726',
                                            },
                                        }}
                                    >
                                        {funcionarios.map((funcionario) => (
                                            <Typography
                                                key={funcionario.id}
                                                variant="body1"
                                                sx={{
                                                    py: 1,
                                                    cursor: 'pointer',
                                                    backgroundColor: 'rgba(248, 244, 248, 0.1)',
                                                    borderRadius: '20px',
                                                    transition: 'all 0.3s',
                                                    padding: '10px',
                                                    marginTop: '10px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(248, 244, 248, 0.4)',
                                                        scale: (0.9),
                                                    },
                                                }}
                                                onClick={() => handleFuncionarioClick(funcionario)}
                                            >
                                                {funcionario.nome}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Card className={styles.card}>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total de Clientes</Typography>
                                            <Typography variant="subtitle3" sx={{ fontSize: '0.7rem', color: '#737373', fontWeight: 'bold' }}>20/11/24 à 26/11/24</Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{dashboardData.clientes}</Typography>
                                            <Box sx={{ width: '100%', height: 5, backgroundColor: '#e0e0e0', borderRadius: '5px', mt: 1 }}>
                                                <Box sx={{ width: '60%', height: '100%', backgroundColor: '#6C63FF', borderRadius: '5px' }} />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={styles.card}>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total de agendamentos</Typography>
                                            <Typography variant="subtitle3" sx={{ fontSize: '0.7rem', color: '#737373', fontWeight: 'bold' }}>20/11/24 à 26/11/24</Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{dashboardData.agendamentos}</Typography>
                                            <Box sx={{ width: '100%', height: 5, backgroundColor: '#e0e0e0', borderRadius: '5px', mt: 1 }}>
                                                <Box sx={{ width: '40%', height: '100%', backgroundColor: '#F44336', borderRadius: '5px' }} />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={styles.card}>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Avaliação</Typography>
                                            <Typography variant="subtitle3" sx={{ fontSize: '0.7rem', color: '#737373', fontWeight: 'bold' }}>20/11/24 à 26/11/24</Typography>
                                            <Typography SX={{fontSize: '0.8rem'}}>⭐⭐⭐⭐⭐</Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{dashboardData.avaliacao}</Typography>
                                            <Box sx={{ width: '100%', height: 5, backgroundColor: '#e0e0e0', borderRadius: '5px', mt: 1 }}>
                                                <Box sx={{ width: '80%', height: '100%', backgroundColor: '#4CAF50', borderRadius: '5px' }} />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card className={styles.card}>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Taxa de cancelamento</Typography>
                                            <Typography variant="subtitle3" sx={{ fontSize: '0.7rem', color: '#737373', fontWeight: 'bold' }}>20/11/24 à 26/11/24</Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{dashboardData.cancelamento}%</Typography>
                                            <Box sx={{ width: '100%', height: 5, backgroundColor: '#e0e0e0', borderRadius: '5px', mt: 1 }}>
                                                <Box sx={{ width: '30%', height: '100%', backgroundColor: '#FF9800', borderRadius: '5px' }} />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Serviços Mais Requisitados</Typography>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={dashboardData.servicos}
                                                options={optionsServicos}
                                                width="100%"
                                                height="200px"
                                            />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    mt: 2,
                                                    gap: 1,
                                                }}
                                            >
                                            </Box>
                                            <div className={styles.kpiContainer}>
                                                {['Alto', 'Médio', 'Baixo'].map((label, i) => (
                                                    <React.Fragment key={label}>
                                                        <div className={styles.kpiDot} style={{ backgroundColor: getKPIColor(dashboardData.horarios[3]?.[i + 1] || 0, thresholds) }}></div>
                                                        <span>{label}</span>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Horários Mais Agendados</Typography>
                                            <Chart
                                                chartType="ColumnChart"
                                                data={dashboardData.horarios}
                                                options={optionsHorarios}
                                                width="100%"
                                                height="200px"
                                            />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    mt: 2,
                                                    gap: 1,
                                                }}
                                            >
                                            </Box>
                                            <div className={styles.kpiContainer}>
                                                {['Alto', 'Médio', 'Baixo'].map((label, i) => (
                                                    <React.Fragment key={label}>
                                                        <div className={styles.kpiDot} style={{ backgroundColor: getKPIColor(dashboardData.horarios[3]?.[i + 1] || 0, thresholds) }}></div>
                                                        <span>{label}</span>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardIndividual;