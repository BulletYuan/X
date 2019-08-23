
function obj2string(obj: object | any): string;
function string2obj(str: string, splitStr?: string): object | any;

function getCookie(key?: string): object | any;
function setCookie(key: string, value?: string): boolean;

function getSession(key?: string): object | any;
function setSession(key: string, value?: string): boolean;

function getStorage(key?: string): object | any;
function setStorage(key: string, value?: string): boolean;

function getCache(key?: string): object | any;
function setCache(key: string, value?: string): boolean;

export default {
    getCookie,
    setCookie,

    getSession,
    setSession,

    getStorage,
    setStorage,

    getCache,
    setCache,
}