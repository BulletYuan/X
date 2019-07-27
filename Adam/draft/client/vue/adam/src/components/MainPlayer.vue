<template>
  <div>
    <div id="playerCon">
      <div id="topBar" class="flex-con flex-con-between align-items-center">
        <div class="btn" @click="showListSide">
          <icon :icon="['fas','list']"/>
        </div>
        <p>
          <span>A</span>dam.
        </p>
        <div class="btn" @click="showKindSide">
          <icon :icon="['fas','th-large']"/>
        </div>
      </div>
      <div class="body flex-con flex-con-center align-items-center" :style="heightStyle">
        <div class="main">
          <audio id="audio"/>
          <div class="content playerCon">
            <div
              class="thumbCover"
              :style="{'background-image':'url('+[[playList[playingIndex].songPoster]]+')'}"
            >
              <div class="buffBar" :class="{playing:playing}"/>
              <div class="buffHandle" :class="{playing:playing}"/>
              <div class="playBtn" :class="{playing:playing}" @click.stop="playTap">
                <icon v-if="!loaded" class="loading" :icon="['fas','circle-notch']"/>
                <icon v-if="loaded&&playing" :icon="['fas','pause']"/>
                <icon
                  v-if="loaded&&!playing"
                  :icon="['fas','play']"
                  :style="{'margin-left':'18px'}"
                />
              </div>
            </div>
            <div class="singerCon">
              <!-- <div class="marqueeCon song"><p class=" marquee">another love</p></div>
              <div class="marqueeCon thumb"><p class=" marquee">another love</p></div>
              <div class="marqueeCon singer"><p class=" marquee">Tom Odell</p></div>-->
              <p class="song">{{playList[playingIndex].songName||""}}</p>
              <p class="thumb">&lt; {{playList[playingIndex].songThumb||""}} &gt;</p>
              <p class="singer">{{playList[playingIndex].singerName||""}}</p>
            </div>
          </div>
          <div class="musicSummary">{{playList[playingIndex].songSum||""}}</div>
        </div>
      </div>
    </div>
    <div :class="[showside>0?'active':'']" id="mask" @click="activePlayer"></div>
    <div :class="[showside===1?'active':'']" id="listCon">
      <ul>
        <li class="header flex-con flex-con-between align-items-center">
          <p>stay hungry,stay foolish.</p>
          <icon :icon="['fas','chevron-right']" @click="activePlayer"/>
        </li>
        <li
          v-for="(song,index) of playList"
          class="flex-con flex-con-between align-items-center"
          :key="index"
        >
          <div class="flex-con flex-con-start align-items-center">
            <div
              class="miniPoster"
              :style="{'background-image':'url('+[[playList[playingIndex].songPoster]]+')'}"
              :class="[index===playingIndex&&playing?'loading':'']"
            ></div>
            <p>{{song.songName}} - {{song.singerName}}</p>
          </div>
          <icon v-if="index===playingIndex&&playing" :icon="['fas','headphones']" class="active"/>
          <icon v-else :icon="['fas','play-circle']" @click="playTap"/>
        </li>
      </ul>
    </div>
    <div :class="[showside===2?'active':'']" id="kindCon"></div>
  </div>
