import { Letter } from "./letter";

export class PendingLetter extends Letter {
    public constructor(letter: string) {
        super(letter, 'pending');
    }
}