import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Button } from '@mui/material';

function ClientHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/client-profile':
        return 'Informações pessoais';
      case '/manual-appointment':
        return 'Agendamentos';
      default:
        return 'Agendamentos'; 
    }
  };

  const getButtonConfig = () => {
    switch (location.pathname) {
      case '/client-profile':
        return { label: 'Marcar horário', route: '/manual-appointment' };
      case '/manual-appointment':
        return { label: 'Meu perfil', route: '/client-profile' };
      default:
        return { label: 'Meu perfil', route: '/client-profile' };
    }
  };

  const buttonConfig = getButtonConfig();

  const handleNavigation = () => {
    navigate(buttonConfig.route);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0A0F1D' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          {getTitle()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ color: 'white', marginRight: 2 }} onClick={handleNavigation}>
            {buttonConfig.label}
          </Button>
          
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ClientHeader;
