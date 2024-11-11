import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers';
import { Box, Typography } from '@mui/material';

const ServerDay = ({ day, highlightedDays }) => {
    const isHighlighted = highlightedDays.some((highlightedDay) =>
        day.isSame(highlightedDay, 'day')
    );

    return (
        <Box
            sx={{
                backgroundColor: isHighlighted ? '#ff8a65' : 'transparent',
                borderRadius: '50%',
                color: '#ffffff',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
            }}
        >
            <Typography>{day.format('D')}</Typography>
        </Box>
    );
};

const CustomCalendar = () => {
    const [loading, setLoading] = useState(true);
    const [highlightedDays, setHighlightedDays] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setHighlightedDays([
                dayjs().date(5),
                dayjs().date(10),
                dayjs().date(20),
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{
                bgcolor: '#010726',
                padding: 2,
                borderRadius: 2,
                color: '#ffffff',
                width: '100%',
                height: '40vh',
            }}>
                <DateCalendar
                    loading={loading}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: (props) => <ServerDay {...props} highlightedDays={highlightedDays} />,
                    }}
                    sx={{
                        '.MuiPickersDay-root': {
                            color: '#ffffff',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        '.Mui-selected': {
                            backgroundColor: '#3f51b5',
                        },
                        '.MuiPickersCalendarHeader-root': {
                            color: '#ffffff',
                        },
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
};

export default CustomCalendar;