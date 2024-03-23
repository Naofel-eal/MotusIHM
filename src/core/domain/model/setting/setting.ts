export class Setting<Type> {
    private _editable: boolean;
    private _value: Type;
    private _defaultValue: Type;

    public constructor(enabled: boolean, defaultValue: Type) {
        this._editable = enabled;
        this._defaultValue = defaultValue;
        this._value = defaultValue;
    }

    public get editable(): boolean {
        return this._editable;
    }

    public set editable(enabled: boolean) {
        this._editable = enabled;
    }

    public get value(): Type {
        return this._value;
    }

    public set value(value: Type) {
        this._value = value;
    }

    public reset(): void {
        this.value = this._defaultValue
    }
}