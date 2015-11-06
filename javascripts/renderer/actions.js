import querystring from 'querystring'

const VK_API_URL = 'https://api.vk.com/method/'
const VK_API_VERSION = '5.37'

export const START_REQUEST = 'START_REQUEST'
export const END_REQUEST = 'END_REQUEST'
export const RECEIVE_SONGS = 'RECEIVE_SONGS'
export const SELECT_SONG = 'SELECT_SONG'
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'
export const ADD_SONG = 'ADD_SONG'
export const MARK_SONG_AS_ADDED = 'MARK_SONG_AS_ADDED'

export function play() {
  return {
    type: PLAY,
    isPlaying: true
  }
}

export function pause() {
  return {
    type: PAUSE,
    isPlaying: false
  }
}

export function selectSong(song) {
  return {
    type: SELECT_SONG,
    song
  }
}

export function updateProgress(song) {
  return {
    type: UPDATE_PROGRESS,
    song
  }
}

export function startRequest() {
  return {
    type: START_REQUEST
  }
}

export function endRequest() {
  return {
    type: END_REQUEST
  }
}


export function receiveSongs(songs) {
  return {
    type: RECEIVE_SONGS,
    songs
  }
}

export function fetchSongs(value) {
  return function (dispatch, getState) {
    const method = value ? '/audio.search?' : '/audio.get?'
    const params = querystring.stringify({
      q: value,
      access_token: getState().userData.access_token,
      v: VK_API_VERSION
    })

    const url = VK_API_URL + method + params

    // TODO mb generalize setting a loading state and reuse for other events
    dispatch(startRequest())

    return fetch(url)
      .then(ret => ret.json())
      .then(json => {
        dispatch(endRequest())

        if (json.response) {

          dispatch(receiveSongs(json.response.items))
        } else {
          // TODO implement errors
          // dispatch(showNetworkError())
        }
      })
  }
}

export function markSongAsAdded(song) {
  console.log(song)
  return {
    type: MARK_SONG_AS_ADDED,
    song
  }
}

export function addSong(song) {
  return function (dispatch, getState) {
    const params = querystring.stringify({
      owner_id: song.owner_id,
      audio_id: song.id,
      access_token: getState().userData.access_token,
      v: VK_API_VERSION
    })

    const url = VK_API_URL + '/audio.add?' + params

    dispatch(startRequest())

    return fetch(url)
      .then(ret => ret.json())
      .then(json => {
        dispatch(endRequest())

        if (json.response) {
          dispatch(markSongAsAdded(song))
        } else {
          // TODO implement errors
          // dispatch(showNetworkError())
        }
      })
  }
}
