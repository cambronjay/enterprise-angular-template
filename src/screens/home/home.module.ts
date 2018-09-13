import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home.component';
import { MaterialModule } from '../../theme/theme';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRouter } from './home.router';
import { HomeEffects } from './state/home.effects';
import { reducers } from './state/home.selectors';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HomeRouter,
    StoreModule.forFeature('home', reducers),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [HomeScreenComponent]
})
export class HomeScreenModule { }