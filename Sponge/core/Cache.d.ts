export enum CacheType {
    cookie = 'cookie',
    session = 'session',
    storage = 'storage',
}

function obj2string(obj: object | any): string;
function string2obj(str: string, splitStr?: string): object | any;

function getCookie(key?: string): object | any;
function setCookie(key: string, value?: string): boolean;

function getSession(key?: string): object | any;
function setSession(key: string, value?: string): boolean;

function getStorage(key?: string): object | any;
function setStorage(key: string, value?: string): boolean;

function getCache(type?: CacheType, key?: string): object | any;
function setCache(type?: CacheType, key: string, value?: string): boolean;

export {
    getCookie,
    setCookie,

    getSession,
    setSession,

    getStorage,
    setStorage,

    getCache,
    setCache,
}