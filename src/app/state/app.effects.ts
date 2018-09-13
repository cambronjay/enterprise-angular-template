import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import { Database } from '@ngrx/db';
import { Action } from '@ngrx/store';
import { environment } from '../../environments/environment';

@Injectable()
export class ApplicationEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = Observable.defer(() => {
    return this.db.open(environment.OFFLINE_DATABASE_NAME);
  });

  constructor(
    private actions$: Actions,
    private db: Database
  ) { }
}