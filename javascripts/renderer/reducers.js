import {combineReducers} from 'redux'
import {START_REQUEST, END_REQUEST, RECEIVE_SONGS, PLAY, PAUSE, SELECT_SONG, UPDATE_PROGRESS} from './actions'

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
    case SELECT_SONG:
      return Object.assign({}, defaultSong, action.song)
    case PLAY:
      return Object.assign({}, state, {isPlaying: true})
    case PAUSE:
      return Object.assign({}, state, {isPlaying: false})
    case UPDATE_PROGRESS:
      console.log(action.song)
      return Object.assign({}, state, action.song)
    default:
      return state
  }
}

function songsList(state = defaultSongs, action) {
  switch (action.type) {
    case RECEIVE_SONGS:
      return action.songs.filter(song => song.title)
    default:
      return state
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case START_REQUEST:
      return true
    case END_REQUEST:
      return false
    default:
      return state
  }
}

const appReducers = combineReducers({songsList, currentSong, userData, isFetching})

export default appReducers
