import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PresentationsPageComponent } from './presentations-page/presentations-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { EvaluationsPageComponent } from './evaluations-page/evaluations-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';





export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://auth-smart-pub-1fc4d8e1bcf6.herokuapp.com',
        realm: 'smart_pub', 
        clientId: 'smart-rating', 
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false, 
      },
    });
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PresentationsPageComponent,
    EvaluationsPageComponent,
    ResultsPageComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [ provideHttpClient(),{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
