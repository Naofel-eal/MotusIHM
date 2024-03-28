import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpeedDialModule } from 'primeng/speeddial';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InfrastructureModule } from '../module/infrastructure.module';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../page/home/component/grid/grid.component';
import { HomeComponent } from "../page/home/home.component";
import { RulesComponent } from '../page/home/component/rules/rules.component';
import { SettingsComponent } from '../page/home/component/settings/settings/settings.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomTranslationLoader } from '../translation/cutsom-translation-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    providers: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        DynamicDialogModule,
        ButtonModule,
        ToastModule,
        SkeletonModule,
        ProgressSpinnerModule,
        SpeedDialModule,
        InputTextModule,
        InputSwitchModule,
        InfrastructureModule,
        GridComponent,
        CommonModule,
        HomeComponent,
        RulesComponent,
        SettingsComponent,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                  useClass: CustomTranslationLoader,
                  deps: [HttpClient]
              }
        })
    ]
})
export class AppModule { }
