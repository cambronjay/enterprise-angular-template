import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
// State management
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './state/app.selectors';
// Common imports
import { CustomRouterStateSerializer, AngularMaterialService, EnterpriseDataService } from '../common';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular5-social-login';
// State persistence
import { DBModule } from '@ngrx/db';
import { schema } from '../../config/config';
import { ApplicationEffects } from './state/app.effects';
// Theme
import { MaterialModule } from '../theme/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
// Screens
import { LoginScreenModule } from '../screens/login/login.module';
import { NotFoundScreenComponent } from '../screens/not-found/not-found.component';
import { PendingScreenComponent } from '../screens/pending/pending.component';
// Global Components
import { AlertModalComponent } from '../modals/alert/alert.component';
import { LoaderModalComponent } from '../modals/loader/loader.component';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider("334916330352-jgffj8nie8q2fhoq81auol8s6030i5j7") }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundScreenComponent,
    PendingScreenComponent,
    AlertModalComponent,
    LoaderModalComponent
  ],
  entryComponents: [AlertModalComponent, LoaderModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRouter,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({}) : [],
    EffectsModule.forRoot([ApplicationEffects]),
    DBModule.provideDB(schema),
    LoginScreenModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    AngularMaterialService,
    EnterpriseDataService,
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
