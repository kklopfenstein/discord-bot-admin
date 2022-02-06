import React from 'react'
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

export default () => {
  return (
    <Container maxWidth="lg" sx={{fontFamily: "Arial"}}>
      <Outlet/>
    </Container>
  );
} 