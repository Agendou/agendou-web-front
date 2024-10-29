import React from 'react';
import { Box, Typography } from '@mui/material';

const BackgroundImageComponent = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        component="div"
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundImage: 'url(https://img.freepik.com/free-vector/blue-abstract-background_78370-97.jpg?t=st=1728432413~exp=1728436013~hmac=97a494c361a3e0a367b710f5a7ea43c6244b1188634c1c0a389ce424784cd7d4&w=740)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(1px)',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: { xs: '2rem', sm: '4rem' },
        }}
      >
        <Typography 
          fontFamily={'Poppins, sans-serif'} 
          variant='h1' 
          fontSize={{ xs: '1.5rem', sm: '2rem', md: '3rem' }}
        >
          Seus problemas com agendamento acabaram
        </Typography>
      </Box>
    </Box>
  );
};

export default BackgroundImageComponent;
