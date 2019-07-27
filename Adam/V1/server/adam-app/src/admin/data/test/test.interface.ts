export class Test {
    private id: number;
    private name: string;

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }

    setId(id: number) {
        this.id = id;
    }
    setName(name: string) {
        this.name = name;
    }

    toJson(): object {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
