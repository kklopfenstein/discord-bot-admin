import React from 'react'
import { render } from 'react-dom'
// import App from '../components/App'
import Routes from '../routes/index'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <>{Routes}</>,
    document.body.appendChild(document.createElement('div')),
  )
})
