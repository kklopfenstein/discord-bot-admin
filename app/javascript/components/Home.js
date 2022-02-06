import React from 'react'
import { Link } from 'react-router-dom';

export default () => {
  return (
    <>
      <h1>Discord Bot Admin</h1>
      <Link to="/bots">Manage bots</Link>
    </>
  );
};