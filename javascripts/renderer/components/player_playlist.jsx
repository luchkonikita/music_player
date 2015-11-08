import React from 'react'
import classNames from 'classnames'
import SvgIcon from './svg_icon'

export default class PlayerPlaylist extends React.Component {

  _selectSong(song) {
    this.props.onSongSelect(song)
  }

  _toggleSong(song) {
    // do nothing if sond is already added
    if (!song.isOwn && song.isAdded) { return }
    this.props.onToggleSong(song)
  }

  _handleScroll() {
    // handle 'load more' feature here
  }

  _renderSongs() {
    return this.props.songs.map((song, i) => {
      const wrapperClassName = classNames({
        'player_playlist-song': true,
        'is-added': song.isAdded,
        'is-own': song.isOwn
      })

      return (
        <a className={wrapperClassName} key={i}>
          <span onClick={this._selectSong.bind(this, song)}>
            <b>{song.artist}</b> - {song.title}
          </span>
          <span className="player_playlist-song_icon" onClick={this._toggleSong.bind(this, song)}>
            <SvgIcon name={song.isOwn ? 'minus_icon' : (song.isAdded ? 'tick_icon' : 'plus_icon')} />
          </span>
        </a>
      )
    })
  }

  render() {
    return(
      <div className="player_playlist" onScroll={this._handleScroll.bind(this)}>
        {this._renderSongs()}
      </div>
    )
  }
}
