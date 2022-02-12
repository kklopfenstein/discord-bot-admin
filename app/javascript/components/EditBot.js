import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import BotForm from './BotForm';
import Button from '@mui/material/Button';

export default () => {
  const [formErrors, setFormErrors] = useState();
  const [bot, setBot] = useState();
  const params = useParams();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const updateData = {...data, id: params.botId };
    axios.put(`/api/v1/bots/${updateData.id}`, { bot: updateData })
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

  const loadBot = (id) => {
    axios.get(`/api/v1/bots/${id}`)
    .then((response) => {
      setBot(response.data);
    })
    .catch((error) => {
      console.error(error);
      setFormErrors(
        <div>The bot could not be found.</div>
      )
    });
  };


  useEffect(() => {
    loadBot(params.botId);
  }, [params.id])

  let response = <div>Loading...</div>

  if (bot) {
    response = <BotForm onSubmit={onSubmit} bot={bot} formErrors={formErrors}/>
  }

  return (
    <>
    <Link to="/bots">
      <Button variant="outline">
        Return to bots
      </Button>
    </Link>
    {response}
    </>
  );
};