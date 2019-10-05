<template>
  <div class="scene">
    <p class="row">多大了? : {{SCENE.life}}</p>
    <p class="row">饿不饿? : {{Utils.displayNumber(SCENE.satiety)}} (不能超过 10)</p>
    <p class="row">开心不? : {{Utils.displayNumber(SCENE.emotion)}}</p>
    <p class="row">干净不? : {{Utils.displayNumber(SCENE.health)}} (不能超过 10)</p>
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
    // records: [x,...] x = {life,satiety,emotion,health, action:a + ',' + b + ',' + c, time:timestamp}
    // -- a [play:1|feed:2|clean:3]
    // -- b [playItem/feedItem:item.id|clean:0]
    // -- c if last time was simply 'a' value is 1, else is 0.
    records: [],
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

  private AccidentRandom(type = 0) {
    const _types = ["管状", "球状", "块状", "圆状", "棍状", "袋形", "小鱼"];
    const _acc_type = _types[type];
    const _actions = ["误食", "追逐"];
    const _acc_action = Math.floor(Math.random() * _actions.length - 1);
    const _things = ["塑料", "金属", "玻璃", "带电", "未知"];
    const _acc_thing = Math.floor(Math.random() * _things.length - 1);
    const _deads = [
      [
        "莫名中毒",
        "卡住呼吸管",
        "边缘划破内脏",
        "无法消化排泄",
        "堵住屁眼",
        "未知原因"
      ],
      [
        "踩到裸露电线上",
        "表面毒素渗入皮肤伤口而中毒",
        "过于兴奋心肌劳损",
        "不小心跌落屋檐",
        "穿过马路时来往车辆撞飞",
        "惹怒邻居将其甩飞",
        "未知原因"
      ]
    ];
    const _acc_dead = Math.floor(
      Math.random() * _deads[_acc_action].length - 1
    );
    const str =
      "喵喵" +
      _actions[_acc_action] +
      _things[_acc_thing] +
      _acc_type +
      "物体,致使" +
      _deads[_acc_action][_acc_dead] +
      ",而导致死亡...";
    return str;
  }
  private AccidentsRecords = [];
  private Accident = {
    Pipe: {
      id: 1,
      maxCount: 10,
      count: 0,
      content: () => {
        const len = this.AccidentsRecords.length;
        if (len > 0) {
          for (let i = len - 1; i >= 0; i--) {
            const item = this.AccidentsRecords[i];
            if (item !== this.Accident.Pipe.id) {
              this.Accident.Pipe.count = 0;
              this.AccidentsRecords.length = 0;
              this.AccidentsRecords.push(this.Accident.Pipe.id);
              break;
            } else {
              this.Accident.Pipe.count += 1;
            }
          }
        } else {
          this.AccidentsRecords.push(this.Accident.Pipe.id);
        }
        if (
          this.Accident.Pipe.count >=
          this.Accident.Pipe.maxCount + Math.ceil(Math.random() * 10)
        ) {
          this.Accident.Pipe.count = 0;
          const str = this.AccidentRandom(this.Accident.Pipe.id - 1);
          return str;
        }
        return "";
      }
    },
    Ball: {
      id: 2,
      maxCount: 14,
      count: 0,
      content: () => {
        const len = this.AccidentsRecords.length;
        for (let i = len - 1; i >= 0; i--) {
          const item = this.AccidentsRecords[i];
          if (item !== this.Accident.Ball.id) {
            this.Accident.Ball.count = 0;
            this.AccidentsRecords.length = 0;
            this.AccidentsRecords.push(this.Accident.Ball.id);
            break;
          } else {
            this.Accident.Ball.count += 1;
          }
        }
        if (
          this.Accident.Ball.count >=
          this.Accident.Ball.maxCount + Math.ceil(Math.random() * 10)
        ) {
          this.Accident.Ball.count = 0;
          const str = this.AccidentRandom(this.Accident.Ball.id - 1);
          return str;
        }
        return "";
      }
    },
    Square: {
      id: 3,
      maxCount: 20,
      count: 0,
      content: () => {
        const len = this.AccidentsRecords.length;
        for (let i = len - 1; i >= 0; i--) {
          const item = this.AccidentsRecords[i];
          if (item !== this.Accident.Square.id) {
            this.Accident.Square.count = 0;
            this.AccidentsRecords.length = 0;
            this.AccidentsRecords.push(this.Accident.Square.id);
            break;
          } else {
            this.Accident.Square.count += 1;
          }
        }
        if (
          this.Accident.Square.count >=
          this.Accident.Square.maxCount + Math.ceil(Math.random() * 10)
        ) {
          this.Accident.Square.count = 0;
          const str = this.AccidentRandom(this.Accident.Square.id - 1);
          return str;
        }
        return "";
      }
    },
    Circle: {
      id: 4,
      maxCount: 10,
      count: 0,
      content: () => {
        const len = this.AccidentsRecords.length;
        for (let i = len - 1; i >= 0; i--) {
          const item = this.AccidentsRecords[i];
          if (item !== this.Accident.Circle.id) {
            this.Accident.Circle.count = 0;
            this.AccidentsRecords.length = 0;
            this.AccidentsRecords.push(this.Accident.Circle.id);
            break;
          } else {
            this.Accident.Circle.count += 1;
          }
        }
        if (
          this.Accident.Circle.count >=
          this.Accident.Circle.maxCount + Math.ceil(Math.random() * 10)
        ) {
          this.Accident.Circle.count = 0;
          const str = this.AccidentRandom(this.Accident.Circle.id - 1);
          return str;
        }
        return "";
      }
    },
    Stick: {
      id: 5,
      maxCount: 12,
      count: 0,
      content: () => {
        const len = this.AccidentsRecords.length;
        for (let i = len - 1; i >= 0; i--) {
          const item = this.AccidentsRecords[i];
          if (item !== this.Accident.Stick.id) {
            this.Accident.Stick.count = 0;
            this.AccidentsRecords.length = 0;
            this.AccidentsRecords.push(this.Accident.Stick.id);
            break;
          } else {
            this.Accident.Stick.count += 1;
          }
        }
        if (
          this.Accident.Stick.count >=
          this.Accident.Stick.maxCount + Math.ceil(Math.random() * 10)
        ) {
          this.Accident.Stick.count = 0;
          const str = this.AccidentRandom(this.Accident.Stick.id - 1);
          return str;
        }
        return "";
      }
    },
    Packet: {
      id: 6,
      maxCount: 20,
      count: 0,
      content: () => {
        const len = this.AccidentsRecords.length;
        for (let i = len - 1; i >= 0; i--) {
          const item = this.AccidentsRecords[i];
          if (item !== this.Accident.Packet.id) {
            this.Accident.Packet.count = 0;
            this.AccidentsRecords.length = 0;
            this.AccidentsRecords.push(this.Accident.Packet.id);
            break;
          } else {
            this.Accident.Packet.count += 1;
          }
        }
        if (
          this.Accident.Packet.count >=
          this.Accident.Packet.maxCount + Math.ceil(Math.random() * 10)
        ) {
          this.Accident.Packet.count = 0;
          const str = this.AccidentRandom(this.Accident.Packet.id - 1);
          return str;
        }
        return "";
      }
    },
    Fish: {
      id: 7,
      maxCount: 30,
      count: 0,
      content: () => {
        const len = this.AccidentsRecords.length;
        for (let i = len - 1; i >= 0; i--) {
          const item = this.AccidentsRecords[i];
          if (item !== this.Accident.Fish.id) {
            this.Accident.Fish.count = 0;
            this.AccidentsRecords.length = 0;
            this.AccidentsRecords.push(this.Accident.Fish.id);
            break;
          } else {
            this.Accident.Fish.count += 1;
          }
        }
        if (
          this.Accident.Fish.count >=
          this.Accident.Fish.maxCount + Math.ceil(Math.random() * 10)
        ) {
          this.Accident.Fish.count = 0;
          const str = this.AccidentRandom(this.Accident.Fish.id - 1);
          return str;
        }
        return "";
      }
    }
  };

  private playedList = [
    {
      id: 1,
      value: "吸管",
      satiety: -1,
      emotion: 1,
      health: -0.5,
      parent: this.Accident.Pipe
    },
    {
      id: 2,
      value: "毛线团",
      satiety: -2,
      emotion: 1.2,
      health: -1,
      parent: this.Accident.Ball
    },
    {
      id: 3,
      value: "轮胎",
      satiety: -3,
      emotion: 1.4,
      health: -1.5,
      parent: this.Accident.Circle
    },
    {
      id: 4,
      value: "火柴",
      satiety: -1,
      emotion: 1.1,
      health: -0.5,
      parent: this.Accident.Stick
    }
  ];
  private feedList = [
    {
      id: 1,
      value: "球状小鱼干",
      satiety: 1,
      emotion: 0.5,
      health: -0.4,
      parent: this.Accident.Ball
    },
    {
      id: 2,
      value: "鱼形小鱼干",
      satiety: 1,
      emotion: 0.6,
      health: -0.3,
      parent: this.Accident.Fish
    },
    {
      id: 3,
      value: "袋装小鱼干",
      satiety: 2,
      emotion: 0.4,
      health: -0.2,
      parent: this.Accident.Packet
    },
    {
      id: 4,
      value: "方块小鱼干",
      satiety: 2,
      emotion: 0.3,
      health: -0.2,
      parent: this.Accident.Square
    }
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
    let str = "";
    const min = Math.min(
      this.SCENE.satiety,
      this.SCENE.emotion,
      this.SCENE.health
    );
    if (this.SCENE.satiety === min) {
      str = "喵喵快被饿死了!";
    }
    if (this.SCENE.emotion === min) {
      str = "喵喵也有感情啊, 也会抑郁!";
    }
    if (this.SCENE.health === min) {
      str = "喵喵太久不清理, 很容易猫瘟!";
    }
    this.icuContent = str;
    setTimeout(() => {
      this.cancelIcu();
    }, 5000);
  }
  public cancelIcu() {
    this.ICU = false;
    this.icuContent = "";
  }
  public death() {
    this.cancelIcu();
    this.pause();
    this.DIE = true;
    let str = "";
    if (this.SCENE.satiety * this.SCENE.emotion * this.SCENE.health === 0) {
      if (this.SCENE.satiety <= 0) {
        str = "喵喵活活饿死...";
      }
      if (this.SCENE.emotion <= 0) {
        str = "喵喵郁郁寡欢, 从高处跳下去摔死了...";
      }
      if (this.SCENE.health <= 0) {
        str = "喵喵太久没有清扫, 染了猫瘟一命呜呼...";
      }
    } else if (this.SCENE.satiety > 10) {
      str = "喵喵活活撑死...";
    } else if (this.SCENE.health > 10) {
      str = "喵喵太干净失去免疫力, 染了猫瘟一命呜呼...";
    }
    this.deathContent = str;
  }
  public cancelDeath() {
    this.start();
    this.DIE = false;
    this.deathContent = "";
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
      const content = item.parent.content();
      if (content.length > 0) {
        this.death();
        this.deathContent = content;
      }
    }
    this.checking();
  }
  public feed() {
    if (this.RENDER_MARK) {
      const item = this.feedList[this.SCENE.feed];
      this.SCENE.satiety += item.satiety || this.defaultDelta();
      this.SCENE.emotion += item.emotion || this.defaultDelta();
      this.SCENE.health += item.health || this.defaultDelta(0.5);
      const content = item.parent.content();
      if (content.length > 0) {
        this.death();
        this.deathContent = content;
      }
    }
    this.checking();
  }
  public clean() {
    if (this.RENDER_MARK) {
      this.SCENE.satiety += this.defaultDelta(0.7, false) * -1;
      this.SCENE.emotion += this.defaultDelta(0.5, false);
      this.SCENE.health += this.defaultDelta(1, false);
    }
    this.checking();
  }

  public checking() {
    if (
      Math.ceil(this.SCENE.satiety) <= 4 ||
      Math.ceil(this.SCENE.emotion) <= 4 ||
      Math.ceil(this.SCENE.health) <= 4
    ) {
      this.icu();
    } else {
      this.cancelIcu();
    }
    if (
      this.SCENE.satiety <= 0 ||
      this.SCENE.satiety > 10 ||
      this.SCENE.emotion <= 0 ||
      this.SCENE.health <= 0 ||
      this.SCENE.health > 10
    ) {
      this.death();
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
        if (cycleTime === 20) {
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