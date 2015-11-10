import {assert} from 'chai'
import sinon from 'sinon/pkg/sinon'
import thunkMiddleware from 'redux-thunk'
import configureStore from 'redux-mock-store'

import actionTypes from '../action_types'
import * as actions from '../actions'

// ----------------------
// Specs for sync actions
// ----------------------
context('sync actions', () => {
  describe('actions.play', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.PLAY,
        isPlaying: true
      }

      assert.deepEqual(actions.play(), expectedAction)
    })
  })

  describe('actions.pause', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.PAUSE,
        isPlaying: false
      }

      assert.deepEqual(actions.pause(), expectedAction)
    })
  })

  describe('actions.selectSong', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.SELECT_SONG,
        song: {
          title: 'Lullaby'
        }
      }

      assert.deepEqual(actions.selectSong({title: 'Lullaby'}), expectedAction)
    })
  })

  describe('actions.updateProgress', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.UPDATE_PROGRESS,
        song: {
          progress: 75
        }
      }

      assert.deepEqual(actions.updateProgress({progress: 75}), expectedAction)
    })
  })

  describe('actions.seek', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.SEEK,
        progress: 50
      }

      assert.deepEqual(actions.seek(50), expectedAction)
    })
  })

  describe('actions.startRequest', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.START_REQUEST,
      }

      assert.deepEqual(actions.startRequest(), expectedAction)
    })
  })

  describe('actions.endRequest', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.END_REQUEST,
      }

      assert.deepEqual(actions.endRequest(), expectedAction)
    })
  })

  describe('actions.failRequest', () => {
    it('returns expected action', () => {
      const expectedAction = {
        type: actionTypes.FAIL_REQUEST,
        errorMessage: 'Network error'
      }

      assert.deepEqual(actions.failRequest('Network error'), expectedAction)
    })
  })

  describe('actions.receiveSongs', () => {
    it('returns expected action', () => {
      const songs = [
        {title: 'Lullaby'}
      ]
      const expectedAction = {
        type: actionTypes.RECEIVE_SONGS,
        songs: [
          {title: 'Lullaby'}
        ],
        term: 'Lullaby'
      }

      assert.deepEqual(actions.receiveSongs(songs, 'Lullaby'), expectedAction)
    })
  })
})

// -----------------------
// Specs for async actions
// -----------------------
context('async actions', () => {
  const mockStore = configureStore([thunkMiddleware])
  const defaultState = {userData: {access_token: '123qwe'}}

  function getResponse(data) {
    return [200, {'Content-type': 'application/json'}, JSON.stringify(data)]
  }

  describe('actions.fetchSongs', () => {
    it('dispatches FAIL_REQUEST when API returns errors', (done) => {
      const server = sinon.fakeServer.create()
      server.respondWith('GET',
                         'https://api.vk.com/method/audio.get?q=&access_token=123qwe&v=5.37&count=3000',
                         getResponse({errors: 'Bad request'}))

      const expectedActions = [
        {type: actionTypes.START_REQUEST},
        {type: actionTypes.END_REQUEST},
        {type: actionTypes.FAIL_REQUEST, errorMessage: 'Bad request'}
      ]

      const store = mockStore(defaultState, expectedActions, done)
      store.dispatch(actions.fetchSongs())
      server.respond()
      server.restore()
    })

    it('dispatches RECEIVE_SONGS when API returns items', (done) => {
      const server = sinon.fakeServer.create()
      const response = {items: [
        {title: 'Catchy song'}
      ]}

      server.respondWith('GET',
                         'https://api.vk.com/method/audio.search?q=catchy%20song&access_token=123qwe&v=5.37&count=100',
                         getResponse({response}))

      const expectedActions = [
        {type: actionTypes.START_REQUEST},
        {type: actionTypes.END_REQUEST},
        {type: actionTypes.RECEIVE_SONGS, songs: [{title: 'Catchy song'}], term: 'catchy song'}
      ]

      const store = mockStore(defaultState, expectedActions, done)
      store.dispatch(actions.fetchSongs('catchy song'))
      server.respond()
      server.restore()
    })
  })

  describe('actions.toggleSong', () => {
    it('dipatches MARK_SONG with `add` action', (done) => {
      const server = sinon.fakeServer.create()

      server.respondWith('GET',
                         'https://api.vk.com/method/audio.add?owner_id=1&audio_id=1&access_token=123qwe&v=5.37',
                         getResponse({response: 1}))

      const expectedActions = [
        {type: actionTypes.START_REQUEST},
        {type: actionTypes.END_REQUEST},
        {type: actionTypes.MARK_SONG, action: 'add', song: {owner_id: 1, id: 1}}
      ]

      const store = mockStore(defaultState, expectedActions, done)
      store.dispatch(actions.toggleSong({owner_id: 1, id: 1}, 'add'))
      server.respond()
      server.restore()
    })

    it('dipatches MARK_SONG with `delete` action', (done) => {
      const server = sinon.fakeServer.create()

      server.respondWith('GET',
                         'https://api.vk.com/method/audio.delete?owner_id=1&audio_id=1&access_token=123qwe&v=5.37',
                         getResponse({response: 1}))

      const expectedActions = [
        {type: actionTypes.START_REQUEST},
        {type: actionTypes.END_REQUEST},
        {type: actionTypes.MARK_SONG, action: 'delete', song: {owner_id: 1, id: 1}}
      ]

      const store = mockStore(defaultState, expectedActions, done)
      store.dispatch(actions.toggleSong({owner_id: 1, id: 1}, 'delete'))
      server.respond()
      server.restore()
    })
  })
})
