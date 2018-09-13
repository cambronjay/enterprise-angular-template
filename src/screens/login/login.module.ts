import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../theme/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Components
import { LoginScreenComponent } from './login.component';
// Services
import { AuthenticationService, AuthenticationGuard, SignUpGuard, PendingGuard, ErrorParseService } from '../../common';
import { AuthenticationEffects } from './state/login.effects';
import { reducers } from './state/login.selectors';
import { LoginRouter } from './login.router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [LoginScreenComponent],
    exports: [LoginScreenComponent]
})
export class LoginScreenModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthenticationModule,
            providers: [AuthenticationService, AuthenticationGuard, SignUpGuard, PendingGuard, ErrorParseService],
        };
    }
}

@NgModule({
    imports: [
        LoginScreenModule,
        LoginRouter,
        StoreModule.forFeature('authentication', reducers),
        EffectsModule.forFeature([AuthenticationEffects]),
    ],
})
export class AuthenticationModule { }