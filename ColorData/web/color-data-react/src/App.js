import React, { Component } from 'react';
import './App.css';
import ColorData from 'color-data';

class App extends Component {
  componentDidMount() {
    new ColorData({
      container: '#color-data',
      data: [
        {
          text: '1',
          width: 260,
          height: 100,
          children: [
            {
              text: '1-1',
              type: 2,
              width: 160,
              height: 80,
              children: [
                {
                  text: '1-1-1 长文本测试 12321321312314523524354322354325243543254325243532442342',
                  type: 3,
                  width: 260,
                  height: 100,
                },
                {
                  text: '1-1-2',
                  type: 2,
                  width: 160,
                  height: 60,
                },
                {
                  text: '1-1-3',
                  width: 160,
                  height: 80,
                  events: {
                    'click': function (ev) {
                      alert(1);
                      console.log(ev);
                    }
                  },
                  children: [
                    {
                      text: '1-1-3-1',
                      type: 3,
                      width: 260,
                      height: 100,
                    },
                    {
                      text: '1-1-3-2',
                      type: 2,
                      width: 160,
                      height: 100,
                    },
                  ],
                },
                {
                  text: '1-1-4',
                  type: 1,
                  width: 160,
                  height: 160,
                }
              ]
            }, {
              text: '1-2',
              type: 1,
              width: 160,
              height: 60,
            }
          ]
        },

        {
          text: '2',
          width: 260,
          height: 100,
        }
      ]
    });
  }
  render() {
    return (
      <div className="App">
        <div id="color-data" style={{ width: '100%', height: '800px' }}></div>
      </div>
    );
  }
}

export default App;
