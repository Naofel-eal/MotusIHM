import { Setting } from "src/core/domain/model/setting/setting"

export interface ISettingsCacheService {
    selectedLanguagesIndex: number;

    init(): void
    
    resetAllSettings(): void

    getSettingByKey(key: string): Setting<any> | undefined

    get allSettings(): Setting<any>[]
}