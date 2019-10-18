
interface StringifyAppend {
    typeKey: string,
    stringifyFn: Function,
}

declare class Sponge {
    constructor();
    private Storage: object;

    private ObjectStringify(obj: any, append?: StringifyAppend): string;
    public Commit(key: string | Array<string>, state: string | boolean | object | any): void;
    public Pull(key: string, seccess?: Function, error?: Function, complate?: Function): void;
}

export default Sponge