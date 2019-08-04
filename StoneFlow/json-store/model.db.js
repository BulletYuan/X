const testDB = { // db
  "test-table": [ // tb
    { // tb - row
      id: "123", // col
      name: "fsd"
    }
  ],
  _cfg: {
    role: {
      write: 1,
      read: 4,
      change: 1,
    },
    auth: [
      {
        name: 'test',
        pwd: 'test'
      },
    ],
    history: {
      created: 1553478992322,
      lastest: 1553673202561,
      actions: [
        {
          type: 0,
          db: 'app',
          tb: 'test-table',
          row: -1,
          _value: null,
          _timestamp: 1553478992322,
        },
        {
          type: 1,
          db: 'app',
          tb: 'test-table',
          row: 0,
          _value: {
            id: "123", // col
            name: "fsd"
          },
          _timestamp: 1553489992322,
        },
      ],
    }
  }
};
const db = {
  testDB,
  _cfg: {
    role: {
      write: 4,
      read: 4,
      change: 4,
    },
    auth: [],
    history: {
      created: 1553478992322,
      lastest: 1553673202561,
      actions: [],
    }
  }
}

export {
  db,
}