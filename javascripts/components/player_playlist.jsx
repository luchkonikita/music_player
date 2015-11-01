import React from 'react'

export default class PlayerPlaylist extends React.Component {

  _renderSongs() {
    return this.props.songs.map((song) => {
      return (
        <a className="player_playlist-song" key={song.name}>
          <b>{song.artist}</b> - {song.name}
          <span className="player_playlist-song_icon"></span>
        </a>
      )
    })
  }

  render() {
    return(
      <div className="player_playlist">
        {this._renderSongs()}
      </div>
    )
  }
}
