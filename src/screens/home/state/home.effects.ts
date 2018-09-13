import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/of';
import { Database } from '@ngrx/db';
import { LoadHomeState, LoadHomeStateSuccess, LoadHomeStateFail, HomeActionTypes } from './home.actions';
import { IHome, EnterpriseDataService } from '../../../common';

@Injectable()
export class HomeEffects {
  // This effect is an example of working with the store and data/screen state
  // @Effect()
  // loadHomeState$: Observable<Action> = this.actions$
  //   .ofType(HomeActionTypes.LoadHomeState)
  //   // This action happens at startup
  //   .startWith(new LoadHomeState())
  //   .switchMap(() =>
  //   // You can get data from a server via an api
  //     // Observable
  //     //   .fromPromise(this.myData.getTestData())
  //     //   .map((state: IHome) => new LoadHomeStateSuccess(state))
  //     //   .catch(error => Observable.of(new LoadHomeStateFail(error)))
  //   // You can get data from an offline stored state
  //   // An example of inserting data into offline state can be found in login.effects.ts
  //     // this.db.query('home')
  //     //  .map((state: IHome) => new LoadHomeStateSuccess(state))
  //     //  .catch(error => Observable.of(new LoadHomeStateFail(error)))
  //   );

  constructor(
    private actions$: Actions,
    private db: Database,
    private myData: EnterpriseDataService
  ) { }
}