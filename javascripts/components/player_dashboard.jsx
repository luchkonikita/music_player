import React from 'react'

export default class PlayerDashboard extends React.Component {

  render() {
    return(
      <div className="player_dashboard">
        <div className="player_dashboard-info">
          <div className="player_dashboard-info_song">{this.props.song}</div>
          <div className="player_dashboard-info_artist">{this.props.artist}</div>
        </div>

        <div className="player_dashboard-actions">
          <a className="player_dashboard-actions_play"></a>
          <a className="player_dashboard-actions_like"></a>
          <a className="player_dashboard-actions_save"></a>
        </div>
      </div>
    )
  }
}
