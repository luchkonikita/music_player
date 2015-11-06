require('./../stylesheets/application.sass')

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux'

import PlayerWrapper from './components/player_wrapper'
import appReducers from './reducers'
import {fetchSongs} from './actions'

ipc.send('renderer:data_request')

ipc.on('renderer:data_response', (data) => {
  const element = document.getElementById('player')
  const loggerMiddleware = createLogger()
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)
  const store = createStoreWithMiddleware(appReducers, {userData: data})

  ReactDOM.render(
    <Provider store={store}>
      <PlayerWrapper />
    </Provider>,
    element
  )

  // fetch user's songs initially
  store.dispatch(fetchSongs())
})

