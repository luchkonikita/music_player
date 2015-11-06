import React from 'react'

export default class PlayerSearch extends React.Component {

  _submit(e) {
    e.preventDefault()
    this.props.onSubmit(this.refs.input.value)
  }

  render() {
    return(
      <div className="player_search">
        <form onSubmit={this._submit.bind(this)}>
          <input className="player_search-field" type="text" placeholder="Search for music" ref="input" />
        </form>
      </div>
    )
  }
}
