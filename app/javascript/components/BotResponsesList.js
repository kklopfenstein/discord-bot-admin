import React from 'react';
import BotResponseForm from './BotResponseForm';
import axios from 'axios';

export default (props) => {

  const onSubmitEdit = (id, data) => {
    axios.put(`/api/v1/bot_responses/${id}`, { bot_response: data })
    .then((data) => {
      console.log(data);
      props.reloadData();
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  const onSubmitNew = (data) => {
    axios.post(`/api/v1/bot_responses`, { bot_response: data })
    .then((data) => {
      console.log(data);
      props.reloadData();
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const onDelete = (id) => {
    axios.delete(`/api/v1/bot_responses/${id}`)
    .then((data) => {
      console.log(data);
      props.reloadData();
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
    {props.botResponses?.map((botResponse) => (
      <BotResponseForm key={botResponse.id} botResponse={botResponse} onSubmitEdit={onSubmitEdit} onDelete={onDelete}/>
    ))}
    <BotResponseForm key="new" botId={props.botId} onSubmitNew={onSubmitNew} botResponse={{ pattern: '', response: '', channel: '' }} />
    </>
  );
};