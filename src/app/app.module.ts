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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
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
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
