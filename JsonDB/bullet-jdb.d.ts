import { ConnectionOption } from "./typings/connection-option";
import { CreateDBOption } from "./typings/create-db";

import { SelectQuery } from "./typings/select-query";
import { InsertQuery } from "./typings/insert-query";
import { UpdateQuery } from "./typings/update-query";
import { DeleteQuery } from "./typings/delete-query";

import { UtilsObject } from "./typings/utils";

export declare type ConnectionState = 0 | 1 | 2 | 3; // 0 unconnect | 1 connected | 2 error | 3 timeout

/**
 * main class type
 *
 * @export
 * @class JSONDataBase
 */
export declare class JSONDataBase {
  /**
   * Creates an instance of BulletJDB.
   * @param {ConnectionOption} [connectionOption]
   * @memberof BulletJDB
   */
  constructor(connectionOption?: ConnectionOption);

  connection: ConnectionOption;   // connection option
  state: ConnectionState;         // connection state
  path: string;                   // db file path

  private utils: UtilsObject;     // private util functions object

  /**
   * connect db or connect the tb at db
   *
   * @param {ConnectionOption} connectionOption
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  connect(connectionOption: ConnectionOption): boolean | Error;
  /**
   * close the connect and change the state+connection
   *
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  close(): boolean | Error;

  /**
   * create db file
   *
   * @param {CreateDBOption} dbOption
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  createDB(dbOption: CreateDBOption): boolean | Error;
  /**
   * remove db file
   *
   * @param {string} dbName
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  deleteDB(dbName: string): boolean | Error;

  /**
   * create tb object at the db that connected
   *
   * @param {string} tbName
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  createTB(tbName: string): boolean | Error;
  /**
   * remove tb object at the tb that connected
   *
   * @param {string} tbName
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  deleteTB(tbName: string): boolean | Error;

  /**
   * select data by the select query params
   *
   * @param {SelectQuery} query
   * @returns {(any[] | Error)}
   * @memberof BulletJDB
   */
  select(query: SelectQuery): any[] | Error;
  /**
   * insert data by the insert query params
   *
   * @param {InsertQuery} query
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  insert(query: InsertQuery): boolean | Error;
  /**
   * update data by the update query params
   *
   * @param {UpdateQuery} query
   * @returns {(any[] | Error)}
   * @memberof BulletJDB
   */
  update(query: UpdateQuery): any[] | Error;
  /**
   * delete data by the delete query params
   *
   * @param {DeleteQuery} query
   * @returns {(boolean | Error)}
   * @memberof BulletJDB
   */
  delete(query: DeleteQuery): boolean | Error;
}