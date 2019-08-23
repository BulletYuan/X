
interface StringifyAppend {
    typeKey: string,
    stringifyFn: Function,
}

function ObjectStringify(obj: any, append?: StringifyAppend): string;
function Commit(key: string, state: string | boolean | object | any): object | any;
function Pull(key: string): object | any;

export {
    Commit,
    Pull,
}