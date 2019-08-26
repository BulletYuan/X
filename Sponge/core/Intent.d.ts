
interface StringifyAppend {
    typeKey: string,
    stringifyFn: Function,
}

declare function ObjectStringify(obj: any, append?: StringifyAppend): string;
declare function Commit(key: string, state: string | boolean | object | any): object | any;
declare function Pull(key: string, seccess?: Function, error?: Function, complate?: Function): void;

export {
    Commit,
    Pull,
}