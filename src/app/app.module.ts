import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// interceptor
import { JwtInterceptor } from './security/jwt.interceptor';

// componets pages
import { LoginComponent } from './auth/login/login/login.component';
import { UserComponent } from './pages/user/user/user.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found/no-page-found.component';

// components primeng
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { PanelModule } from 'primeng/panel'
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CalendarModule } from "primeng/calendar";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { ProgressComponent } from './shared/progress/progress.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    NoPageFoundComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    PanelModule,
    ToastModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    ConfirmDialogModule,
    CheckboxModule,
    ProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
