/**
 * @jsx React.DOM
 */

const React = require('react')

module.exports = class Main extends React.Component {

  getClients () {
    let nodeList = {}
    if (Array.isArray(this.props.tabs)) {
      this.props.tabs.forEach(this.buildListItem(nodeList))
    }
    return nodeList
  }

  render () {
    let nodeList = this.getClients()
    return(
      <div className='victim-container'>
        <div className="victim--heading">{this.props.clientId}</div>
        <div className="victim--details">
          <ul>
            {nodeList}
          </ul>
        </div>
      </div>
    )
  }

  buildListItem (nodeList = {}) {
    return function(tab) {
      nodeList[tab.id] = (
        <li data-id={tab.id}>
          <span>{tab.url}</span>
          <i className="icon-close"></i>
        </li>
      )
    }
  }
}
