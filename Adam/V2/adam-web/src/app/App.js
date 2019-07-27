import React, { Component } from 'react';
import axios from 'axios';
import { Store, Data } from '../common/store';

import '../styles/common.css';
import '../styles/bulletFlex.css';
import './App.css';

import Header from '../components/header/header';
import Body from '../components/body/body';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('../assets/json/music.json')
      .then(res => {
        if (res.status === 200 && res.data && res.data.songs) {
          Data.selectedSong = 0;
          Data.songs = res.data.songs;
          Store.emit('songs', res.data.songs);
        }
      })
      .catch(err => {
        console.error(err)
      });
  }

  render() {
    return (
      <div id="Adam">
        <Header class="flex-con flex-con-between align-items-center fixed" style={{ height: 60 + 'px' }} left right></Header>
        <Body></Body>
      </div>
    );
  }
}

export default App;
