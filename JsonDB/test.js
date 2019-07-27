/**
 * 
 * db -- json file
 * 
 * tb -- json object
 * 
 * colum -- object prototype
 * 
 */
// import * as fs from 'fs';
// import { db } from './app.db';

const BulletJDB = require('./core');

const jdb = new BulletJDB({
  path: '.'
})
function timeout(_fn) {
  setTimeout(() => {
    _fn && _fn();
  }, 1000);
}
timeout(() => {
  const s1 = jdb.createDB({
    name: 'test'
  });
  console.log('createDB', s1);

  jdb.connect({
    path: '.',
    db: 'test'
  });

  timeout(() => {
    const s2 = jdb.createTB('test-table');
    console.log('createTB', s2);

    jdb.connect({
      path: '.',
      db: 'test',
      tb: 'test-table'
    });

    timeout(() => {
      const s4 = jdb.insert({
        datas: [
          { id: 1, a: 2, b: 3 },
          { a: 2, b: 3 },
          { a1: 2, c: 3 },
          { id: 1, a: 11, b: 3 },
          { a: 12, b: 3 },
          { a1: 2, c: 3 },
        ],
      });
      console.log('insert', s4);

      timeout(() => {
        const s5 = jdb.select({
          where: {
            b: 3
          },
          limit: 2,
          offset: 1,
          sortKey: 'a',
          order: 'desc',
        });
        console.log('select', s5);

        timeout(() => {
          const s6 = jdb.update({
            where: {
              id: 1, a: 11, b: 3
            },
            data: {
              c: "test update"
            }
          });
          console.log('update', s6);

          timeout(() => {
            const s7 = jdb.select({
              sortKey: 'b',
              order: 'desc',
            });
            console.log('select-all', s7);
          });

        });

        // timeout(() => {
        //   const s3 = jdb.deleteTB('test-table');
        //   console.log('deleteTB', s3);
        // });

      });

    });

  });

});