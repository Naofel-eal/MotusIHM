import { AlmostLetter } from "../almost-letter";
import { CorrectLetter } from "../correct-letter";
import { EmptyLetter } from "../empty-letter";
import { IncorrectLetter } from "../incorrect-letter";
import { Letter } from "../letter";
import { PendingLetter } from "../pending-letter";

export class LetterUtils {
    public static isEmptyLetter(letter: Letter): boolean {
        return letter instanceof EmptyLetter;
    }

    public static isPendingLetter(letter: Letter): boolean {
        return letter instanceof PendingLetter;
    }

    public static toCorrectLetter(letter: Letter): CorrectLetter {
        return new CorrectLetter(letter.value);
    }

    public static toIncorrectLetter(letter: Letter): IncorrectLetter {
        return new IncorrectLetter(letter.value);
    }

    public static toPendingLetter(letter: Letter): PendingLetter {
        return new PendingLetter(letter.value);
    }

    public static toAlmostLetter(letter: Letter): AlmostLetter {
        return new AlmostLetter(letter.value);
    }

    public static toEmptyLetter(): EmptyLetter {
        return new EmptyLetter();
    }
}