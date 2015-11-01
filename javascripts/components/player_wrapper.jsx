import React from 'react'
import PlayerDashboard from './player_dashboard'
import PlayerProgress from './player_progress'
import PlayerSearch from './player_search'
import PlayerPlaylist from './player_playlist'

const songs = [
  {name: 'Pass this on', artist: 'The Knife'},
  {name: 'Like a pen', artist: 'The Knife'}
]

export default class PlayerWrapper extends React.Component {

  render() {
    return(
      <div className="player_wrapper">
        <PlayerDashboard song="Little Monsters" artist="Charlotte Gainsbourg" />
        <PlayerProgress />
        <PlayerSearch />
        <PlayerPlaylist songs={songs} />
      </div>
    )
  }
}
