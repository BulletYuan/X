import React, { Component } from 'react';
import './music.css';
import { Store } from '../../../common/store';

export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _playTimer: null,
      _mouseMark: false,
      _buffered: false,
      playMark: false,
      progress: 0,
      handle: 0,
      buff: 0,
      songs: [],
      currentId: 0,
      song: {},
    }
  }

  componentWillUnmount() {
    this.pauseAudio();
  }
  componentDidMount() {
    Store.on('songs', (songs) => {
      this.setState({
        songs,
      }, () => {
        Store.emit('selectedSong', this.state.currentId)
      });
    });
    Store.on("selectedSong", i => {
      this.setState({
        currentId: i,
        song: this.state.songs[i],
      }, () => {
        this.initAudio();
      });
    });
  }

  initAudio() {
    if (!this.state.song || !this.state.song.songId) { return; }
    const audio = document.querySelector("#ADAM-audio");
    audio.src = this.state.song.songUrl;
    audio.oncanplay = () => {
      if (audio.buffered.length > 0 && audio.duration > 0) {
        this.setState({
          _buffered: true,
          buff: audio.buffered.end(0) / audio.duration,
        }, () => {
          if (this.state.buff > 0) {
            const handlerWidth = document.querySelector('.music-handle-bar').offsetWidth;
            this.setState({
              handle: -handlerWidth / 2,
            })
          }
        });
      }
    }
    audio.onplaying = () => {
      this.refreshAudio();
    }
  }
  resetAudio() {
    this.setState({
      _mouseMark: false,
      _buffered: false,
      playMark: false,
      progress: 0,
      handle: 0,
      buff: 0,
    })
  }
  refreshAudio() {
    const audio = document.querySelector("#ADAM-audio");
    const duration = audio.duration,
      current = audio.currentTime,
      width = document.querySelector(".music-control").offsetWidth,
      buff = audio.buffered.end(0),
      handlerWidth = document.querySelector('.music-handle-bar').offsetWidth;
    if (audio.currentTime >= audio.duration) {
      this.cleanTimer();
      this.resetAudio();
    } else {
      this.setState({
        handle: (current * width / duration) - handlerWidth / 2,
        buff: buff / duration,
        progress: current / duration,
      })
    }
  }
  startTimer() {
    const _pt = setInterval(() => {
      this.refreshAudio();
    }, 100)
    this.setState({
      _playTimer: _pt
    });
  }
  cleanTimer() {
    if (this.state._playTimer) {
      clearInterval(this.state._playTimer);
      this.setState({
        _playTimer: null,
      });
    }
  }
  playAudio() {
    if (this.state._buffered) {
      this.setState({ playMark: true });
      const audio = document.querySelector("#ADAM-audio");
      audio.play();
      this.cleanTimer();
      this.startTimer();
    }
  }
  pauseAudio() {
    if (this.state._buffered) {
      this.setState({ playMark: false });
      const audio = document.querySelector("#ADAM-audio");
      audio.pause();
    }
    this.cleanTimer();
  }

  mouseDown(e) {
    this.setState({
      _mouseMark: true,
    })
    if (!this.state._mouseMark) {
      this.cleanTimer();
    }
  }
  mouseMove(e) {
    if (this.state._mouseMark) {
      const leftArea = document.querySelector('.music-control').offsetLeft,
        width = document.querySelector('.music-control').offsetWidth,
        stuffWidth = document.querySelector('.music-buff-bar').offsetWidth,
        handlerWidth = document.querySelector('.music-handle-bar').offsetWidth;
      if (e.clientX <= leftArea + stuffWidth && e.clientX >= leftArea) {
        this.setState({
          progress: (e.clientX - leftArea) / width,
          handle: e.clientX - leftArea - handlerWidth / 2,
        });
      }
    }
  }
  mouseUp(e) {
    this.setState({
      _mouseMark: false,
    })
    if (this.state._mouseMark) {
      const audio = document.querySelector("#ADAM-audio");
      audio.currentTime = this.state.progress * audio.duration;
      this.startTimer();
    }
  }

  prevClick() {
    this.cleanTimer();
    this.resetAudio();
    let idx = this.state.currentId - 1;
    if (this.state.currentId === 0) {
      idx = this.state.songs.length - 1;
    }
    this.setState({
      currentId: idx,
    }, () => {
      Store.emit('selectedSong', this.state.currentId);
    })
  }

  nextClick() {
    this.cleanTimer();
    this.resetAudio();
    let idx = this.state.currentId + 1;
    if (this.state.currentId === this.state.songs.length - 1) {
      idx = 0;
    }
    this.setState({
      currentId: idx,
    }, () => {
      Store.emit('selectedSong', this.state.currentId);
    })
  }

  render() {
    return (
      <div id="CPT-body-music">
        <audio id="ADAM-audio"></audio>
        <div className="music-info" style={{ backgroundImage: this.state.song && this.state.song.songPoster ? `url(${this.state.song.songPoster})` : '' }}>
          {this.props.thumb > 0 ?
            <div className="music-mask"></div>
            : <div className="music-summary">
              {this.state.song && this.state.song.songName ? <p>{this.state.song.songName} - {this.state.song.singerName || '未知歌手'}</p> : null}
              {this.state.song && this.state.song.songThumb ? <p> {'< ' + this.state.song.songThumb + ' >'}</p> : null}
            </div>}
          <div className={["music-lyric", this.state.thumb > 0 ? "" : "hide"].join(' ')}>
            {
              this.state._buffered ?
                (this.state.song && this.state.song.lyric ?
                  <p>歌词 ...</p>
                  : <p style={{ lineHeight: '200px' }}>暂无歌词信息 ...</p>
                )
                : <p style={{ lineHeight: '200px' }}>正在加载歌词 ...</p>
            }
          </div>
        </div>
        <div className="music-control">
          <div className="music-buff-bar transition-all" style={{ width: (this.state.buff * 100) + '%' }}></div>
          {this.state.buff > 0 ?
            <div className="music-progress-bar" style={{ width: (this.state.progress * 100) + '%' }}></div>
            : null}
          {this.state.buff > 0 ?
            <div className="music-handle-bar"
              onTouchStart={(e) => { this.mouseDown(e); }} onTouchMove={(e) => { this.mouseMove(e); }} onTouchEnd={(e) => { this.mouseUp(e); }}
              onMouseDown={(e) => { this.mouseDown(e); }} onMouseMove={(e) => { this.mouseMove(e); }} onMouseUp={(e) => { this.mouseUp(e); }} onMouseLeave={(e) => { this.mouseUp(e); }}
              style={{ left: this.state.handle + 'px' }}></div>
            : null}
          <div className="music-control-bar">
            <div className="music-control-btn music-control-prev transition-all" onClick={() => { this.prevClick() }}>
              <p className="glyphicon glyphicon-step-backward"></p>
            </div>
            <div className="music-control-btn music-control-play transition-all" onClick={() => {
              if (this.state.playMark) {
                this.pauseAudio();
              } else {
                this.playAudio();
              }
            }}>
              <p className={["glyphicon", this.state._buffered ? (this.state.playMark ? "glyphicon-pause" : "glyphicon-play") : 'glyphicon-repeat rotate'].join(' ')}></p>
            </div>
            <div className="music-control-btn music-control-next transition-all" onClick={() => { this.nextClick() }}>
              <p className="glyphicon glyphicon-step-forward"></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}