import React, { Component } from 'react';
import './left.css'

export default class Left extends Component {
  render() {
    return (
      <div id="CPT-header-left">{this.props.content}</div>
    )
  }
}