import React, { Component } from 'react';

import './body.css';
import TabBar from './tabBar/tabBar';
import Music from './music/music';

export default class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      selectedSong: 0,
      tabs: [
        {
          id: 1,
          name: "封面",
        },
        {
          id: 2,
          name: "歌词",
        }
      ],
    }
  }

  componentDidMount() {
  }
  componentDidUpdate() {
  }

  tabClick = i => {
    this.setState({
      selectedIndex: i || 0
    })
  }

  render() {
    return (
      <div id="CPT-body">
        <div id="CPT-body-container">
          <TabBar selectedIndex={this.state.selectedIndex} tabs={this.state.tabs} tabClick={this.tabClick}></TabBar>
          <Music thumb={this.state.selectedIndex}></Music>
        </div>
      </div>
    );
  }
}