import { Observable } from "rxjs";
import { FetchWordAPIResponse } from "../model/FetchWordAPIResponse";

export interface IAPIWordRepository {
    fetchSolutionWords(isoCode: string, numberOfWords: number): Observable<FetchWordAPIResponse>

    validateWord(isoCode: string, word: string): Observable<number>
}