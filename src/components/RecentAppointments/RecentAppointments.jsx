import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/api';

const RecentAppointments = () => {
  const [historico, setHistorico] = useState([]);

  const handleQueue = (newData) => {
    const updatedQueue = [...newData, ...historico].slice(0, 10);
    setHistorico(updatedQueue);
  };

  const getHistorico = async () => {
    const token = localStorage.getItem("token");
    const empresaId = localStorage.getItem('empresaId');

    if (!token) {
      toast.error("Você precisa estar logado para acessar essa página");
      return;
    }

    try {
      const response = await api.get(`/historico/empresa/listar/${empresaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.status === 200) {
        handleQueue(response.data);
      } else {
        toast.error("Erro ao carregar o histórico");
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      toast.error("Erro ao carregar os dados. Tente novamente.");
    }
  };

  useEffect(() => {
    getHistorico();
  }, []);

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
        Histórico de Agendamentos
      </Typography>

      {historico.length === 0 ? (
        <Typography sx={{ color: 'white', fontSize: '14px' }}>
          Nenhum histórico de agendamento encontrado.
        </Typography>
      ) : (
        <List sx={{ overflowY: 'auto', maxHeight: 390, padding: 0 }}>
          {historico.map((agendamento, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: 'rba(248, 244, 248, 0.2)',
                borderRadius: '20px',
                marginBottom: 2,
                padding: '8px 16px',
              }}
            >
              <ListItemText
                primary={agendamento.nomeUsuario || 'Nome não disponível'}
                secondary={`${agendamento.dataFormatada} às ${agendamento.horaFormatada}`}
                primaryTypographyProps={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: 'white', fontSize: '12px' }}
              />
              <ListItemText
                primary={`Status Anterior: ${agendamento.statusAnterior}`}
                secondary={`Status Atual: ${agendamento.statusAtual}`}
                primaryTypographyProps={{ color: '#737373', fontSize: '12px' }}
                secondaryTypographyProps={{ color: '#f8f4f8', fontSize: '12px' }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RecentAppointments;