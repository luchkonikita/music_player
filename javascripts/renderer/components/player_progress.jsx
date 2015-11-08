import React from 'react'

export default class PlayerProgress extends React.Component {

  _updatePosition(e) {
    const progress = parseInt(e.nativeEvent.clientX / e.target.offsetWidth * 100)
    this.props.onSeek(progress)
  }

  render() {
    return(
      <div className="player_progress" onClick={this._updatePosition.bind(this)}>
        <div className="player_progress-inner" style={{width: `${this.props.song.progress}%`}}></div>
      </div>
    )
  }
}
