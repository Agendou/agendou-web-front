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
} from '@mui/material';
import { Add, FilterList, Delete, Visibility, VisibilityOff } from '@mui/icons-material'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderApp from '../../components/HeaderApp/HeaderApp';
import styles from './ProfileProfissional.module.css';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileProfissional = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [filter, setFilter] = useState('');
  const [isCadastroVisible, setIsCadastroVisible] = useState(false);
  const [servicos, setServicos] = useState(['Descoloração', 'Corte de cabelo', 'Sobrancelha']);
  const [isAscending, setIsAscending] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState(null);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await api.get('/funcionarios/listar');
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      toast.error("Erro ao listar funcionários.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleCadastro = () => {
    setIsCadastroVisible((prev) => !prev);
  };
  

  const handleRemoveService = (serviceToRemove) => {
    setServicos((prevServices) => prevServices.filter(service => service !== serviceToRemove));
  };

  const handleSave = async () => {
    try {
      const response = await api.post('/funcionarios/cadastrar', {
        nome,
        email,
        senha,
      });
      toast.success("Funcionário cadastrado com sucesso!");
      window.location.reload();
      fetchFuncionarios();
      handleCancel();
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      toast.error("Erro ao cadastrar funcionário. Verifique os dados preenchidos.");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/funcionarios/atualizar/${selectedFuncionarioId}`, {
        nome,
        email,
        senha,
      });
      toast.success("Funcionário atualizado com sucesso!");
      fetchFuncionarios();
      handleCancel();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      toast.error("Erro ao atualizar funcionário. Verifique os dados preenchidos.");
    }
  };

  const handleDelete = async () => {
    if (selectedFuncionarioId) {
      try {
        await api.delete(`/funcionarios/deletar/${selectedFuncionarioId}`);
        toast.success("Funcionário excluído com sucesso!");
        fetchFuncionarios();
        setSelectedFuncionarioId(null); 
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        toast.error("Erro ao excluir funcionário. Tente novamente.");
      }
    }
  };

  const handleCancel = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setIsCadastroVisible(false); 
    setSelectedFuncionarioId(null);
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
          <HeaderApp title="Painel de Funcionários" />

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
                    Funcionários
                  </Typography>
                  <IconButton onClick={() => setFilter('')} sx={{ color: '#f8f4f8' }}>
                    <FilterList />
                  </IconButton>
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
                    {funcionarios
                      .filter((funcionario) => funcionario.nome.toLowerCase().includes(filter.toLowerCase()))
                      .sort((a, b) => isAscending ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome))
                      .map((funcionario) => (
                        <ListItem 
                          key={funcionario.id} 
                          button 
                          onClick={() => {
                            setSelectedFuncionarioId(funcionario.id);
                            setNome(funcionario.nome);
                            setEmail(funcionario.email);
                            setSenha(funcionario.senha);
                            setIsCadastroVisible(true);
                          }}
                        >
                          <ListItemText
                            primary={funcionario.nome}
                            sx={{
                              backgroundColor: 'rgba(248, 244, 248, 0.2)',
                              borderRadius: '20px',
                              padding: '8px',
                            }}
                          />
                        </ListItem>
                      ))}
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
                    mb: 1,
                    marginTop: '30px',
                    backgroundColor: '#010726',
                    borderRadius: '10px',
                    p: 1,
                    ml: 2,
                    height: '100%',
                    maxHeight: '550px',
                    width: '100%',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#f8f4f8', fontWeight: 'bold', ml: 2 }}>
                    {selectedFuncionarioId ? 'Atualizar Funcionário' : 'Cadastrar Funcionário'}
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
                    <TextField
                      label="Nome"
                      fullWidth
                      margin="dense"
                      size="small"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      sx={{
                        input: { color: '#f8f4f8' },
                        label: { color: '#f8f4f8' },
                        fieldset: { borderColor: '#f8f4f8' },
                      }}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      margin="dense"
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        input: { color: '#f8f4f8' },
                        label: { color: '#f8f4f8' },
                        fieldset: { borderColor: '#f8f4f8' },
                      }}
                    />
                    <TextField
                      label="Senha"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      margin="dense"
                      size="small"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                            sx={{ color: '#f8f4f8' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                      sx={{
                        input: { color: '#f8f4f8' },
                        label: { color: '#f8f4f8' },
                        fieldset: { borderColor: '#f8f4f8' },
                      }}
                    />
                    <Typography variant="h5" gutterBottom sx={{ mb: 1, color: '#f8f4f8', mt: 2, fontWeight: 'bold' }}>
                      Serviços
                    </Typography>
                    <Grid container spacing={1}>
                      {servicos.map((service) => (
                        <Grid item key={service} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Button
                            variant="contained"
                            size="small"
                            value={service}
                            sx={{
                              backgroundColor: '#010726',
                              border: '1px solid #f8f4f8',
                              color: '#f8f4f8',
                            }}
                          >
                            {service}
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveService(service)}
                            sx={{ ml: 0.1 }} 
                          >
                            <Delete sx={{ color: '#f8f4f8' }} />
                          </IconButton>
                        </Grid>
                      ))}
                      <Grid item>
                        <IconButton size="small">
                          <Add sx={{ color: '#f8f4f8' }} />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <TextField
                      label="Descrição adicional"
                      fullWidth
                      margin="dense"
                      multiline
                      rows={7}
                      size="small"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      sx={{
                        input: { color: '#f8f4f8' },
                        bgcolor: '#f8f4f8',
                        borderRadius: '10px',
                        border: 'none',
                      }}
                    />

                    <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                      <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                        Excluir Perfil
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
                          onClick={selectedFuncionarioId ? handleUpdate : handleSave}
                        >
                          {selectedFuncionarioId ? 'Atualizar' : 'Salvar'}
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

export default ProfileProfissional; 