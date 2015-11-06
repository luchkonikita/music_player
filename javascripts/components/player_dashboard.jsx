import React from 'react'
import SvgIcon from './svg_icon'
import formatSeconds from './../utils/format_seconds'

export default class PlayerDashboard extends React.Component {

  _remainingTime() {
    return formatSeconds(this.props.song.duration - this.props.song.currentTime)
  }

  render() {
    return(
      <div className="player_dashboard">
        <div className="player_dashboard-info">
          <div className="player_dashboard-info_time">- {this._remainingTime()}</div>
          <div className="player_dashboard-info_song">{this.props.song.title}</div>
          <div className="player_dashboard-info_artist">{this.props.song.artist}</div>
        </div>

        <div className="player_dashboard-actions">
          <a className="player_dashboard-actions_play" onClick={this.props.onPlayClick}>
            <SvgIcon name={this.props.song.isPlaying ? 'pause_icon' : 'play_icon'} />
          </a>
          <a className="player_dashboard-actions_like">
            <SvgIcon name='like_icon' />
          </a>
          <a className="player_dashboard-actions_save" download={this.props.song.title} href={this.props.song.url}>
            <SvgIcon name='save_icon' />
          </a>
        </div>
      </div>
    )
  }
}
