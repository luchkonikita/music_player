import React from 'react'

export default class PlayerSearch extends React.Component {

  render() {
    return(
      <div className="player_search">
        <input className="player_search-field" type="text" placeholder="Search for music" />
      </div>
    )
  }
}
