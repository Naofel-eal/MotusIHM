import { Setting } from "src/core/domain/model/setting/setting"

export interface ISettingsCacheService {
    init(): void
    
    resetAllSettings(): void

    getSettingByKey(key: string): Setting<any> | undefined 
}