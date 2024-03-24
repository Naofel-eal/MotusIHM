import { copy } from "src/core/application/shared/copy";

export class Setting<Type> {
    public editable: boolean;
    public value: Type;
    public defaultValue: Type;
    public code: string;
    public displayedName: string;
    public min?: number;
    public max?: number;

    public constructor(code: string, displayedName: string, enabled: boolean, defaultValue: Type, min?: number, max?: number) {
        this.code = code;
        this.displayedName = displayedName;
        this.editable = enabled;
        this.defaultValue = defaultValue;
        this.value = copy(defaultValue);
        this.min = min;
        this.max = max;
    }

    public reset(): void {
        this.value = copy(this.defaultValue)
    }
}