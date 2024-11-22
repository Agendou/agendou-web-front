import React from 'react';
import { Box, Typography, TextField, Button, Paper, Stack, Chip, IconButton } from '@mui/material';
import { CalendarToday, AccessTime, Add } from '@mui/icons-material';

const ManualAppointmentForm = () => {
    return (
        <Paper
            sx={{
                padding: { xs: '20px', md: '5%' },
                backgroundColor: '#010726',
                color: '#ffffff',
                height: '80vh',
                width: '90%',
                overflowY: 'auto',
                boxSizing: 'border-box',
                mt: 1,
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Box>
                    <Typography variant="h6" component="div">
                        José do Carmo Pereira
                    </Typography>
                    <Typography variant="body2">jose@gmail.com</Typography>
                    <Typography variant="body2">(11) 96060-0000</Typography>
                </Box>
                <IconButton size="small" color="inherit" sx={{ ml: 'auto' }}>
                    <Add />
                </IconButton>
            </Box>

            <Stack spacing={2} mb={2}>
                <Typography variant="h6">Data e horário</Typography>
                <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                    <TextField
                        label="Horário"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        InputProps={{
                            startAdornment: <AccessTime sx={{ color: '#ffffff' }} />
                        }}
                        sx={{
                            bgcolor: '#ffffff',
                            borderRadius: 1,
                        }}
                    />
                    <TextField
                        label="Data"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        InputProps={{
                            startAdornment: <CalendarToday sx={{ color: '#ffffff' }} />
                        }}
                        sx={{
                            bgcolor: '#ffffff',
                            borderRadius: 1,
                        }}
                    />
                </Box>
            </Stack>

            <Stack spacing={2} mb={2}>
                <Typography variant="h6">Serviços</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                    <Chip label="Descoloração" color="primary" />
                    <Chip label="Corte de cabelo" color="primary" />
                    <Chip label="Sobrancelha" color="primary" />
                    <IconButton color="inherit">
                        <Add />
                    </IconButton>
                </Box>
            </Stack>

            <TextField
                label="Informação Adicional"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: 1,
                    mb: 2,
                }}
            />

            <Box display="flex" justifyContent="space-between">
                <Button variant="outlined" color="secondary">Cancelar</Button>
                <Button variant="contained" color="primary">Salvar</Button>
            </Box>
        </Paper>
    );
};

export default ManualAppointmentForm;
