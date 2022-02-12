import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BotForm from './BotForm';
import Button from '@mui/material/Button';

export default () => {
  const [formErrors, setFormErrors] = useState();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post('/api/v1/bots', { bot: data })
    .then(() => {
      navigate('/bots');
    })
    .catch((error) => {
      console.error(error);
      setFormErrors(
        <div>An error occurred.</div>
      )
    });
  };

  const bot = {
    name: 'new bot',
    token: 'token'
  }

  return (
    <>
      <Link to="/bots">
        <Button variant="outline">
          Return to bots
        </Button>
      </Link>
      <BotForm onSubmit={onSubmit} bot={bot} formErrors={formErrors}/>
    </>
  );
};