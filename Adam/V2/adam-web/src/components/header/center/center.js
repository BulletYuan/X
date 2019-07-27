import React, { Component } from 'react';
import './center.css'

export default class Center extends Component {
  render() {
    return (
      <div id="CPT-header-center">{this.props.content}</div>
    )
  }
}