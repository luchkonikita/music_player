import _ from 'underscore'
import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import PlayerDashboard from './player_dashboard'
import PlayerProgress from './player_progress'
import PlayerSearch from './player_search'
import PlayerPlaylist from './player_playlist'
import PlayerOverlay from './player_overlay'
import {fetchSongs, toggleSong, selectSong, play, pause, updateProgress} from '../actions'

class PlayerWrapper extends React.Component {

  _updateProgress() {
    const audio = this.refs.audio

    this.props.dispatch(updateProgress({
      currentTime: audio.currentTime,
      progress: (audio.currentTime / audio.duration * 100)
    }))
  }

  _togglePlay() {
    this.props.currentSong.isPlaying ? this.props.dispatch(pause()) : this.props.dispatch(play())
  }

  componentDidMount() {
    this.refs.audio.addEventListener('timeupdate', _.throttle(this._updateProgress.bind(this), 1000))
  }

  componentDidUpdate() {
    this.props.currentSong.isPlaying ? this.refs.audio.play() : this.refs.audio.pause()
  }

  render() {
    const {dispatch, songsList, currentSong, userData, isFetching} = this.props

    const wrapperClassName = classNames({
      'player_wrapper': true,
      'is-playing': currentSong.isPlaying
    })

    return(
      <div className={wrapperClassName} >
        <audio src={currentSong.url} ref="audio" />

        <PlayerDashboard
         song={currentSong}
         onPlayClick={this._togglePlay.bind(this)} />

        <PlayerProgress
         song={currentSong} />

        <PlayerSearch
         term={songsList.term}
         onSubmit={value => {
          dispatch(fetchSongs(value, userData.access_token))
         }} />

        <PlayerPlaylist
         songs={songsList.items}
         onSongSelect={song => {
          dispatch(selectSong(song))
          dispatch(play())
         }}
         onToggleSong={song => {
          dispatch(toggleSong(song, (song.isOwn ? 'delete' : 'add')))
         }} />

         <PlayerOverlay isFetching={isFetching} />
      </div>
    )
  }
}

function select(state) {
  return {
    currentSong: state.currentSong,
    songsList: state.songsList,
    userData: state.userData,
    isFetching: state.isFetching
  }
}

export default connect(select)(PlayerWrapper)
