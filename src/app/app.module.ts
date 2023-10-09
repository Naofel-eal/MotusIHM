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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    RulesComponent,
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
  ],
  providers: [GameService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