</template>
<script>
let page = {
  delimiters: ["[[", "]]"],
  name: "MainPlayer",
  data() {
    return {
      playing: false,
      loaded: true,
      showside: 0,
      aud: null,
      _wd: null,
      curTime: 0,
      heightStyle: {
        height: "",
        "margin-top": ""
      },

      playingIndex: 0,
      playList: [
        {
          songId: 10001,
          songName: "Another Love",
          songUrl:
            "http://fs.w.kugou.com/201806071455/049ef13de403f881323880345b3c590e/G031/M07/19/13/_5MEAFWgIHuANPTXAGBawK8nlbI364.mp3",
          songPoster: "http://pic.kekenet.com/2018/0413/15121523606986.jpg",
          songThumb: "Songs from Another Love",
          songSum: "all my tears have been used up on another love.",
          singerId: 1001,
          singerName: "Tom Odell",
          kindId: "1,3"
        }
      ]
    };
  },
  mounted() {
    this.heightStyle["height"] = `${window.screen.height -
      document.querySelector("#topBar").clientHeight}px`;
    this.heightStyle["margin-top"] = `${
      document.querySelector("#topBar").clientHeight
    }px`;
    this.aud = document.getElementById("audio");
    // console.log(window.screen.height,document.querySelector("#topBar").clientHeight,this.heightStyle)
  },
  methods: {
    activePlayer: function(e) {
      console.log(e);
      this.showside = 0;
    },
    showListSide: function(e) {
      console.log(e);
      this.showside = 1;
    },
    showKindSide: function(e) {
      console.log(e);
      this.showside = 2;
    },
    playTap: function(e) {
      // if(this.loaded) this.playing=!this.playing;
      this.showside = 0;
      this.initPlayer();
    },
    initPlayer: function() {
      if (this.playing) {
        this._pauseAudio();
      } else {
        this._playAudio(this.playList[this.playingIndex]["songUrl"]);
      }
    },
    _playAudio: function(src) {
      console.log(src);
      this.loaded = false;
      this.playing = false;
      if (!src) return false;
      if (this._wd) clearInterval(this._wd);
      this._wd = null;
      // this.aud.pause();
      setTimeout(() => {
        this.aud.src = src;
        this.aud.play();
        this.aud.currentTime = this.curTime;
        this._refreshState();
      }, 0);
    },
    _refreshState: function() {
      let aud = this.aud;
      let bW, bhL;
      this._wd = setInterval(() => {
        if (aud.buffered.length > 0) {
          this.loaded = true;
          this.playing = true;
          if (aud.ended) {
            this.curTime = 0;
            this.playingIndex += 1;
            if (this.playingIndex === this.playList.length)
              this.playingIndex = 0;
            document.querySelector(".buffBar").style.width = "0px";
            document.querySelector(".buffHandle").style.left = "0px";
            this._playAudio(this.playList[this.playingIndex]["songUrl"]);
          } else {
            // bW=aud.buffered.end(0)/aud.duration;
            this.curTime = aud.currentTime;
            bW = aud.currentTime / aud.duration;
            bW = bW * (document.querySelector(".thumbCover").clientWidth - 7.5);
            bhL = bW;
            document.querySelector(".buffBar").style.width = bW + "px";
            document.querySelector(".buffHandle").style.left = bhL + "px";
          }
        } else {
          this.loaded = false;
          this.playing = false;
          // if(this._wd) clearInterval(this._wd);
          // this._wd=null;
          this.curTime = 0;
        }
      }, 500);
    },
    _pauseAudio: function() {
      if (this.aud) {
        if (this._wd) clearInterval(this._wd);
        this._wd = null;
        this.aud.pause();
        this.playing = false;
        this.aud.src = "";
      }
    }
  }
};

export default page;
</script>
<style lang="less" scoped>
@import "../common/style/index.less";
body {
  background-color: #fafafa;
}

.loading {
  -webkit-animation: rotateImg 2s linear infinite;
}

