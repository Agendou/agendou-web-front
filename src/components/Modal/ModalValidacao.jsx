import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    fontWeightMedium: 600,
  },
  palette: {
    primary: {
      main: '#04588C',
    },
    error: {
      main: '#5C0000',
    },
    text: {
      primary: '#010726',
      secondary: '#737373',
    },
  },
});

export default function DeleteAccountModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Abrir Modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="delete-account-modal-title"
          aria-describedby="delete-account-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="delete-account-modal-title"
              variant="h6"
              component="h2"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 'medium' }}
            >
              Tem certeza que deseja excluir sua conta?
            </Typography>
            <Typography
              id="delete-account-modal-description"
              variant="body1"
              color="text.secondary"
              gutterBottom
            >
              Esta ação é permanente e todos os seus dados serão perdidos.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <Button variant="contained" color="error" onClick={handleClose}>
                Excluir
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}