export class Setting {
    private editable: boolean;
    private value: number;

    public constructor(enabled: boolean, value: number) {
        this.editable = enabled;
        this.value = value;
    }

    public get Editable(): boolean {
        return this.editable;
    }

    public get Value(): number {
        return this.value;
    }

    public set Value(value: number) {
        this.value = value;
    }

    public set Editable(enabled: boolean) {
        this.editable = enabled;
    }
}