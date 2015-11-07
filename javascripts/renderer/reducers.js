import {combineReducers} from 'redux'
import actionTypes from './action_types'

const defaultSongs = []
const defaultSong = {
  title: '--',
  artist: '--',
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0
}

function userData(state = {}, action) {
  return state
}

function currentSong(state = defaultSong, action) {
  switch (action.type) {
    case actionTypes.SELECT_SONG:
      return Object.assign({}, defaultSong, action.song)
    case actionTypes.PLAY:
      return Object.assign({}, state, {isPlaying: true})
    case actionTypes.PAUSE:
      return Object.assign({}, state, {isPlaying: false})
    case actionTypes.UPDATE_PROGRESS:
      return Object.assign({}, state, action.song)
    default:
      return state
  }
}

function songsList(state = defaultSongs, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_SONGS:
      return action.songs.filter(song => song.title)
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case actionTypes.START_REQUEST:
      return true
    case actionTypes.END_REQUEST:
      return false
    default:
      return state
  }
}

const appReducers = combineReducers({songsList, currentSong, userData, isFetching})

export default appReducers
