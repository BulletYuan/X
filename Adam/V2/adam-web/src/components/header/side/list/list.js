import React, { Component } from 'react';
import './list.css';
import { Store } from '../../../../common/store';

export default class SideList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
    this.listClick = this.listClick.bind(this);
  }

  componentDidMount() {
    Store.on("selectedSong", i => {
      this.setState({
        selected: i,
      })
    });
  }

  listClick() {
    Store.emit('selectedSong', this.props.index)
  }

  render() {
    return (
      <div id="CPT-header-side-list" className="transition-all" onClick={this.listClick}>
        {this.props.name}
        {this.props.index === this.state.selected ? <a className='arrow glyphicon glyphicon-play-circle'></a> : null}
      </div>
    );
  }
}