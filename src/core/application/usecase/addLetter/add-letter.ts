import { IAddLetter } from "./iadd-letter";

export class AddLetter implements IAddLetter {
    public constructor() { }

    public execute(): void {
        throw new Error("Method not implemented.");
    }
}