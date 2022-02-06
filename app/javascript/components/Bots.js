import React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h2>Bots</h2>
      <Outlet />
    </div>
  );
};