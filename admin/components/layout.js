/**
 * @jsx React.DOM
 */

const React = require('react')
const Sidebar = require('./sidebar')
const Main = require('./main')

module.exports = class Layout extends React.Component {

  constructor () {
    this.state = {
      victims: []
    }
  }

  render () {
    return(
      <div className='victim-main'>
        <Sidebar victims={this.state.victims} current={this.state.current} />
        <Main clientId={this.state.current} tabs={this.state.currentTabs} />
      </div>
    )
  }
}
