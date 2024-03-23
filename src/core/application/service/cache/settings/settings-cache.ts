import { Setting } from "src/core/domain/model/setting/setting";
import { ISettingsCacheService } from "./isettings-cache";
import { SettingsName } from "../../../enum/settings-name";
import { Injectable } from "@angular/core";
import { Language } from "src/core/domain/model/language/language";

@Injectable()
export class SettingsCacheService implements ISettingsCacheService {
    private _settings!: Map<string, Setting<any>>

    public constructor() {
        this._settings = new Map<string, Setting<any>>();
        this.init()
    }

    public init(): void {
        this._settings.set(SettingsName.DELAY_BEFORE_NEW_GAME_IN_MS, new Setting(true, 2000));
        this._settings.set(SettingsName.LETTER_ANIMATION_DURATION_IN_MS, new Setting(true, 300));
        this._settings.set(SettingsName.NUMBER_OF_TRIES, new Setting(true, 7));
        this._settings.set(SettingsName.NUMBER_OF_WORD_LOADED_AT_ONCE, new Setting(true, 10));
        this._settings.set(SettingsName.GAME_LANGUAGE, new Setting(true, new Language("FR")));
        this._settings.set(SettingsName.DELAY_BEFORE_ERASE_LETTERS, new Setting(true, 1000));
    }

    public resetAllSettings(): void {
        this._settings.forEach((setting) => setting.reset())
    }

    public getSettingByKey(key: string): Setting<any> {
        const setting = this._settings.get(key);
        if (setting) 
            return setting
        else
            throw new Error("Setting: " + key + " can't be found.")
    }
}