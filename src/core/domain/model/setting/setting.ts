export class Setting<Type> {
    private _editable: boolean;
    private _value: Type;
    private _defaultValue: Type;

    public constructor(enabled: boolean, defaultValue: Type) {
        this._editable = enabled;
        this._defaultValue = defaultValue;
        this._value = defaultValue;
    }

    public get Editable(): boolean {
        return this._editable;
    }

    public set Editable(enabled: boolean) {
        this._editable = enabled;
    }

    public get Value(): Type {
        return this._value;
    }

    public set Value(value: Type) {
        this._value = value;
    }

    public reset(): void {
        this.Value = this._defaultValue
    }
}