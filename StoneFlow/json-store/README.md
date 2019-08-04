# JsonDB - NoSQL

**the data-base based of json**

----

# BulletJDB 

```javascript
const jdb = new BulletJDB(conf={});
```

## .connection : any

```javascript
jdb.connection = { // default config params
  protocol: 'http', // url protocol
  host: '',         // url host
  path: '',         // url path
  port: '',         // url port
  user: '',         // connect user name
  pwd: '',          // connect user password
  db: '',           // connect db name
  tb: '',           // connect tb name
};
```

## .state : number

```javascript
jdb.state = 0; // 0 unconnect | 1 connected | 2 error | 3 timeout
```

## .path : string

```javascript
jdb.path = jdb.connection.path + '/' + jdb.connection.db + '.db.json';
```

## .connect(conn : any) : BulletJDB

```javascript
const conf = { // default config params
  protocol: 'http', // url protocol
  host: '',         // url host
  path: '',         // url path
  port: '',         // url port
  user: '',         // connect user name
  pwd: '',          // connect user password
  db: '',           // connect db name
  tb: '',           // connect tb name
};

jdb.connect(conf); // connect db | connect db -> tb
```

## .close() : boolean

```javascript
jdb.close(); // true | false
```

## .select(query : any) : object[]

```javascript
const select_query = { // default select query params
    where: {},         // filter object, if none filter return all datas
    limit: 50,         // result length
    offset: 0,         // offset index
    sortKey: '',       // sort by data key
    order: 'desc',     // order type 'desc' | 'asc' , by sort key's value
};

jdb.select(select_query);
```

## .insert(query : any) : boolean

```javascript
const insert_query = { // default insert query params
    datas: [],         // insert data array
};

jdb.insert(insert_query);
```

## .update(query : any) : object[]

```javascript
const update_query = { // default update query params
    where: {},         // filter object, if none filter return all datas
    data: {},          // update data
    limit: 1,          // update data amount
};

jdb.update(update_query);
```

## .delete(query : any) : boolean

```javascript
const delete_query = { // default delete query params
    where: {},         // filter object, if none filter return all datas
    keys: [],          // delete data key
};

jdb.delete(delete_query);
```

# db

`createDB` , `deleteDB`

```javascript
const db_conf={ // default config params
  name: '',       // create db name
  role: {
    // 0 just self
    // 1 target users
    // 2 target groups
    // 3 all groups
    // 4 all users
    write: 4,
    read: 4,
    change: 4,
  },
  auth: [
    /**
     * {
     *    user:'',
     *    pwd:''
     * }
    */
  ],
}
jdb.createDB(db_conf);

jdb.deleteDB(db_name); // delete db name
```

# tb

`createTB` , `deleteTB`

```javascript
jdb.createDB(tb_name); // create tb name

jdb.deleteDB(tb_name); // delete tb name
```
