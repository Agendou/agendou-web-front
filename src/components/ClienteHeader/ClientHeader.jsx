import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Button } from '@mui/material';

function ClientHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0A0F1D' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          Agendamentos
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ color: 'white', marginRight: 2 }}>
            Ver meu perfil
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
