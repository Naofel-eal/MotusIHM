import { Setting } from "src/core/domain/model/setting/setting";
import { ISettingsCacheService } from "./isettings-cache";
import { SettingsName } from "../../../enum/settings-name";
import { Injectable } from "@angular/core";
import { Language } from "src/core/domain/model/language/language";
import { SettingsCode } from "src/core/application/enum/settings-code";

@Injectable()
export class SettingsCacheService implements ISettingsCacheService {
    private _settings!: Map<string, Setting<any>>

    public constructor() {
        this._settings = new Map<string, Setting<any>>();
        this.init()
    }

    public init(): void {
        this._settings.set(SettingsCode.DELAY_BEFORE_NEW_GAME_IN_MS, 
            new Setting(SettingsCode.DELAY_BEFORE_NEW_GAME_IN_MS, SettingsName.DELAY_BEFORE_NEW_GAME_IN_MS, true, 2000, 0, 10000));
        
        this._settings.set(SettingsCode.LETTER_ANIMATION_DURATION_IN_MS, 
            new Setting(SettingsCode.LETTER_ANIMATION_DURATION_IN_MS, SettingsName.LETTER_ANIMATION_DURATION_IN_MS, true, 300, 0, 1000));
        
        this._settings.set(SettingsCode.NUMBER_OF_TRIES, 
            new Setting(SettingsCode.NUMBER_OF_TRIES, SettingsName.NUMBER_OF_TRIES, true, 7, 1, 8));
        
        this._settings.set(SettingsCode.NUMBER_OF_WORD_LOADED_AT_ONCE, 
            new Setting(SettingsCode.NUMBER_OF_WORD_LOADED_AT_ONCE, SettingsName.NUMBER_OF_WORD_LOADED_AT_ONCE, true, 10, 1, 20));
        
        this._settings.set(SettingsCode.DELAY_BEFORE_ERASE_LETTERS, 
            new Setting(SettingsCode.DELAY_BEFORE_ERASE_LETTERS, SettingsName.DELAY_BEFORE_ERASE_LETTERS, true, 1000, 0, 5000));
        
        this._settings.set(SettingsCode.GAME_LANGUAGE, 
            new Setting(SettingsCode.GAME_LANGUAGE, SettingsName.GAME_LANGUAGE, true, new Language("FR")));
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

    public get allSettings(): Setting<any>[] {
        return Array.from(this._settings.values())
    }

}