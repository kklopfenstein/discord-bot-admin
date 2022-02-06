import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import BotForm from './BotForm';

export default () => {
  const [formErrors, setFormErrors] = useState();
  const [bot, setBot] = useState();
  const params = useParams();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const updateData = {...data, id: params.botId };
    axios.post(`/api/v1/bots/${updateData.id}`, { bot: updateData })
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.error(error);
      setFormErrors(
        <div>An error occurred.</div>
      )
    });
  };

  const loadBot = (id) => {
    console.log(id);
    axios.get(`/api/v1/bots/${id}`)
    .then((response) => {
      console.log(response.data);
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
    console.log('bot:', bot);
    response = <BotForm onSubmit={onSubmit} bot={bot} formErrors={formErrors}/>
  }

  return (
    <>
    {response}
    <Link to="/bots">Return to bots</Link>
    </>
  );
};