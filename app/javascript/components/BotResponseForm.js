import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default (props) => {
  const { handleSubmit, formState: { errors }, control } = useForm();

  const onSubmit = (formData) => {
    if (props.botResponse?.id) {
      props.onSubmitEdit(props.botResponse.id, {...formData, bot_id: props.botId});
    } else {
      props.onSubmitNew({...formData, bot_id: props.botId});
    }
  };


  return (
    <form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell>Response</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Controller
                    name="response"
                    control={control}
                    rules={{ required: true, maxLength: 200 }}
                    defaultValue={props.botResponse?.response}
                    render={({ field }) => (
                      <TextField {...field} label="Response" variant="outlined"/>
                    )}/>
                  <div>
                    {errors.response?.type === 'required' && <span>Response is required.</span>}
                    {errors.response?.type === 'maxLength' && <span>Response cannot be more than 200 characters long.</span>}
                  </div>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pattern</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Controller
                    name="pattern"
                    control={control}
                    rules={{ required: true, maxLength: 100 }}
                    defaultValue={props.botResponse?.pattern}
                    render={({ field }) => (
                      <TextField {...field} label="Pattern" variant="outlined"/>
                    )}/>
                  <div>
                    {errors.pattern?.type === 'required' && <span>Pattern is required.</span>}
                    {errors.pattern?.type === 'maxLength' && <span>Pattern cannot be more than 100 characters long.</span>}
                  </div>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Channel</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Controller
                    name="channel"
                    control={control}
                    rules={{ required: true, maxLength: 100, pattern: /^\#[A-Za-z0-9\-]+$/i }}
                    defaultValue={props.botResponse?.channel}
                    render={({ field }) => (
                      <TextField {...field} label="#channel" variant="outlined"/>
                    )}/>
                  <div>
                    {errors.channel?.type === 'required' && <span>Channel is required.</span>}
                    {errors.channel?.type === 'maxLength' && <span>Channel cannot be more than 100 characters long.</span>}
                    {errors.channel?.type === 'pattern' && <span>Channel must be a valid channel name.</span>}
                  </div>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{margin: 5}}>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Box>
    </form>
  );
};