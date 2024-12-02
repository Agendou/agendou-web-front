import React from 'react';
import { Grid } from '@mui/material';
import ManualAppointments from '../../components/ManualAppointments/ManualAppointments/ManualAppointments';
import ClientHeader from '../../components/ClienteHeader/ClientHeader';

export default function ManualAppointment() {
  return (
    <Grid container>
      <ClientHeader />
        <ManualAppointments />
    </Grid>
  );
}
