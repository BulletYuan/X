import React, { Component } from 'react';

import './logo.css';

export default class Logo extends Component {
  render() {
    return (
      <p id="CPT-logo" style={this.props.style}><span className="a">A</span>dam<span className="d">.</span></p>
    )
  }
}