import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default () => {
  const params = useParams();
  const [botInfo, setBotInfo] = useState();
  const [botManageInfo, setBotManageInfo] = useState();

  const loadBotManageInfo = (id) => {
    axios.get(`/api/v1/bot_manage/${id}`)
      .then(function (response) {
        setBotManageInfo(response.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const loadBotInfo = (id) => {
    axios.get(`/api/v1/bots/${id}`)
      .then(function (response) {
        setBotInfo(response.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const startStopBot = () => {
    const id = params.botId;
    const service = botManageInfo?.started ? 'stop' : 'start';

    axios.put(`/api/v1/bot_manage/${id}/${service}`)
    .then(() => {
      loadBotManageInfo(id);
    });
  };

  useEffect(() => {
    loadBotManageInfo(params.botId);
    loadBotInfo(params.botId);
  }, [params.botId]);

  return (
    <>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Link to="/bots">
          <Button variant="outline">
            Return to Bots
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{botInfo?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>{botInfo?.token}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>{botManageInfo?.started ? 'Started' : 'Stopped'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
         <Button onClick={startStopBot} variant="outline">{botManageInfo?.started ? 'Stop' : 'Start'}</Button>
      </Box>
   </>
  );
};