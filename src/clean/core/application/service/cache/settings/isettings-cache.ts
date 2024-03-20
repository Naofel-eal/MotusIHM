import { Setting } from "src/clean/core/domain/model/setting/setting"

export interface ISettingsCacheService {
    init(): void
    
    resetSettings(): void

    getSettingByKey(key: string): Setting<any> | undefined 
}