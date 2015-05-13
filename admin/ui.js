/**
 * @jsx React.DOM
 */

const React = require('react');
const Layout = require('./components/layout')
const utils = require('./utils')

module.exports = class Site {
  constructor () {
    this.victims = {}
    this.view = new React.render(<Layout />, document.body)
  }

  get victimList () {
    return Object.keys(this.victims)
      .map(utils.mapKeys(this.victims))
  }

  get tabList () {
    let current = this.victims[this.current]
    return Object.keys(current)
      .map(utils.mapKeys(current))
  }

  update (tabs = [], clientId) {
    this.victims[clientId] = tabs // update store
    this.current = this.current || this.victimList[0].clientId

    this.view.setState({
      victims: this.victimList,
      current: this.current,
      currentTabs: this.tabList
    })
  }
}
