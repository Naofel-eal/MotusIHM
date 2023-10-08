import { Letter } from "./letter.model";

export class IncorrectLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'incorrect');
    }
}