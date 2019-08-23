
const obj2string = function (obj) {
    return Object.keys(obj).map(el => {
        return el + '=' + obj[el];
    }).join(';');
}
const string2obj = function (str, splitStr = ';') {
    const obj = {};
    str.split(splitStr).forEach(el => {
        if (el.indexOf('=') >= 0) {
            const k = el.split('=')[0].toString().trim();
            const v = el.split('=')[1].toString().trim();
            obj[k] = v;
        }
    });
    return obj;
}

const getCookie = function (key = '') {
    if (typeof document === 'object' && document.cookie) {
        const _ck = string2obj(document.cookie);
        if (key) {
            return _ck[key];
        } else {
            return _ck;
        }
    }
    throw new Error('current env unsupport cookie!');
}
const setCookie = function (key, value = '') {
    if (typeof document === 'object' && document.cookie) {
        if (!key) { return false; }
        const _ck = string2obj(document.cookie);
        _ck[key] = value;
        document.cookie = obj2string(_ck);
        return true;
    }
    return false;
}

const getSession = function (key = '') {
    if (typeof sessionStorage === 'object' && sessionStorage) {
        const _ss = sessionStorage;
        if (key) {
            return JSON.parse(_ss.getItem(key));
        } else {
            return _ss;
        }
    }
    throw new Error('current env unsupport session!');
}
const setSession = function (key, value = '') {
    if (typeof sessionStorage === 'object' && sessionStorage) {
        if (!key) { return false; }
        sessionStorage.setItem(key, value);
        return true;
    }
    return false;
}

const getStorage = function (key = '') {
    if (typeof localStorage === 'object' && localStorage) {
        const _ls = localStorage;
        if (key) {
            return JSON.parse(_ls.getItem(key));
        } else {
            return _ls;
        }
    }
    throw new Error('current env unsupport session!');
}
const setStorage = function (key, value = '') {
    if (typeof localStorage === 'object' && localStorage) {
        if (!key) { return false; }
        localStorage.setItem(key, value);
        return true;
    }
    return false;
}

const getCache = function (type = 'cookie', key = '') {
    switch (type) {
        case 'cookie':
            return getCookie(key);
        case 'session':
            return getSession(key);
        case 'storage':
            return getStorage(key);
        default:
            return getCookie(key);
    }
}
const setCache = function (type = 'cookie', key = '', value = '') {
    switch (type) {
        case 'cookie':
            return setCookie(key, value);
        case 'session':
            return setSession(key, value);
        case 'storage':
            return setStorage(key, value);
        default:
            return setCookie(key, value);
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        getCookie,
        setCookie,

        getSession,
        setSession,

        getStorage,
        setStorage,

        getCache,
        setCache,
    };
}