/**
 * @jsx React.DOM
 */

const React = require('react')

module.exports = class Sidebar extends React.Component {

  getClients () {
    let nodeList = {}
    if (Array.isArray(this.props.victims)){
      this.props.victims.forEach(this.buildListItem(nodeList).bind(this))
    }
    return nodeList
  }

  render () {
    let nodeList = this.getClients()
    return(
      <div className='victims-sidebar victims'>
        {/*!VictimSearch Component*/}
        <ul>
          <li className="victims--heading">Show All Victims</li>
          {nodeList}
        </ul>
      </div>
    )
  }

  buildListItem (nodeList) {
    let current = this.current
    return function(victim) {
      nodeList[victim.clientId] = (
        <li data-clientid={victim.clientId} className={current === victim.clientId ? 'active' : ''} onClick={this.onClick}>
          <span>{victim.clientId}</span>
        </li>
      )
    }
  }

  onClick ( ) {
    // send out event
    console.log('clickit')
  }
}
