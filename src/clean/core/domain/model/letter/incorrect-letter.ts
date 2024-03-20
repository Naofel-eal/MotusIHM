import { Letter } from "./letter";

export class IncorrectLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'incorrect');
    }
}