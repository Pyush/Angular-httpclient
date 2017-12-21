import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HttpclientService} from "./services/httpclient.service";
import {AuthInterceptor} from "./intercepter/auth-interceptor";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {Routing} from "./routes";
import {AuthGuard} from "./auth.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFab,
  MatIcon,
  MatMiniFab,
  MatRaisedButtonCssMatStyler
} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Routing,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [
    HttpclientService,
    AuthGuard,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
