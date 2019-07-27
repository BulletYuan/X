import React, { Component } from 'react';
import './fullMask.css';

export default class FullMask extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="CPT-full-mask" {...this.props}  ></div>
    );
  }
}