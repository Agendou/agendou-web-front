import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group'; 
import BarChartIcon from '@mui/icons-material/BarChart'; 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Features = [
  {
    icon: <AccessTimeIcon style={{ fontSize: 70, color: '#00a2e8' }} />,
    title: 'Agendamento online',
    description: 'Apenas encaminhe o link e deixe o cliente fazer o agendamento.',
  },
  {
    icon: <EventNoteIcon style={{ fontSize: 70, color: '#00a2e8' }} />,
    title: 'Agenda',
    description: 'Gerencie sua agenda de forma fácil e rápida quando e onde estiver.',
  },
  {
    icon: <NotificationsIcon style={{ fontSize: 70, color: '#00a2e8' }} />,
    title: 'Lembretes automatizados',
    description: 'Reduza o índice de faltas de última hora em até 70% com os lembretes por e-mail.',
  },
  {
    icon: <GroupIcon style={{ fontSize: 70, color: '#00a2e8' }} />,
    title: 'Quadro de funcionários',
    description: 'Tenha uma visão detalhada do rendimento de cada funcionário.',
  },
  {
    icon: <BarChartIcon style={{ fontSize: 70, color: '#00a2e8' }} />,
    title: 'Relatórios e análises',
    description: 'Relatórios periódicos e práticos para manter-se sempre informado sobre seu negócio.',
  },
  {
    icon: <AttachMoneyIcon style={{ fontSize: 70, color: '#00a2e8' }} />,
    title: 'Painel de monitoramento',
    description: 'Acesse nossa poderosa Dashboard para melhorar sua tomada de decisões.',
  },
];

const FeaturesGrid = () => {
  return (
    <Box sx={{ padding: '2rem 4rem', textAlign: 'center' }}>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          color: "#010726",
          marginBottom: "5rem",
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },
            marginBottom: "1rem",
          }}
        >
          Recursos
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {Features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                textAlign: 'center',
                '&:hover .description': {
                  opacity: { md: 1 },
                  transform: { md: 'translateY(0)' },
                }
              }}
            >
              {feature.icon}
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography
                className="description"
                variant="body2"
                color="textSecondary"
                sx={{
                  opacity: { xs: 1, md: 0 },
                  transform: { xs: 'none', md: 'translateY(-20px)' },
                  transition: { md: 'opacity 0.3s ease, transform 0.3s ease' },
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default FeaturesGrid;
