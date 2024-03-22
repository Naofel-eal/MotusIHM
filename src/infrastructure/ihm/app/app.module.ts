import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpeedDialModule } from 'primeng/speeddial';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { APIWordRepository } from '../../api/repository/api-word-repository';
import { CoreModule } from 'src/core/application/module/core.module';
import { InfrastructureModule } from '../module/infrastructure.module';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../page/home/component/grid/grid.component';
import { HomeComponent } from "../page/home/home.component";
import { RulesComponent } from '../page/home/component/rules/rules.component';
import { SettingsComponent } from '../page/home/component/settings/settings.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: APIWordRepository,
            useClass: APIWordRepository
        },
    ],
    bootstrap: [AppComponent],
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
        CoreModule,
        InfrastructureModule,
        GridComponent,
        CommonModule,
        HomeComponent,
        RulesComponent,
        SettingsComponent
    ]
})
export class AppModule { }
