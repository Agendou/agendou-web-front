import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const AboutUs = () => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{
        mt: { xs: 2, md: 4 }, // Ajustando margens para diferentes breakpoints
        mb: { xs: 2, md: 4 },
        fontFamily: 'Poppins, sans-serif',
        px: { xs: 2, md: 3 }, // Controlando o padding em breakpoints menores
      }}
    >
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 300, 
          color: '#010726',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } // Ajustando tamanho da fonte
        }}
      >
        Sobre Nós
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Missão */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3 }, // Padding responsivo
              textAlign: 'center', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center' 
            }}
          >
            <FlagIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#010726', mb: 2 }} />
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                color: '#010726',
                fontSize: { xs: '1.25rem', md: '1.5rem' } // Ajustando tamanho da fonte
              }}
            >
              Missão
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Proporcionar um sistema de agendamentos online eficiente e fácil de usar, otimizando tempo de profissionais e clientes.
            </Typography>
          </Paper>
        </Grid>

        {/* Visão */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              textAlign: 'center', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center' 
            }}
          >
            <VisibilityIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#010726', mb: 2 }} />
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                color: '#010726',
                fontSize: { xs: '1.25rem', md: '1.5rem' } 
              }}
            >
              Visão
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Ser a plataforma líder em agendamentos online para o setor de beleza, reconhecida pela inovação e pela facilidade de uso.
            </Typography>
          </Paper>
        </Grid>

        {/* Valores */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              textAlign: 'center', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center' 
            }}
          >
            <ThumbUpIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: '#010726', mb: 2 }} />
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                color: '#010726',
                fontSize: { xs: '1.25rem', md: '1.5rem' } 
              }}
            >
              Valores
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Inovação, simplicidade, comprometimento com a satisfação do cliente e respeito ao tempo de todos.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Contato */}
      <Box mt={6}>
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 300, 
            color: '#010726',
            fontSize: { xs: '1.75rem', md: '2.5rem' }
          }}
        >
          Contato
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          sx={{ mb: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}
        >
          Telefone: (11) 98765-4321
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ mb: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}
        >
          Email: contato@agendou.com.br
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ mb: 2, fontSize: { xs: '0.9rem', md: '1rem' } }}
        >
          Endereço: Rua Haddock Lobo, 595, São Paulo, SP
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
