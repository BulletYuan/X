const server = {
    host: 'http://localhost:3000',
    // host: '',
};
const interfaceUrl = {
    login: {
        mail: '/login', // 邮箱登录
        cell: '/login/cellphone', // 手机号登录
        refresh: '/login/refresh', // 刷新登录状态
        status: '/login/status' // 获取登录状态
    },
    logout: '/logout', // 退出登录
};
const errorInfo = {
    netError: '网络出错，请稍后重试！'
};

export {
    server,
    interfaceUrl,
    errorInfo,
};