@keyframes rotateImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotateImg {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

#listCon {
  width: 85%;
  height: 100%;
  position: fixed;
  left: -90%;
  top: 0;
  background-color: #fff;
  z-index: 13;
  .transition-all;
  &.active {
    left: 0;
    box-shadow: 1px 0 12px rgba(115, 29, 169, 0.23);
  }
  & ul {
    width: 100%;
    & li {
      padding: 15px 10px;
      border-bottom: 1px #863b80 dotted;
      color: #444;
      font-size: 14px;
      white-space: nowrap;
      & .miniPoster {
        width: 30px;
        height: 30px;
        border-radius: 50px;
        box-shadow: 0 0 3px rgba(115, 29, 169, 0.63);
        margin-right: 10px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-color: rgba(122, 29, 169, 0.15);
      }
      & svg {
        width: 20px;
        height: 20px;
        color: #6a0f8e;
      }
      & svg.active {
        color: #b600ff;
      }
      &.header {
        font-size: 16px;
        white-space: normal;
        font-style: italic;
        font-weight: bold;
        border-bottom-style: solid;
        & svg {
          width: 20px;
          height: 20px;
          color: #444;
        }
      }
    }
  }
}
#kindCon {
  width: 45%;
  height: 100%;
  position: fixed;
  right: -48%;
  top: 0;
  background-color: #fff;
  z-index: 13;
  .transition-all;
  &.active {
    right: 0;
    box-shadow: -1px 0 12px rgba(115, 29, 169, 0.23);
  }
}
#mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.43);
  z-index: 12;
  opacity: 0;
  display: none;
  &.active {
    opacity: 1;
    display: block;
  }
}
#playerCon {
  position: relative;
  #topBar {
    width: 100%;
    background: #fff;
    box-shadow: 0 1px 10px rgba(147, 29, 169, 0.15); //#931da9
    font-size: 16px;
    color: #444;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    & p {
      color: #000;
      font-weight: bold;
      & span {
        padding: 3px 10px;
        border-radius: 5px;
        margin-right: 5px;
        background-color: #931da9;
        color: #fff;
        font-weight: normal;
      }
    }
    .btn {
      padding: 10px;
      & svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .body {
    width: 100%;
    height: 100%;
    .main {
      width: 100%;
    }
    #audio {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .musicSummary {
      width: 70%;
      margin: 30px auto 0 auto;
      text-align: center;
      font-size: 14px;
      color: rgba(172, 70, 204, 0.33);
    }
    .content {
      width: 85%;
      margin: 0 auto;
      &.playerCon {
        height: 320px;
        border-radius: 10px;
        box-shadow: 0 1px 12px rgba(115, 29, 169, 0.23);
        & .thumbCover {
          width: 100%;
          height: 200px;
          position: relative;
          border-radius: 10px 10px 0 0;
          background-position: center top;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: rgba(122, 29, 169, 0.15);
          & .buffBar {
            width: 0%;
            height: 3px;
            background-color: #e040d4;
            position: absolute;
            left: 0;
            bottom: 0;
          }
          & .buffHandle {
            width: 0;
            height: 0;
            border-radius: 60px;
            line-height: 15px;
            background-color: #fafafa;
            position: absolute;
            left: 0;
            bottom: -1.5px;
            box-shadow: 0 0 10px rgba(115, 29, 169, 0.43);
            .transition-all;
          }
          & .buffHandle.playing {
            width: 15px;
            height: 15px;
            bottom: -6px;
          }
          & .playBtn {
            width: 60px;
            height: 60px;
            border-radius: 60px;
            line-height: 60px;
            text-align: center;
            color: #931da9;
            background-color: #fafafa;
            position: absolute;
            margin-left: -30px;
            left: 50%;
            bottom: -15px;
            box-shadow: 0 0 10px rgba(115, 29, 169, 0.43);
            .transition-all;
            & svg {
              width: 30px;
              height: 30px;
              margin: 15px;
            }
          }
          & .playBtn.playing {
            bottom: 50%;
            margin-bottom: -30px;
          }
        }
        & .singerCon {
          width: 100%;
          height: 120px;
          border-radius: 0 0 10px 10px;
          text-align: center;
          & .marqueeCon {
            text-align: center;
          }
          & p {
            width: 100%;
            text-align: center;
          }
          & .song {
            font-size: 16px;
            color: #333;
            padding-top: 35px;
            padding-bottom: 5px;
          }
          & .thumb {
            font-size: 12px;
            color: #888;
            padding-bottom: 10px;
          }
          & .singer {
            font-size: 14px;
            color: #666;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>


