import React from 'react';
import { Box, TextField, Typography, IconButton, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const RecentAppointments = () => {
  const agendamentos = [
    { nome: 'Humberto Souza Pereira Silva', data: '28/10/24', hora: '18h' },
    { nome: 'Robson Cleiton Lopes', data: '01/10/24', hora: '10h30' },
    { nome: 'José Ribeiro Mendes', data: '30/09/24', hora: '11h45' },
    { nome: 'Fernando Teixeira', data: '26/09/24', hora: '19h' },
    { nome: 'Maria Eduarda', data: '25/09/24', hora: '15h' },
    { nome: 'Ana Carolina', data: '24/09/24', hora: '14h' },
    { nome: 'Lucas Silva', data: '23/09/24', hora: '16h30' },
    { nome: 'João Paulo', data: '22/09/24', hora: '13h' },
    { nome: 'Júlia Santos', data: '21/09/24', hora: '17h' },
    { nome: 'Pedro Henrique', data: '20/09/24', hora: '10h' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        backgroundColor: '#010726',
        borderRadius: '12px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Agendamentos Recentes
      </Typography>

      <List sx={{ overflowY: 'auto', maxHeight: 390, padding: 0 }}>
        {agendamentos.map((agendamento, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: '#010720',
              borderRadius: '8px',
              marginBottom: 1,
              padding: '8px 16px',
            }}
          >
            <ListItemText
              primary={agendamento.nome}
              secondary={`${agendamento.data} às ${agendamento.hora}`}
              primaryTypographyProps={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}
              secondaryTypographyProps={{ color: 'white', fontSize: '12px' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentAppointments;
