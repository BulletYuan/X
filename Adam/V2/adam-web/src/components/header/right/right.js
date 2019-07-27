import React, { Component } from 'react';
import './right.css'

export default class Right extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="CPT-header-right">{this.props.content}</div>
    )
  }
}