import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './HomeStyle.css';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#fff',
}));

const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid className='container-a' container spacing={2}>
          <Grid container justifyContent='center' item xs={12}>
            <Grid item xs={12} md={10}>
              <h1 className='header'>Aritifical Intelligence Powered Ads and Social Creatives</h1>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' item xs={12}>
            <Grid item xs={11} md={9}>
              <p className='subText'>Generate conversion focused ad creatives and social media posts creatives in a matter of seconds using Artifical intelligence. Get better results while saving time</p>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' item xs={12}>
            <ColorButton className='getStarted' endIcon={<EastIcon />}>Get Started</ColorButton>
          </Grid>
          <Grid container justifyContent='center' item xs={12}>
            <Grid item sm={12} md={6} lg={4} container justifyContent='center'>
              <img className='item' src="./images/item1.svg" alt="" />
            </Grid>
            <Grid item sm={12} md={6} lg={4} container justifyContent='center'>
              <img className='mid-image' src="./images/item2.svg" alt="" />
            </Grid>
            <Grid item sm={12} md={6} lg={4} container justifyContent='center'>
              <img className='item' src="./images/item3.svg" alt="" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Home