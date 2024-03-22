import { Letter } from "./letter";

export class AlmostLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'almost');
    }
}