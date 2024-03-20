import { Settings } from "http2";
import { Setting } from "src/clean/core/domain/model/setting/setting";

export interface ISettingsCache {
    addSetting(setting: Setting): void
    
    addSettings(settings: Settings[]): void
}