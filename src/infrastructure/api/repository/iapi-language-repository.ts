import { Observable } from "rxjs";
import { IGetAllLanguagesAPIResponse } from "../model/iget-all-languages";

export interface IAPILanguageRepository {
    getAllLanguages(): Observable<IGetAllLanguagesAPIResponse>
}