import { AlmostLetter } from "../models/letter/almost-letter";
import { CorrectLetter } from "../models/letter/correct-letter";
import { EmptyLetter } from "../models/letter/empty-letter";
import { IncorrectLetter } from "../models/letter/incorrect-letter";
import { Letter } from "../models/letter/letter.model";
import { PendingLetter } from "../models/letter/pending-letter";

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