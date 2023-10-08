import { Letter } from "./letter.model";

export class AlmostLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'almost');
    }
}