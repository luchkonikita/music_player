import React from 'react'

export default class SvgIcon extends React.Component {

  render() {
    const content = require(`images/${this.props.name}.svg`)
    return(
      <div className="icon" dangerouslySetInnerHTML={{__html: content}}></div>
    )
  }
}
