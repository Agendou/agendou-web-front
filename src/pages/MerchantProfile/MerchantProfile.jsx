import React from 'react';
import { Grid } from '@mui/material';
import SideBar from '../../components/SideBar/SideBar';
import ProfileCard from '../../components/MerchantProfile/ProfileCard/ProfileCard';

export default function MerchantProfile() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <ProfileCard />
      </Grid>
    </Grid>
  );
}
