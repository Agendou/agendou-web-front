import React from 'react';
import { Grid } from '@mui/material';
import SideBar from '../../components/Sidebar/Sidebar';
import ManualAppointments from '../../components/ManualAppointments/ManualAppointments/ManualAppointments';

export default function ManualAppointment() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideBar isVisible={true} />
      </Grid>
      <Grid item xs={10}>
        <ManualAppointments />
      </Grid>
    </Grid>
  );
}
