import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BotForm from './BotForm';

export default () => {
  const [formErrors, setFormErrors] = useState();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
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
      <BotForm onSubmit={onSubmit} bot={bot} formErrors={formErrors}/>
      <Link to="/bots">Return to bots</Link>
    </>
  );
};