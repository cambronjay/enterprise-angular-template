import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Animations
import { slideInDownAnimation } from '../../app/app.animations';
// Common
import { AngularMaterialService, ErrorParseService, IHome } from '../../common';
// State
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromHome from './state/home.selectors';
import * as HomeAction from './state/home.actions';
import * as app from '../../app/state/app.actions';

@Component({
    selector: 'home-screen',
    templateUrl: 'home.template.html',
    styleUrls: ['home.scss'],
    animations: [slideInDownAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeScreenComponent implements OnInit, OnDestroy {
    @Input() private pending$: Observable<boolean>;
    private pendingSubscription: Subscription;
    private pending: boolean;
    @Input() private error$: Observable<string | null>;
    private errorSubscription: Subscription;
    private error: string | null;
    @Input() private stateData$: Observable<IHome | null>;
    private stateDataSubscription: Subscription;
    private stateData: IHome | null;

    constructor(
        private store: Store<fromHome.State>, 
        private ref: ChangeDetectorRef,
        private fb: FormBuilder, 
        private ams: AngularMaterialService,
        private errorParse: ErrorParseService
    ) {
        this.selectState();
        this.createForms();
    }


    ngOnInit() {
        this.startSubscriptions();
    }

    // Select state
    private selectState(): void {
            this.pending$ = this.store.select(fromHome.getHomeScreenPending);
            this.stateData$ = this.store.select(fromHome.getHomeState);
            this.error$ = this.store.select(fromHome.getHomeScreenError).skipWhile(error => error === undefined || error === null || error === '');
    }

    private displayLoader(pending: boolean): void {
        if (pending) {
          this.ams.showLoader("Loading");
        } else {
          this.ams.closeDialog().then(() => {
            if (this.error !== null && this.error !== undefined && this.error !== '') {
              this.displayError(this.error);
            }
          });
        }
      }
    
      private displayError(error: any): void {
        let errorMessage;
        // if (this.errorParse.foundError(error, "test")) {
        //  // errorMessage = this.errorParse.translateError(error);
        // } else {
        //   errorMessage = error instanceof Object ? error.message : error;
        // }
        this.ams.showAlert("Loading Error", errorMessage);
        this.ams.alert.afterClosed().subscribe(result => {
          this.store.dispatch(new HomeAction.HomeScreenErrorReset());
        });
      }
        
    // Create reactive forms
    private createForms(): void {

    }
    // Opens sidenav if on mobile
    public openSidenav(): void {
        this.store.dispatch(new app.OpenSidenav());
    }
    // Subscribe to state data and mark it for changes
    private startSubscriptions(): void {
        this.pendingSubscription = this.pending$
        .subscribe(data => {
            this.pending = data;
            this.displayLoader(this.pending);
            this.ref.markForCheck();
        });
        this.errorSubscription = this.error$
        .subscribe(data => {
            this.error = data;
            this.ref.markForCheck();
        });
        this.stateDataSubscription = this.stateData$
        .subscribe(data => {
            this.stateData = data;
            this.ref.markForCheck();
        });   
    }
    // Unsubscribe from state data changes
    private endSubscriptions(): void {
        this.pendingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.stateDataSubscription.unsubscribe();
    }
  
    ngOnDestroy() {
        this.endSubscriptions();
    }
    

}