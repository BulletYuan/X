/**
 * the role config of the db
 *  // 0 just self
    // 1 target users
    // 2 target groups
    // 3 all groups
    // 4 all users
 *
 * @export
 * @interface DBRole
 */
export interface DBRole {
  write?: number,
  read?: number,
  change?: number,
}

/**
 * the auth users config of the db
 * check them with user&pwd of ConnectionOption
 *
 * @export
 * @interface DBAuth
 */
export interface DBAuth {
  user?: string,
  pwd?: string,
}

/**
 * need option when create db
 *
 * @export
 * @interface CreateDBOption
 */
export interface CreateDBOption {
  name?: string,    // db name
  role?: DBRole,    // db role
  auth?: DBAuth[],  // db auth
}