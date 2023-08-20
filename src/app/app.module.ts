import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './shared/services/api.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';
import { PusherService } from './shared/services/pusher.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    RouterModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ApiService,
    PusherService,

  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
