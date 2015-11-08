import React from 'react'
import SvgIcon from './svg_icon'

export default class PlayerSearch extends React.Component {

  _submit(e) {
    e.preventDefault()
    this.props.onSubmit(this.refs.input.value)
  }

  _reset() {
    this.refs.input.value = ''
    this.props.onSubmit()
  }

  _renderResetButton() {
    if (this.props.term) {
      return(
        <div className="player_search-reset_button" onClick={this._reset.bind(this)}>
          <SvgIcon name='reset_icon' />
        </div>
      )
    }
  }

  render() {
    return(
      <div className="player_search">
        <form onSubmit={this._submit.bind(this)}>
          <input className="player_search-field" type="text" placeholder="Search for music" ref="input" />
          {this._renderResetButton()}
        </form>
      </div>
    )
  }
}
