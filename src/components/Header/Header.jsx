import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logoImg from '../../assets/images/LightLogo.png';
import { useNavigate } from 'react-router-dom';

const pages = ['Quem pode usar', 'Recursos', 'Sobre nós'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const navigate = useNavigate(); // Initialize useNavigate here

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#010726', fontFamily: 'Poppins, sans-serif' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ padding: '0 16px' }}>
          <img src={logoImg} alt="Logo" style={{ height: '60px', marginRight: '8px' }} />
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'start' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Poppins, sans-serif' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexGrow: 0 }}>
            <Button
              onClick={() => {
                navigate("/login-register-user-admin"); // Use navigate correctly here
              }}
              sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', border: 'solid 1px', borderRadius: '15px', padding: '10px'}}
            >
              Login
            </Button>
          </Box>        
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
