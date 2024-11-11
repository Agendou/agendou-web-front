import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const ScheduleDayList = () => {

    const schedule = [
        { time: '06:00', status: 'Agendado', color: 'default' },
        { time: '06:15', status: 'Cancelado', color: 'error' },
        { time: '06:30', status: 'Livre', color: 'success' },
        { time: '07:15', status: 'Agendado', color: 'default' },
        { time: '07:45', status: 'Cancelado', color: 'error' },
        { time: '08:00', status: 'Livre', color: 'success' },
        { time: '08:30', status: 'Agendado', color: 'default' },
        { time: '09:00', status: 'Livre', color: 'success' },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '25px',
                borderRadius: '12px',
                width: '100%',
                height: '40vh',
                overflowY: 'auto',
                backgroundColor: '#010726',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#04588c',
                    borderRadius: '8px',
                },
            }}
        >
            <Typography variant="h6" color="#ffffff" textAlign="center" fontWeight="bold" mb={2}>
                Domingo, 22/09
            </Typography>

            {schedule.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                        marginBottom: '10px',
                    }}
                >
                    <Typography variant="body1" color="#ffffff">
                        {item.time}
                    </Typography>
                    <Chip
                        label={item.status}
                        color={item.color === 'error' ? 'error' : item.color === 'success' ? 'success' : 'default'}
                        size="small"
                        sx={{
                            backgroundColor: item.color === 'error' ? '#b71c1c' : item.color === 'success' ? '#2e7d32' : '#737373',
                            color: '#ffffff',
                            width: '90px',
                        }}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default ScheduleDayList;