import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderApp from '../../components/HeaderApp/HeaderApp';
import styles from '../ProfileProfissional/ProfileProfissional.module.css';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ManualAppointment = () => {
  const [isCadastroVisible, setIsCadastroVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [selectedAgendamentoId, setSelectedAgendamentoId] = useState(null);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    servico: '',
    empresa: '',
    usuario: userId,
    dataHoraCorte: dayjs(),
    infoAdicional: '',
  });

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          toast.error('Usuário não autenticado.');
          return;
        }

        // Buscar serviços
        const servicosResponse = await api.get('/api/servicos/listar', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServicos(servicosResponse.data);

        // Buscar empresas
        const empresasResponse = await api.get('/api/empresas/listar', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmpresas(empresasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Erro ao carregar serviços e empresas.');
      }
    };

    fetchData();
  }, [token]);

  const fetchAgendamentos = async () => {
    try {
      const response = await api.get(`/api/agendamentos/usuario/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgendamentos(response.data);
    } catch (error) {
      console.error('Erro ao listar agendamentos:', error);
      toast.error('Erro ao listar agendamentos.');
    }
  };

  const fetchAgendamentoById = async (id) => {
    try {
      const response = await api.get(`/api/agendamentos/listar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const agendamento = response.data;
      setFormData({
        servico: agendamento.fkServico?.id || '',
        empresa: agendamento.fkEmpresa?.id || '',
        usuario: userId,
        dataHoraCorte: dayjs(agendamento.data).isValid() ? dayjs(agendamento.data) : dayjs(),
        infoAdicional: agendamento.infoAdicional || '',
      });
      setIsCadastroVisible(true);
    } catch (error) {
      console.error('Erro ao buscar agendamento:', error);
      toast.error('Erro ao buscar agendamento.');
    }
  };

  const toggleCadastro = () => {
    setIsCadastroVisible(true);
    setSelectedAgendamentoId(null);
    setFormData({
      servico: '',
      empresa: '',
      usuario: userId,
      dataHoraCorte: dayjs(),
      infoAdicional: '',
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const agendamento = {
      fkUsuarioId: formData.usuario,
      fkServicoId: formData.servico,
      fkEmpresaId: formData.empresa,
      data: formData.dataHoraCorte.format('YYYY-MM-DDTHH:mm:ss'),
      infoAdicional: formData.infoAdicional,
    };

    try {
      toast.dismiss();
      const response = await api.post('/api/agendamentos/cadastrar', agendamento, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Agendamento realizado com sucesso!');
        setFormData({
          servico: '',
          empresa: '',
          usuario: userId,
          dataHoraCorte: dayjs(),
          infoAdicional: '',
        });
        fetchAgendamentos();
        setIsCadastroVisible(false);
      }
    } catch (error) {
      console.error('Erro ao cadastrar agendamento:', error);
      toast.error('Erro ao cadastrar agendamento. Verifique os dados.');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(
        `/api/agendamentos/atualizar/${selectedAgendamentoId}`,
        {
          fkUsuarioId: formData.usuario,
          fkServicoId: formData.servico,
          fkEmpresaId: formData.empresa,
          data: formData.dataHoraCorte.format('YYYY-MM-DDTHH:mm:ss'),
          infoAdicional: formData.infoAdicional,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Agendamento atualizado com sucesso!');
      fetchAgendamentos();
      setIsCadastroVisible(false);
      setSelectedAgendamentoId(null);
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      toast.error('Erro ao atualizar agendamento.');
    }
  };

  const handleDelete = async () => {
    if (!selectedAgendamentoId) return;
    try {
      await api.delete(`/api/agendamentos/deletar/${selectedAgendamentoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Agendamento cancelado com sucesso!');
      fetchAgendamentos();
      setSelectedAgendamentoId(null);
      setIsCadastroVisible(false);
    } catch (error) {
      console.error('Erro ao excluir agendamento', error);
      toast.error('Erro ao excluir agendamento.');
    }
  };

  const handleCancel = () => {
    setFormData({
      servico: '',
      empresa: '',
      usuario: userId,
      dataHoraCorte: dayjs(),
      infoAdicional: '',
    });
    setSelectedAgendamentoId(null);
    setIsCadastroVisible(false);
  };

  return (
    <div className={styles.bodyProfissional}>
      <ToastContainer />
      <Box sx={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', marginLeft: '30px' }}>
        <Sidebar isVisible={true} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '200px', width: 'calc(90vw - 95px)' }}>
          <HeaderApp title="Painel de Agendamentos" />

          <Grid container spacing={2} sx={{ mt: 2, alignItems: 'stretch' }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  mb: 1,
                  mt: 2,
                  backgroundColor: '#010726',
                  borderRadius: '10px',
                  p: 1,
                  ml: 2,
                  height: '100%',
                  maxWidth: 'calc(100vw - 150px)',
                  marginTop: '30px',
                  maxHeight: '550px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#f8f4f8' }}>
                  <Typography variant="h6" gutterBottom sx={{ mr: 1, fontWeight: 'bold', ml: 2 }}>
                    Seus Agendamentos
                  </Typography>
                  <IconButton onClick={toggleCadastro} sx={{ color: '#f8f4f8' }}>
                    <Add />
                  </IconButton>
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
                  }}
                  className={styles.scrollbar}
                >
                  <List>
                    <ListItem>
                      <ListItemText primary="Serviço" sx={{ fontWeight: 'bold', color: '#ffffff', padding: '8px', textAlign: 'center' }} />
                      <ListItemText primary="Data e Hora" sx={{ fontWeight: 'bold', color: '#ffffff', padding: '8px', textAlign: 'center' }} />
                    </ListItem>
                    {Array.isArray(agendamentos) && agendamentos.length > 0 ? (
                      agendamentos.map((agendamento) => (
                        <ListItem
                          key={agendamento.id}
                          button
                          onClick={() => {
                            setSelectedAgendamentoId(agendamento.id);
                            fetchAgendamentoById(agendamento.id);
                          }}
                        >
                          <ListItemText
                            primary={agendamento.fkServico?.nome || ''}
                            sx={{
                              backgroundColor: agendamento.id === selectedAgendamentoId ? 'rgba(248, 244, 248, 0.5)' : 'rgba(248, 244, 248, 0.2)',
                              borderRadius: '15px',
                              padding: '5px',
                              textAlign: 'center',
                              margin: '1%',
                              color: '#f8f4f8',
                              fontWeight: agendamento.id === selectedAgendamentoId ? 'bold' : 'normal',
                              transition: 'transform 0.2s ease-in-out, background-color 0.2s',
                              '&:hover': { transform: 'scale(0.95)' },
                            }}
                          />
                          <ListItemText
                            primary={new Date(agendamento.data).toLocaleString()}
                            sx={{
                              backgroundColor: agendamento.id === selectedAgendamentoId ? 'rgba(248, 244, 248, 0.5)' : 'rgba(248, 244, 248, 0.2)',
                              borderRadius: '15px',
                              padding: '5px',
                              textAlign: 'center',
                              margin: '1%',
                              color: '#f8f4f8',
                              fontWeight: agendamento.id === selectedAgendamentoId ? 'bold' : 'normal',
                              transition: 'transform 0.2s ease-in-out, background-color 0.2s',
                              '&:hover': { transform: 'scale(0.95)' },
                            }}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <Typography sx={{ color: '#f8f4f8', p: 2 }}>Sem agendamentos para exibir.</Typography>
                    )}
                  </List>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              {!isCadastroVisible ? (
                <Typography variant="h6" gutterBottom sx={{ color: '#010726', ml: 30, mt: 35 }}>
                  Nenhuma visualização disponível.
                </Typography>
              ) : (
                <Box
                  className={`${styles.cadastroBox} ${isCadastroVisible ? styles.open : ''}`}
                  sx={{
                    mb: 2,
                    marginTop: 3,
                    backgroundColor: '#010726',
                    borderRadius: '10px',
                    p: 2,
                    ml: 2,
                    height: '100%',
                    maxHeight: '550px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#f8f4f8', fontWeight: 'bold', ml: 2 }}>
                    {selectedAgendamentoId ? 'Atualizar Agendamento' : 'Cadastrar Agendamento'}
                  </Typography>
                  <Box sx={{ maxHeight: '490px', overflow: 'auto', p: 1 }} className={styles.scrollbar}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel style={{ color: 'white' }} shrink={!!formData.empresa}>
                        Empresa
                      </InputLabel>
                      <Select
                        value={formData.empresa}
                        onChange={(e) => handleInputChange('empresa', e.target.value)}
                        label="Empresa"
                        sx={{
                          color: 'white',
                          backgroundColor: 'transparent',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '& .MuiSvgIcon-root': { color: 'white' },
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: { backgroundColor: '#010720', color: 'white' },
                          },
                          MenuListProps: {
                            sx: {
                              '& .MuiMenuItem-root': { color: 'white' },
                              '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                              '& .Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' },
                            },
                          },
                        }}
                      >
                        {empresas.length > 0 ? (
                          empresas.map((empresa) => (
                            <MenuItem key={empresa.id} value={empresa.id}>
                              {empresa.nomeEmpresa}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>Nenhuma empresa disponível</MenuItem>
                        )}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <InputLabel style={{ color: 'white' }} shrink={!!formData.servico}>
                        Serviço
                      </InputLabel>
                      <Select
                        value={formData.servico}
                        onChange={(e) => handleInputChange('servico', e.target.value)}
                        label="Serviço"
                        sx={{
                          color: 'white',
                          backgroundColor: 'transparent',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '& .MuiSvgIcon-root': { color: 'white' },
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: { backgroundColor: '#010720', color: 'white' },
                          },
                          MenuListProps: {
                            sx: {
                              '& .MuiMenuItem-root': { color: 'white' },
                              '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                              '& .Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' },
                            },
                          },
                        }}
                      >
                        {servicos.map((servico) => (
                          <MenuItem key={servico.id} value={servico.id}>
                            {servico.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Data e Hora do Agendamento"
                        value={formData.dataHoraCorte && dayjs(formData.dataHoraCorte).isValid() ? formData.dataHoraCorte : null}
                        onChange={(date) => handleInputChange('dataHoraCorte', date)}
                        slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                        sx={{
                          '& .MuiInputBase-input': { color: 'white' },
                          '& .MuiInputLabel-root': { color: 'white' },
                          '& .MuiSvgIcon-root': { color: 'white' },
                          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        }}
                      />
                    </LocalizationProvider>

                    <TextField
                      label={!isFocused ? 'Informações Adicionais' : ''}
                      value={formData.infoAdicional}
                      onChange={(e) => handleInputChange('infoAdicional', e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        if (!formData.infoAdicional) setIsFocused(false);
                      }}
                      multiline
                      rows={4}
                      fullWidth
                      margin="normal"
                      InputProps={{ style: { color: 'white', backgroundColor: '#010726' } }}
                      InputLabelProps={{ style: { color: 'white' } }}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                      }}
                    />

                    <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleDelete}
                        disabled={!selectedAgendamentoId}
                        sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                      >
                        Deletar Agendamento
                      </Button>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={handleCancel}
                          sx={{ mr: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={selectedAgendamentoId ? handleUpdate : handleSave}
                          disabled={!formData.servico || !formData.empresa}
                          sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                        >
                          {selectedAgendamentoId ? 'Atualizar' : 'Salvar'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ManualAppointment;