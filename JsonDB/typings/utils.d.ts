import { QueryOrder } from "./query";
import { DBRole, DBAuth } from "./create-db";

/**
 * action item in db history array
 *
 * @export
 * @interface UtilHistoryAction
 */
export interface UtilHistoryAction {
  type?: number,          // [0 create|1 change|2 read|3 delete]
  db?: string,            // affected db name
  tb?: string,            // affected tb name
  row?: number,           // affected row number in tb
  _value?: any,           // changed value
  _timestamp?: number,    // changed timestamp (ms)
}

/**
 * the configuration at per db object
 *
 * @export
 * @interface UtilHistoryDatas
 */
export interface UtilHistoryDatas {
  _cfg?: {
    role?: DBRole,                      // db role
    auth?: DBAuth[],                    // db auth
    history?: {
      actions?: UtilHistoryAction[],    // db history actions
      lastest?: number,                 // db edited lastest timestamp (ms)
      created?: number,                 // db created timestamp (ms)
    },
  }
}

/**
 * file functions at util
 * 
 *  read,write,remove
 *
 * @export
 * @interface UtilFile
 */
export interface UtilFile {
  read: (
    path: string // file path
  ) => any | Error,                          // read file function 
  write: (
    path: string, // file path
    content: string // write content
  ) => boolean | Error,    // write file function 
  remove: (
    path: string // file path
  ) => boolean | Error,                    // remove file function 
}

/**
 * history functions at util
 *
 * @export
 * @interface UtilHistory
 */
export interface UtilHistory {
  _actionFn: (
    _t?: number,    // action type [0 create|1 change|2 read|3 delete]
    _db?: string,   // affected db name
    _tb?: string,   // affected tb name
    _row?: number,  // affected row number in tb
    _val?: any      // changed value
  ) => UtilHistoryAction | any,   // 
  create: (
    _db?: string,   // affected db name
    _tb?: string,   // affected tb name
    _row?: number,  // affected row number in tb
    _val?: any      // changed value
  ) => void,
  change: (
    _db?: string,   // affected db name
    _tb?: string,   // affected tb name
    _row?: number,  // affected row number in tb
    _val?: any      // changed value
  ) => void,
  read: (
    _db?: string,   // affected db name
    _tb?: string,   // affected tb name
    _row?: number,  // affected row number in tb
    _val?: any      // changed value
  ) => void,
  delete: (
    _db?: string,   // affected db name
    _tb?: string,   // affected tb name
    _row?: number,  // affected row number in tb
    _val?: any      // changed value
  ) => void,
  report: (
    _db?: string,   // input data object
    _type?: number, // action type [0 create|1 change|2 read|3 delete]
    _conn?: {
      db?: string,  // affected db name
      tb?: string   // affected tb name
    },
    _row?: number,  // affected row number in tb
    _val?: any      // changed value
  ) => UtilHistoryDatas | any,
}

/**
 * util funtions object
 *
 * @export
 * @interface UtilsObject
 */
export interface UtilsObject {
  sortFn: (
    _arr: any[],    // sortting array data
    _sk: string,    // sort key string of object in array
    _o: QueryOrder  // order type, default is 'desc' : 'desc' | 'asc'
  ) => any[],
  file: UtilFile,   // file controller
  history: UtilHistory,  // history controller
}