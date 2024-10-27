import React, { useState } from 'react';
import {
  Grid,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Add, Visibility, VisibilityOff, FilterList, Delete } from '@mui/icons-material';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderApp from '../../components/HeaderApp/HeaderApp';
import styles from './ProfileProfissional.module.css';

const ProfileProfissional = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [filter, setFilter] = useState('');
  const [isCadastroVisible, setIsCadastroVisible] = useState(false);
  const [servicos, setServicos] = useState(['Descoloração', 'Corte de cabelo', 'Sobrancelha']);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleCadastro = () => {
    setIsCadastroVisible((prev) => !prev);
  };

  const handleRemoveService = (serviceToRemove) => {
    setServicos((prevServices) => prevServices.filter(service => service !== serviceToRemove));
  };

  const funcionarios = [
    'Humberto Souza Pereira Silva',
    'Robson Cleiton Lopes',
    'José Ribeiro Mendes',
    'Fernando Teixeira',
    'José Marques',
    'Julia Alves',
    'Kaique Freitas',
    'Gustavo Ramos',
    'José Alberto Dias',
  ];

  return (
    <div className={styles.bodyProfissional}>
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
                      .filter((name) => name.toLowerCase().includes(filter.toLowerCase()))
                      .map((name) => (
                        <ListItem key={name} button>
                          <ListItemText
                            primary={name}
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
                    Cadastrar Funcionário
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
                      sx={{
                        input: { color: '#f8f4f8' },
                        label: { color: '#f8f4f8' },
                        fieldset: { borderColor: '#f8f4f8' },
                      }}
                    />
                    <TextField
                      label="Telefone"
                      fullWidth
                      margin="dense"
                      size="small"
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
                      sx={{
                        input: { color: '#f8f4f8' },
                        label: { color: '#f8f4f8' },
                        fieldset: { borderColor: '#f8f4f8' },
                      }}
                    />
                    <TextField
                      label="Senha"
                      fullWidth
                      margin="dense"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility}>
                              {showPassword ? <VisibilityOff sx={{ color: '#f8f4f8' }} /> : <Visibility sx={{ color: '#f8f4f8' }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      size="small"
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
                            sx={{ ml: 0.1 }} // Ajustado para ficar mais próximo
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
                      rows={5}
                      size="small"
                      sx={{
                        input: { color: '#f8f4f8' },
                        bgcolor: '#f8f4f8',
                        borderRadius: '10px',
                        border: 'none',
                      }}
                    />

                    <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                      <Button variant="contained" color="error" size="small">
                        Excluir Perfil
                      </Button>
                      <Grid item>
                        <Button variant="contained" color="primary" size="small">
                          Salvar
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
