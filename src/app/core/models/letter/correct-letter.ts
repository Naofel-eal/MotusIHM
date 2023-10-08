import { Letter } from "./letter.model";

export class CorrectLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'correct');
    }
}