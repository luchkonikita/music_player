require('./../stylesheets/application.sass')

import React from 'react'
import ReactDOM from 'react-dom'
import PlayerWrapper from './components/player_wrapper'

const element = document.getElementById('player')

ipc.send('renderer:data_request')

ipc.on('renderer:data_response', (data) => {
  ReactDOM.render(<PlayerWrapper />, element)
})

