import { Letter } from "./letter";

export class CorrectLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'correct');
    }
}