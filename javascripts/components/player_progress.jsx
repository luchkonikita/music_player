import React from 'react'

export default class PlayerProgress extends React.Component {

  render() {
    return(
      <div className="player_progress">
        <div className="player_progress-inner" style={{width: '60%'}}></div>
      </div>
    )
  }
}
