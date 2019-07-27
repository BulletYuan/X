import React, { Component } from 'react';
import './menu.css'

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="CPT-right-menu" onClick={this.props.click}>
        <span className="btn glyphicon glyphicon-menu-hamburger"></span>
      </div>
    )
  }
}