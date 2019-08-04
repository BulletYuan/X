/**
 * update query params
 *
 * @export
 * @interface UpdateQuery
 */
export interface UpdateQuery {
  where?: any,      // filter data
  data: any,        // new data object
  limit?: number,   // limited affected data
}