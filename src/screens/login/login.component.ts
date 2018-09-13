import { environment } from '../../environments/environment';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CAuthenticate, IGoogleLogin, AngularMaterialService, ErrorParseService, EnterpriseDataService, IUserStatus } from '../../common';
import 'rxjs/add/operator/skipWhile';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
//import { slideInDownAnimation } from '../../app/app.animations';
import * as fromAuthentication from './state/login.selectors';
import * as AuthenticationAction from './state/login.actions';
import * as app from '../../app/state/app.actions';
import { AuthService, GoogleLoginProvider } from 'angular5-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'login-screen',
  templateUrl: './login.template.html',
  styleUrls: ['./login.scss'],
  //animations: [slideInDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginScreenComponent implements OnInit, OnDestroy {
  @Input() private pending$: Observable<boolean>;
  private pendingSubscription: Subscription;
  public pending: boolean;
  @Input() private error$: Observable<string | null>;
  private errorSubscription: Subscription;
  private error: string | null;
  public loginForm: FormGroup;
  public appName = environment.APP_NAME;
  public isExternalApp = environment.EXTERNAL_APP;
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display') display = 'block';
  // @HostBinding('style.position') position = 'absolute';

  constructor(
    private store: Store<fromAuthentication.State>, private ref: ChangeDetectorRef,
    private fb: FormBuilder, private ams: AngularMaterialService, private errorParse: ErrorParseService,
    private socialAuthService: AuthService, private enterpriseDataService: EnterpriseDataService, private router: Router
  ) {
    this.selectState();
    this.createForms();
  }

  ngOnInit() {
    this.startSubscriptions();

  }

  private selectState(): void {
    this.pending$ = this.store.select(fromAuthentication.getLoginScreenPending);
    this.error$ = this.store.select(fromAuthentication.getLoginScreenError).skipWhile(error => error === undefined || error === null || error === '');
  }

  private createForms(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
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

  private displayLoader(pending: boolean): void {
    if (pending) {
      this.loginForm.disable();
      this.ams.showLoader("Authenticating");
    } else {
      this.loginForm.enable();
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
    this.ams.showAlert("Login Error", errorMessage);
    this.loginForm.reset();
    this.ams.alert.afterClosed().subscribe(result => {
      this.store.dispatch(new AuthenticationAction.LoginErrorReset());
    });
  }

  private endSubscriptions(): void {
    this.pendingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  public login(): void {
    const formModel: CAuthenticate = this.loginForm.value;
    this.store.dispatch(new AuthenticationAction.Login(formModel));
  }

  private googleSignIn(): void {
    this.enterpriseDataService.getRegisteredStatus()
      .then((status: IUserStatus) => {
          this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((userData) => {
              let google: IGoogleLogin = {
                token: userData.idToken,
                fullName: userData.name,
                email: userData.email,
                imageURL: userData.image
              }
              this.store.dispatch(new AuthenticationAction.GoogleLogin(google));
            });
      })
      .catch((error) => {
        this.store.dispatch(new AuthenticationAction.LoginFailure(error));
      });
  }

  ngOnDestroy(): void {
    this.endSubscriptions();
  }
}