import React from 'react'
import classNames from 'classnames'
import SvgIcon from './svg_icon'

export default class PlayerOverlay extends React.Component {

  render() {
    const overlayClassName = classNames({
      'player_overlay': true,
      'is-visible': this.props.isFetching,
      'is-hidden': !this.props.isFetching
    })

    return (
      <div className={overlayClassName}>
        <div className="player_overlay-loader">
          <SvgIcon name="loader_icon" />
        </div>
      </div>
    )
  }
}
