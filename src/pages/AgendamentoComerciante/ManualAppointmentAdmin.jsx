import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderApp from "../../components/HeaderApp/HeaderApp";
import ScheduleDayList from "../../components/ScheduleDayList/ScheduleDayList";
import ManualAppointmentForm from "../../components/ManualAppointmentForm.jsx/ManualAppointmentForm";
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import { Box, Grid } from '@mui/material';

const ManualAppointmentAdmin = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                padding: 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Sidebar isVisible={true} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    width: '100%',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 3
                }}
            >
                <HeaderApp />
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: '100%',
                        maxWidth: '1440px',
                        justifyContent: 'center',
                        height: '90vh',
                        alignItems: 'center',
                    }}
                >
                    <Grid item xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
                        <ManualAppointmentForm />
                    </Grid>

                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', gap: 2 }}>
                        <CustomCalendar />
                        <ScheduleDayList />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ManualAppointmentAdmin;


