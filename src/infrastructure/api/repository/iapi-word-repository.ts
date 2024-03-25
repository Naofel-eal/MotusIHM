import { Observable } from "rxjs";
import { IFetchWordAPIResponse } from "../model/ifetch-word-api-response";

export interface IAPIWordRepository {
    fetchSolutionWords(isoCode: string, numberOfWords: number): Observable<IFetchWordAPIResponse>

    validateWord(isoCode: string, word: string): Observable<number>
}