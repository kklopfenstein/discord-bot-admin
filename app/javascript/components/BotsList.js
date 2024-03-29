import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default () => {
  const [bots, setBots] = useState([]);

  let loadBots = () => {
    axios.get('/api/v1/bots')
      .then(function (response) {
        let bots = []
        response.data.forEach((bot) => {
          const newBot = {
            id: bot.id,
            name: bot.name,
            token: bot.token
          };

          bots.push(newBot);
        });
        setBots(bots);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  useEffect(() => {
    loadBots();
  }, []);

  return (
    <>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Link to="/bots/new">
          <Button variant="outline">
            New Bot
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Bot name</TableCell>
              <TableCell>Bot token</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bots.map((bot) => (
              <TableRow key={bot.id}>
                <TableCell>{bot.name}</TableCell>
                <TableCell>{bot.token}</TableCell>
                <TableCell>
                  <Link to={`/bots/${bot.id}`}>
                    <Button variant="outline">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/bots/${bot.id}/manage`}>
                    <Button variant="outline">
                      Manage
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   </>
  )
}