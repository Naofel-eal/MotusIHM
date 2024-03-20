import { Settings } from "http2";
import { Setting } from "src/clean/core/domain/model/setting/setting";
import { ISettingsCache } from "./isettings-cache";

export class SettingsCache implements ISettingsCache {
    addSetting(setting: Setting): void {
        throw new Error("Method not implemented.");
    }
    
    addSettings(settings: Settings[]): void {
        throw new Error("Method not implemented.");
    }
    
}