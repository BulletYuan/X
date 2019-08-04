/**
 * delete query params
 *
 * @export
 * @interface DeleteQuery
 */
export interface DeleteQuery {
  where?: any,      // filter datas
  keys: string[],   // delete keys of the data
}