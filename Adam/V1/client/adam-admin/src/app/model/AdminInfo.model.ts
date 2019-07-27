/**
 * AdminInfo数据模型
 *
 * @export
 * @class AdminInfo
 * @param {number} id 管理员账户ID
 * @param {string} adminAuth 管理员登录名
 * @param {string} adminName 管理员名称
 * @param {string} adminToken 管理员周期密钥
 * @param {number} adminRole 管理员权限
 * @param {number} adminAvatar 管理员头像
 * @param {number} adminState 管理员登录状态
 */
export class AdminInfo {
    id: number;
    adminAuth: string;
    adminName: string;
    adminToken: string;
    adminRole: number;
    adminAvatar: string;
    adminState: number;
}
