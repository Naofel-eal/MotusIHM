import { Letter } from "./letter";

export class EmptyLetter extends Letter {
    public static readonly EMPTY_VALUE: string = '';

    public constructor() {
        super(EmptyLetter.EMPTY_VALUE, 'empty');
    }
}