<template>
  <div class="scene">
    <p class="row">多大了? : {{SCENE.life}}</p>
    <p class="row">饿不饿? : {{Utils.displayNumber(SCENE.satiety)}}</p>
    <p class="row">开心不? : {{Utils.displayNumber(SCENE.emotion)}}</p>
    <p class="row">干净不? : {{Utils.displayNumber(SCENE.health)}}</p>
    <div class="row">
      用什么撸它? &nbsp;
      <select v-model="SCENE.played">
        <option v-for="(pi, index) of playedList" :key="pi.id" :value="index">{{pi.value}}</option>
      </select>
    </div>
    <div class="row">
      给它吃什么? &nbsp;
      <select v-model="SCENE.feed">
        <option v-for="(fi, index) of feedList" :key="fi.id" :value="index">{{fi.value}}</option>
      </select>
    </div>
    <div class="row">
      <button @click="feed()">给饭</button>
      <button @click="play()">撸它</button>
      <button @click="clean()">铲屎</button>
    </div>

    <div v-if="ICU" class="row icu">
      <p>ICU警告!</p>
      <p>{{icuContent}}</p>
    </div>
    <div v-if="DIE" class="row death">
      <p>讣告!</p>
      <p>{{deathContent}}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Demo extends Vue {
  // @Prop() private msg!: string;

  private RENDER_INTV = 166.666;
  private RENDER_MARK = false;
  private RENDER_TIMER = undefined;

  private ICU = false;
  private DIE = false;

  private icuContent = "";
  private deathContent = "";

  public Utils = {
    displayNumber(num) {
      return Number(num).toFixed(3);
    }
  };
  private SCENE = {
    life: 0,
    _params: [0, 0, 0],
    set satiety(v) {
      this._params[0] = v;
    },
    get satiety() {
      if (this._params.length !== 3) {
        return 0;
      }
      return this._params[0] <= 0 ? 0 : this._formatNumber(this._params[0]);
    },
    set emotion(v) {
      this._params[1] = v;
    },
    get emotion() {
      if (this._params.length !== 3) {
        return 0;
      }
      return this._params[1] <= 0 ? 0 : this._formatNumber(this._params[1]);
    },
    set health(v) {
      this._params[2] = v;
    },
    get health() {
      if (this._params.length !== 3) {
        return 0;
      }
      return this._params[2] <= 0 ? 0 : this._formatNumber(this._params[2]);
    },
    played: 0,
    feed: 0,
    accident: 0,
    maxAccident: 3,
    _formatNumber(num) {
      if (typeof num !== "number") {
        num = Number(num);
      }
      if (isNaN(num)) {
        num = 0;
      }
      return Number(num.toFixed(3));
    }
  };

  private playedList = [
    {
      id: 1,
      value: "吸管",
      satiety: -1,
      emotion: 1,
      health: -0.5,
    },
    { id: 2, value: "毛线团", satiety: -2, emotion: 1.2, health: -1 },
    { id: 3, value: "轮胎", satiety: -3, emotion: 1.4, health: -1.5 },
    { id: 4, value: "火柴", satiety: -1, emotion: 1.1, health: -0.5 }
  ];
  private feedList = [
    { id: 1, value: "球状小鱼干", satiety: 1, emotion: 0.5, health: -0.4 },
    { id: 2, value: "鱼形小鱼干", satiety: 1, emotion: 0.6, health: -0.3 },
    { id: 3, value: "袋装小鱼干", satiety: 2, emotion: 0.4, health: -0.2 },
    { id: 4, value: "方块状小鱼干", satiety: 2, emotion: 0.3, health: -0.2 }
  ];

  public mounted() {
    this.resetScene();
    this.start();
    this.paint();
  }
  public destroy() {
    this.pause();
    this.destroyTimer();
  }

  public resetScene() {
    const self = this;
    this.SCENE.life = 0;
    this.SCENE.played = 0;
    this.SCENE.feed = 0;
    this.SCENE._params = [
      Math.random() * 2 + 8,
      Math.random() * 5 + 5,
      Math.random() * 5 + 5
    ];
  }
  public destroyTimer() {
    if (this.RENDER_TIMER) {
      clearInterval(this.RENDER_TIMER);
      this.RENDER_TIMER = undefined;
    }
  }
  public start() {
    this.RENDER_MARK = true;
  }
  public pause() {
    this.RENDER_MARK = false;
  }
  public icu() {
    this.ICU = true;
    setTimeout(() => {
      this.cancelIcu();
    }, 5000);
  }
  public cancelIcu() {
    this.ICU = false;
  }
  public death() {
    this.cancelIcu();
    this.pause();
    this.DIE = true;
  }
  public cancelDeath() {
    this.start();
    this.DIE = false;
  }
  /**
   * base : base value to radom, default 1
   * sign : is random for sign, default true
   */
  public defaultDelta(base = 1, sign = true) {
    const _sign = Math.random() > 0.5 ? 1 : -1;
    const _delta = Math.random() * base;
    return _delta * (sign ? _sign : 1);
  }

  public play() {
    if (this.RENDER_MARK) {
      const item = this.playedList[this.SCENE.played];
      this.SCENE.satiety += item.satiety || this.defaultDelta();
      this.SCENE.emotion += item.emotion || this.defaultDelta();
      this.SCENE.health += item.health || this.defaultDelta(0.5);
    }
    this.checking();
  }
  public feed() {
    if (this.RENDER_MARK) {
      const item = this.feedList[this.SCENE.feed];
      this.SCENE.satiety += item.satiety || this.defaultDelta();
      this.SCENE.emotion += item.emotion || this.defaultDelta();
      this.SCENE.health += item.health || this.defaultDelta(0.5);
    }
    this.checking();
  }
  public clean() {
    if (this.RENDER_MARK) {
      this.SCENE.satiety += this.defaultDelta(0.5);
      this.SCENE.emotion += this.defaultDelta(0.5);
      this.SCENE.health += this.defaultDelta(1, false);
    }
    this.checking();
  }

  public checking() {
    if (
      Math.ceil(this.SCENE.satiety) <= 3 ||
      Math.ceil(this.SCENE.emotion) <= 3 ||
      Math.ceil(this.SCENE.health) <= 3
    ) {
      this.icu();
    } else {
      this.cancelIcu();
    }
    if (
      this.SCENE.satiety <= 0 ||
      this.SCENE.emotion <= 0 ||
      this.SCENE.health <= 0
    ) {
      this.death();
    } else {
      this.cancelDeath();
    }
  }
  public living() {
    this.SCENE.life += 1;
    this.SCENE.satiety += this.defaultDelta(1, false) * -1;
    this.SCENE.emotion += this.defaultDelta(1, false) * -1;
    this.SCENE.health += this.defaultDelta(1, false) * -1;
    this.checking();
  }
  public paint() {
    let cycleTime = 1;
    this.RENDER_TIMER = setInterval(() => {
      if (this.RENDER_MARK) {
        // TODO: do what this scene need to do
        if (cycleTime === 26) {
          cycleTime = 1;
          // TODO: do what per cycle need to do
          this.living();
        }
        cycleTime += 1;
      }
    }, this.RENDER_INTV);
  }
}
</script>
<style lang="scss" scoped>
.scene {
  padding: 0 10px;
  text-align: left;
  .row {
    margin-top: 10px;
    &.icu {
      color: rgb(204, 82, 0);
      margin-top: 20px;
    }
    &.death {
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      margin-top: 50px;
    }
  }
  button {
    margin-right: 10px;
    padding: 5px 20px;
  }
}
</style>