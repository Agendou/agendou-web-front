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
import { Add, FilterList } from '@mui/icons-material';
import Sidebar from '../../components/Sidebar/SidebarUsuario';
import HeaderApp from '../../components/HeaderApp/HeaderApp';
import styles from '../ProfileProfissional/ProfileProfissional.module.css';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const ManualAppointmentAdmin = () => {
  toast.dismiss();
  const [filter, setFilter] = useState('');
  const [isCadastroVisible, setIsCadastroVisible] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [agendamentos, setAgendamentos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedAgendamentoId, setSelectedAgendamentoId] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    profissional: "",
    servico: "",
    usuario: userId,
    dataHoraCorte: dayjs(),
  });

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!token) {
          toast.error("Usuário não autenticado.");
          return;
        }

        //get em /funcionarios/listar
        const profissionaisResponse = await api.get("/funcionarios/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfissionais(profissionaisResponse.data);

        //get em /servicos
        const servicosResponse = await api.get("/servicos/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServicos(servicosResponse.data);

        //get em /usuarios
        const usuariosResponse = await api.get("/usuarios/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuarios(usuariosResponse.data);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar profissionais e serviços.");
      }
    };

    fetchData();
  }, []);

  const fetchAgendamentos = async () => {
    try {

      const response = await api.get(`/agendamentos/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao listar agendamentos deste usuário:", error);
      toast.error("Erro ao listar agendamentos deste usuário.");
    }
  };

  const fetchAgendamentoById = async (id) => {
    if (selectedAgendamentoId) {
      try {
        const response = await api.get(`/agendamentos/listar/${selectedAgendamentoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const agendamento = response.data;

        // Debug para verificar os dados retornados
        console.log("Agendamento retornado:", agendamento);

        setFormData({
          profissional: agendamento.fkFuncionario.id,
          servico: agendamento.fkServico.id,
          usuario: userId,
          dataHoraCorte: dayjs(agendamento.data).isValid() ? dayjs(agendamento.data) : dayjs(),
        });

        setIsCadastroVisible(true); // Mostra o formulário de edição
      } catch (error) {
        console.error("Erro ao buscar agendamento:", error);
        toast.error("Erro ao buscar agendamento.");
      }
    }
  };



  const toggleCadastro = () => {
    setIsCadastroVisible(true);
  };

  const handleInputChange = (field, value) => {
    console.log("Antes da atualização:", formData);
    console.log(`Campo: ${field}, Valor: ${value}`);
    setFormData((prevState) => {
      const updatedState = {
        ...prevState,
        [field]: value,
      };
      console.log("Depois da atualização:", updatedState);
      return updatedState;
    });
  };

  const handleSave = async () => {
    const agendamento = {
      fkFuncionario: formData.profissional,
      fkUsuario: userId,
      fkServico: formData.servico,
      data: formData.dataHoraCorte.format("YYYY-MM-DDTHH:mm:ss"),
    };

    console.log("Enviando agendamento:", agendamento);

    try {
      toast.dismiss();
      const response = await api.post("/agendamentos/cadastrar", agendamento, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Agendamento realizado com sucesso:", response.data);
        toast.success("Agendamento realizado com sucesso!");
        setFormData({
          profissional: "",
          servico: "",
          dataHoraCorte: dayjs(),
        });
        fetchAgendamentos();
        handleCancel();
      } else {
        console.error("Erro no agendamento:", response.statusText);
        toast.error("Erro ao realizar o agendamento. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar agendamento:", error);
      if (error.response) {
        console.error("Resposta do servidor:", error.response.data);
      }
      toast.error("Erro ao cadastrar agendamento. Verifique os dados preenchidos.");
    }
  };

  console.log("ID do agendamento:", selectedAgendamentoId);

  const handleUpdate = async () => {
    console.log("FormData antes de atualizar:", formData);

    try {
      const response = await api.put(
        `/agendamentos/atualizar/${selectedAgendamentoId}`,
        {
          fkFuncionario: formData.profissional,
          fkUsuario: userId,
          fkServico: formData.servico,
          data: formData.dataHoraCorte.format("YYYY-MM-DDTHH:mm:ss"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      fetchAgendamentos();
      toast.success("Agendamento atualizado com sucesso!");

      handleCancel();
    } catch (error) {
      console.error("Erro ao atualizar o agendamento:", error);
      toast.error("Erro ao atualizar agendamento. Verifique os dados preenchidos.");
    }
  };


  const handleDelete = async () => {
    if (selectedAgendamentoId) {
      try {
        console.log("Deletando agendamento:", selectedAgendamentoId);

        const response = await api.delete(`/agendamentos/deletar/${selectedAgendamentoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Agendamento cancelado");
        fetchAgendamentos();
        setSelectedAgendamentoId(null);
      } catch (error) {
        console.error("Erro ao excluir o agendamento:", error);
        toast.error("Erro ao excluir agendamento. Tente novamente.");
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      profissional: "",
      servico: "",
      dataHoraCorte: dayjs(),
    });
    setSelectedAgendamentoId(null);
  };

  return (
    <div className={styles.bodyProfissional}>
      <ToastContainer />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          fontFamily: 'Poppins, sans-serif',
          marginLeft: '30px',
        }}
      >
        <Sidebar isVisible={true} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: '200px',
            width: 'calc(90vw - 95px)',
          }}
        >
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    color: '#f8f4f8',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ mr: 1, fontWeight: 'bold', ml: 2 }}>
                    Seus agendamentos
                  </Typography>
                  <IconButton onClick={() => setFilter('')} sx={{ color: '#f8f4f8' }}>
                    <FilterList />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleCancel();
                      toggleCadastro();
                    }}
                    sx={{ color: '#f8f4f8' }}
                  >
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
                    {/* títulos */}
                    <ListItem>
                      <ListItemText
                        primary="Serviço"
                        sx={{
                          fontWeight: 'bold',
                          color: '#ffffff',
                          padding: '8px',
                        }}
                      />
                      <ListItemText
                        primary="Data e Hora"
                        sx={{
                          fontWeight: 'bold',
                          color: '#ffffff',
                          padding: '8px',
                        }}
                      />
                    </ListItem>

                    {/* agendamentos */}
                    {Array.isArray(agendamentos) && agendamentos.length > 0 ? (
                      agendamentos.map((agendamento) => (
                        <ListItem
                          key={agendamento.id}
                          value={agendamento.id}
                          button
                          onClick={() => {
                            setSelectedAgendamentoId(agendamento.id);
                            fetchAgendamentoById(selectedAgendamentoId);

                            console.log("Agendamento selecionado:", {
                              usuario: agendamento.fkUsuario.nome,
                              profissional: agendamento.fkFuncionario.nome,
                              servico: agendamento.fkServico.nome,
                              dataHoraCorte: dayjs(agendamento.data),
                            });

                            setIsCadastroVisible(true);
                          }}
                        >
                          {/* Nome do serviço */}
                          <ListItemText
                            primary={agendamento.fkServico ? agendamento.fkServico.nome : ''}
                            sx={{
                              backgroundColor: agendamento.id === selectedAgendamentoId ? 'rgba(248, 244, 248, 0.5)' : 'rgba(248, 244, 248, 0.2)',
                              borderRadius: '20px',
                              padding: '8px',
                              margin: '2%',
                              cursor: 'pointer',
                              color: agendamento.id === selectedAgendamentoId ? '#ffffff' : '#f8f4f8',
                              fontWeight: agendamento.id === selectedAgendamentoId ? 'bold' : 'normal',
                              transition: 'transform 0.2s ease-in-out, background-color 0.2s',
                              '&:hover': {
                                transform: 'scale(0.9)',
                              },
                            }}
                          />

                          {/* Data e hora do serviço */}
                          <ListItemText
                            primary={new Date(agendamento.data).toLocaleString()}
                            sx={{
                              backgroundColor: agendamento.id === selectedAgendamentoId ? 'rgba(248, 244, 248, 0.5)' : 'rgba(248, 244, 248, 0.2)',
                              borderRadius: '20px',
                              padding: '8px',
                              cursor: 'pointer',
                              color: agendamento.id === selectedAgendamentoId ? '#ffffff' : '#f8f4f8',
                              fontWeight: agendamento.id === selectedAgendamentoId ? 'bold' : 'normal',
                              transition: 'transform 0.2s ease-in-out, background-color 0.2s',
                              '&:hover': {
                                transform: 'scale(0.9)',
                              },
                            }}
                          />

                        </ListItem>
                      ))
                    ) : (
                      <p>Sem agendamentos para exibir.</p>
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
                    p: 1,
                    ml: 2,
                    height: '100%',
                    maxHeight: '550px',
                    width: '100%',
                    gap: 3,
                    padding: 1,
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#f8f4f8', fontWeight: 'bold', ml: 2 }}>
                    {selectedAgendamentoId ? 'Atualizar Agendamento' : 'Cadastrar Agendamento'}
                  </Typography>
                  <Box
                    sx={{
                      maxHeight: '490px',
                      backgroundColor: '#010726',
                      borderRadius: '10px',
                      p: 1,
                      height: '100%',
                    }}
                    className={styles.scrollbar}
                  >

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Data e Hora do Agendamento"
                        value={formData.dataHoraCorte && dayjs(formData.dataHoraCorte).isValid() ? formData.dataHoraCorte : null}
                        onChange={(date) => handleInputChange("dataHoraCorte", date)}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                          "& .MuiInputLabel-root": {
                            color: "white",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "white",
                          },
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        }}
                      />
                    </LocalizationProvider>

                    <FormControl fullWidth margin="normal">
                      <InputLabel
                        style={{ color: "white" }}
                        sx={{
                          display: formData.profissional ? "none" : "block",
                        }}
                        shrink={formData.profissional.length > 0}
                      >
                        Profissionais
                      </InputLabel>
                      <Select
                        value={formData.profissional}
                        onChange={(e) =>
                          handleInputChange("profissional", e.target.value)
                        }
                        label="Profissional"
                        sx={{
                          color: "white",
                          backgroundColor: "transparent",
                          borderColor: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "white",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              backgroundColor: "#010720",
                              color: "white",
                            },
                          },
                          MenuListProps: {
                            sx: {
                              "& .MuiMenuItem-root": {
                                color: "white",
                              },
                              "& .MuiMenuItem-root:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                              },
                            },
                          },
                        }}
                      >
                        {profissionais.map((funcionario) => (
                          <MenuItem key={funcionario.id} value={funcionario.id}>
                            {funcionario.nome}
                          </MenuItem>
                        ))}

                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                      <InputLabel
                        style={{ color: "white" }}
                        shrink={!!formData.servico}
                      >
                        Serviço
                      </InputLabel>
                      <Select
                        value={formData.servico}
                        onChange={(e) => {
                          handleInputChange("servico", e.target.value);
                        }}
                        label="Serviço"
                        sx={{
                          color: "white",
                          backgroundColor: "transparent",
                          borderColor: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "white",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              backgroundColor: "#010720",
                              color: "white",
                            },
                          },
                          MenuListProps: {
                            sx: {
                              "& .MuiMenuItem-root": {
                                color: "white",
                              },
                              "& .MuiMenuItem-root:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                              },
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

                    <TextField
                      label={!isFocused ? "Informações Adicionais" : ""}
                      value={formData.infoAdicional}
                      onChange={(e) =>
                        handleInputChange("infoAdicional", e.target.value)
                      }
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        if (formData.infoAdicional === "") {
                          setIsFocused(false);
                        }
                      }}
                      multiline
                      rows={6}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        style: {
                          color: "white",
                          backgroundColor: "#010726",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                      }}
                    />

                    <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                      <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                        Deletar agendamento
                      </Button>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={handleCancel}
                          sx={{ mr: 2 }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={selectedAgendamentoId ? handleUpdate : handleSave}
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

export default ManualAppointmentAdmin;
