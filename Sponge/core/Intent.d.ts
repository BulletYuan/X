
interface StringifyAppend {
    typeKey: string,
    stringifyFn: Function,
}

declare class Sponge {
    constructor();
    private Storage: object;

    private ObjectStringify(obj: any, append?: StringifyAppend): string;
    public Do(key: string | Array<string>, state: string | boolean | object | any): void;
    public Observer(key: string, seccess?: Function, error?: Function, complate?: Function): void;
}

export default new Sponge;