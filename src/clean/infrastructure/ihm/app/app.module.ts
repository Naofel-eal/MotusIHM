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
import { CoreModule } from 'src/clean/core/application/module/core.module';
import { InfrastructureModule } from '../module/infrastructure.module';

@NgModule({
  declarations: [
    AppComponent
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
    CoreModule,
    InfrastructureModule
  ],
  providers: [
    {
      provide: APIWordRepository,
      useClass: APIWordRepository
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
