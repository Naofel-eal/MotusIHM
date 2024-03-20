import { Letter } from "./letter.model";

export class PendingLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'pending');
    }
}