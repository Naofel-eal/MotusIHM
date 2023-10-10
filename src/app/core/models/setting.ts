export class Setting {
    private enabled: boolean;
    private value: number;

    public constructor(enabled: boolean, value: number) {
        this.enabled = enabled;
        this.value = value;
    }

    public get Enabled(): boolean {
        return this.enabled;
    }

    public get Value(): number {
        return this.value;
    }

    public set Value(value: number) {
        this.value = value;
    }

    public set Enabled(enabled: boolean) {
        this.enabled = enabled;
    }
}