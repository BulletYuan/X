import React, { Component } from 'react';
import { Store } from '../../common/store';

import './header.css';
import Left from './left/left';
import Center from './center/center';
import Right from './right/right';
import Logo from '../logo/logo';
import Menu from './right/menu/menu';
import FullMask from './fullMask/fullMask';
import Side from './side/side';
import SideList from './side/list/list';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      directive: 'left',
      songs: [],
    };

    this.bindEvents();
  }


  componentDidMount() {
    Store.on('songs', (songs) => {
      this.setState({
        songs,
      });
    });
  }

  bindEvents() {
    this.rightMenuClick = this.rightMenuClick.bind(this);
    this.fullMaskClick = this.fullMaskClick.bind(this);
  }

  rightMenuClick() {
    this.setState({
      showMenu: true,
      directive: 'right',
    })
  }

  fullMaskClick() {
    this.setState({
      showMenu: false,
    })
  }

  render() {
    return (
      <div id="CPT-header-mask" style={{ height: this.props.style.height || '40px' }}>
        <div id="CPT-header" className={this.props.class} style={this.props.style}>
          <Left content={this.props.left ? <Logo style={{ lineHeight: this.props.style.height || '40px' }}></Logo> : null}></Left>
          <Center content={this.props.center ? '' : null}></Center>
          <Right content={this.props.right ? <Menu click={this.rightMenuClick}></Menu> : null}></Right>
        </div>
        <FullMask className={this.state.showMenu ? '' : 'hide'} onClick={this.fullMaskClick} ></FullMask>
        <Side className={[this.state.directive, this.state.showMenu ? '' : 'hideAni', 'transition-all'].join(' ')} closeClick={this.fullMaskClick} children={
          this.state.songs && this.state.songs.map((el, i) => {
            return <SideList key={i} index={i} name={el.songName}></SideList>
          })
        }></Side>
      </div>
    )
  }
}