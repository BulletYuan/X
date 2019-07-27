import React, { Component } from 'react';
import './side.css';

export default class Side extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="CPT-header-side" className={this.props.className}>
        <p className="close-bar"><span className="transition-all glyphicon glyphicon-remove" onClick={this.props.closeClick}></span></p>
        {this.props.children.map(el => {
          return el;
        })}
      </div>
    );
  }
}