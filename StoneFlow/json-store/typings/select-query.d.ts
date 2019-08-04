import { QueryOrder } from "./query";

/**
 * select query params
 *
 * @export
 * @interface SelectQuery
 */
export interface SelectQuery {
  where?: any,          // filter data
  limit?: number,       // limited results amount
  offset?: number,      // set start row of data
  sortKey?: string,     // sort key of data object
  order?: QueryOrder,   // order type, default is 'desc' : 'desc' | 'asc'
}