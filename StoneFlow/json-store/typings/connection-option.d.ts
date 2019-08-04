/**
 * connection options for connect or initial
 *
 * @export
 * @interface ConnectionOption
 */
export interface ConnectionOption {
  protocol?: string,     // connect url protocol
  host?: string,         // connect url host address
  path?: string,         // connect url path
  port?: string,         // connect url port
  user?: string,         // connect db auth user name
  pwd?: string,          // connect db auth user password
  db?: string,           // connect db name
  tb?: string,           // connect tb name
}