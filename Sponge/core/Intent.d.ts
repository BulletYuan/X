
interface StringifyAppend {
    typeKey: string,
    stringifyFn: Function,
}

declare class Sponge {
    constructor(): void;
    private Storage: object;

    private ObjectStringify(obj: any, append?: StringifyAppend): string;
    public Commit(key: string | Array, state: string | boolean | object | any): void;
    public Pull(key: string, seccess?: Function, error?: Function, complate?: Function): void;
}

export default new Sponge()