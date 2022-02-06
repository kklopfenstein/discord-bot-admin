import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default (props) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  return (
    <form>
      <Box sx={{margin: 5}}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          defaultValue={props.bot.name}
          render={({ field }) => (
            <TextField {...field} label="Name" variant="outlined"/>
          )}/>
        <div>
          {errors.name?.type === 'required' && <span>Name is required.</span>}
        </div>
      </Box>
      <Box sx={{margin: 5}}>
        <Controller
          name="token"
          control={control}
          rules={{ required: true,  maxLength: 59, minLength: 59, pattern: /^[A-Za-z0-9]{24}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{27}$/i }}
          defaultValue={props.bot.token}
          render={({ field }) => (
            <TextField {...field} label="Token" variant="outlined"/>
          )}/>
        <div>
          {errors.token?.type === 'required' && <span>Token is required.</span>}
          {(errors.token?.type === 'maxLength' || errors.token?.type === 'minLength') && <span>This field must be 59 characters long.</span>}
          {errors.token?.type === 'pattern' && <span>Must be a valid token.</span>}
        </div>
      </Box>
      {props.formErrors}
      <Box sx={{margin: 5}}>
        <Button onClick={handleSubmit(props.onSubmit)}>Submit</Button>
      </Box>
    </form>
  );
};