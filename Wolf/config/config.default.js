/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security: {
      xframe: {
        enable: false,
      },
      csrf: {
        queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
        bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567843255178_8886';

  // add your middleware config here
  config.middleware = [];

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: 3306,
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'db.wolf',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  //mongo
  config.mongo = {
    client: {
      host: "127.0.0.1",
      port: "27017",
      name: "wolf",
      user: "",
      password: "",
      options: {},
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
