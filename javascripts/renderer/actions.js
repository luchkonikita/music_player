import querystring from 'querystring'
import actionTypes from './action_types'

const VK_API_URL = 'https://api.vk.com/method/'
const VK_API_VERSION = '5.37'

export function play() {
  return {
    type: actionTypes.PLAY,
    isPlaying: true
  }
}

export function pause() {
  return {
    type: actionTypes.PAUSE,
    isPlaying: false
  }
}

export function seek(progress) {
  return {
    type: actionTypes.SEEK,
    progress
  }
}

export function selectSong(song) {
  return {
    type: actionTypes.SELECT_SONG,
    song
  }
}

export function updateProgress(song) {
  return {
    type: actionTypes.UPDATE_PROGRESS,
    song
  }
}

export function startRequest() {
  return {
    type: actionTypes.START_REQUEST
  }
}

export function endRequest() {
  return {
    type: actionTypes.END_REQUEST
  }
}

export function failRequest(reason) {
  return {
    type: actionTypes.FAIL_REQUEST,
    errorMessage: reason
  }
}

export function receiveSongs(songs, term) {
  return {
    type: actionTypes.RECEIVE_SONGS,
    songs,
    term
  }
}

export function fetchSongs(searchQuery) {
  return function (dispatch, getState) {
    dispatch(startRequest())

    const method = searchQuery ? 'audio.search?' : 'audio.get?'
    const params = querystring.stringify({
      q: searchQuery,
      access_token: getState().userData.access_token,
      v: VK_API_VERSION,
      count: (searchQuery ? 100 : 3000)
    })

    return fetch(VK_API_URL + method + params)
      .then(ret => ret.json())
      .then(json => {
        dispatch(endRequest())
        if (json.response) {
          dispatch(receiveSongs(json.response.items, searchQuery))
        } else {
          dispatch(failRequest(json.errors))
        }
      })
      .catch(ex => dispatch(failRequest(ex)))
  }
}

export function markSong(song, action) {
  return {
    type: actionTypes.MARK_SONG,
    song,
    action
  }
}

export function toggleSong(song, action) {
  if (action !== 'add' && action !== 'delete') {
    throw 'To toggle song you need provide action: "add" or "delete"'
  }
  return function (dispatch, getState) {
    dispatch(startRequest())

    const params = querystring.stringify({
      owner_id: song.owner_id,
      audio_id: song.id,
      access_token: getState().userData.access_token,
      v: VK_API_VERSION
    })

    return fetch(VK_API_URL + `audio.${action}?` + params)
      .then(ret => ret.json())
      .then(json => {
        dispatch(endRequest())
        json.response ? dispatch(markSong(song, action)) : dispatch(failRequest(json.errors))
      })
      .catch(ex => failRequest(ex))
  }
}
