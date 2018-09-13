import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Common
import { AngularMaterialService, ErrorParseService, ISignUp, CSignUp } from '../../common';
// State
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromSignUp from './state/signup.selectors';
import * as SignUpAction from './state/signup.actions';

@Component({
    selector: 'signup-screen',
    templateUrl: 'signup.template.html',
    styleUrls: ['signup.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpScreenComponent implements OnInit, OnDestroy {
    @Input() private pending$: Observable<boolean>;
    private pendingSubscription: Subscription;
    public pending: boolean;
    @Input() private error$: Observable<string | null>;
    private errorSubscription: Subscription;
    private error: string | null;
    public signUpForm: FormGroup;

    constructor(
        private store: Store<fromSignUp.State>,
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
        this.pending$ = this.store.select(fromSignUp.getSignupScreenPending);
        this.error$ = this.store.select(fromSignUp.getSignupScreenError).skipWhile(error => error === undefined || error === null || error === '');
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
        //    // errorMessage = this.errorParse.translateError(error);
        // } else {
        //     errorMessage = error instanceof Object ? error.message : error;
        // }
        this.ams.showAlert("Sign Up Error", errorMessage);
        this.ams.alert.afterClosed().subscribe(result => {
            this.store.dispatch(new SignUpAction.SignUpScreenErrorReset());
        });
    }

    private createForms(): void {
        this.signUpForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            address: ['', [Validators.required, Validators.minLength(3)]]
        })
    }

    public signUp(): void {
        const formModel: CSignUp = this.signUpForm.value;
        this.store.dispatch(new SignUpAction.SignUp(formModel));
    }

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
    }

    private endSubscriptions(): void {
        this.pendingSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }

    ngOnDestroy() {
        this.endSubscriptions();
    }


}