import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpScreenComponent } from './signup.component';
import { MaterialModule } from '../../theme/theme';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignUpRouter } from './signup.router';
import { SignUpEffects } from './state/signup.effects';
import { reducers } from './state/signup.selectors';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SignUpRouter,
    StoreModule.forFeature('signup', reducers),
    EffectsModule.forFeature([SignUpEffects]),
  ],
  declarations: [SignUpScreenComponent]
})
export class SignUpScreenModule { }