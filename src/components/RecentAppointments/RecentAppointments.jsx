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
  ];

  return (
    <Box
      sx={{
        width: 350,
        padding: 2,
        backgroundColor: '#0D1B2A',
        borderRadius: '12px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Agendamentos Recentes
      </Typography>

      {/* Campo de busca */}
      <TextField
        placeholder="Buscar"
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: '#162436',
          borderRadius: '8px',
          input: { color: 'white' },
          fieldset: { border: 'none' },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Lista de agendamentos */}
      <List sx={{ overflowY: 'auto', maxHeight: 200, padding: 0 }}>
        {agendamentos.map((agendamento, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: '#1E3A5C',
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
