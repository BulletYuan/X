import { log } from 'util';

/**
 * 检测字符串是否为邮箱
 *
 * @param {string} mail 传入需要检测的邮箱地址字符串
 * @returns {boolean} true|false
 */
const isMail = (mail: string): boolean => {
    if (mail) {
        const reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        return reg.test(mail);
    }
    return false;
};

/**
 * 检测字符串是否为手机号
 *
 * @param {string} phone 传入需要检测的手机号字符串
 * @returns {boolean} true|false
 */
const isPhone = (phone: string): boolean => {
    if (phone) {
        const reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        return reg.test(phone);
    }
    return false;
};

export { isMail, isPhone };