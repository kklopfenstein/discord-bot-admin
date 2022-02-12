import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bots from '../components/Bots';
import NewBot from '../components/NewBot';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import App from '../components/App';
import BotsList from '../components/BotsList';
import EditBot from '../components/EditBot';
import BotManage from '../components/BotManage';

export default (
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home/>}/>
        <Route path='bots' element={<Bots />}>
          <Route index element={<BotsList />}/>
          <Route path='new' element={<NewBot />}/>
          <Route path=':botId' element={<EditBot />} />
          <Route path=':botId/manage' element={<BotManage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Router>
)
