import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from './core/components/loading/loading.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpeedDialModule } from 'primeng/speeddial';
import { GameService } from './core/services/game-service/game-service.service';
import { MessageService } from 'primeng/api';
import { RulesComponent } from './core/components/rules/rules.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    RulesComponent,
    SettingsComponent,
  ],
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
  ],
  providers: [GameService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
