import React from 'react'
import SvgIcon from './svg_icon'

export default class PlayerPlaylist extends React.Component {

  _selectSong(song) {
    this.props.onSongSelect(song)
  }

  _addSong(song) {
    this.props.onSongAdd(song)
  }

  _handleScroll() {
    // handle 'load more' feature here
  }

  _renderSongs() {
    return this.props.songs.map((song, i) => {
      return (
        <a className="player_playlist-song" key={i}>
          <span onClick={this._selectSong.bind(this, song)}>
            <b>{song.artist}</b> - {song.title}
          </span>
          <span className="player_playlist-song_icon" onClick={this._addSong.bind(this, song)}>
            <SvgIcon name='plus_icon' />
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
