import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import api from '../../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    fontWeightMedium: 600,
  },
  palette: {
    primary: {
      main: '#010726',
    },
    secondary: {
      main: '#737373',
    },
    action: {
      main: '#04588C',
    },
    button: {
      cancel: '#D3D3D3',
      delete: '#5C0000',
    },
  },
});

export default function ModalServico({ onAddService }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/servicos/listar', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao listar serviços:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredServices = services.filter(service =>
    service.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton
          size="small"
          sx={{ color: '#f8f4f8', '&:hover': { transform: 'scale(0.9)' } }}
          onClick={handleOpen}
        >
          <Add />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="add-service-modal-title"
        >
          <Box sx={style}>
            <Typography
              id="add-service-modal-title"
              variant="h6"
              component="h2"
              color="primary"
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Adicionar Serviço
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Buscar"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <List sx={{ maxHeight: 150, overflow: 'auto', cursor: 'pointer' }}>
              {filteredServices.map((service) => (
                <ListItem key={service.id} button onClick={() => onAddService(service)}>
                  <ListItemText primary={service.nome} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#D3D3D3',
                  color: '#737373',
                  '&:hover': {
                    bgcolor: '#C0C0C0',
                    cursor: 'pointer',
                  },
                }}
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}