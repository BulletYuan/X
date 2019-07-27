import { AdminInfo } from '../model/AdminInfo.model';

const adminInfo: AdminInfo = {
    id: 0,
    adminAuth: '',
    adminName: '',
    adminRole: -1,
    adminState: -1, // 管理员登录状态 0 未登录 1 已登录
    adminAvatar: '',
    adminToken: ''
};

export {
    adminInfo
};
