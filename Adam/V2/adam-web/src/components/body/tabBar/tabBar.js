import React, { Component } from 'react';
import './tabBar.css';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  handleTabClick(i) {
    this.props.tabClick(i);
  }

  render() {
    return (
      <div id="CPT-body-tab-bar">
        <ul>
          {this.props.tabs.map((el, i) => {
            return <li key={i} className={i === this.props.selectedIndex ? 'active' : ''} onClick={this.handleTabClick.bind(this, i)}>{el.name}</li>
          })}
        </ul>
        <div className="tab-active transition-all" style={{ left: (this.props.selectedIndex * 80 + 5) + 'px' }}></div>
      </div>
    );
  }
}