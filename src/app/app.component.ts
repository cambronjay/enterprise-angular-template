import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from './state/app.selectors';
import * as fromAuth from '../screens/login/state/login.selectors';
import * as app from './state/app.actions';
import * as AuthenticationActions from '../screens/login/state/login.actions';
import { MediaMatcher } from '@angular/cdk/layout';
import { IUserAuth } from '../common';

@Component({
  selector: 'enterprise-app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.scss'],
  animations: [
    trigger('splashAnimate', [
      state('true', style({ opacity: 1, 'z-index': '10000' })),
      state('false', style({ opacity: 0, 'z-index': '0' })),
      transition('false <=> true', animate(500))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() private showSidenav$: Observable<boolean>;
  private showSidenavSubscription: Subscription;
  private showSidenav: boolean;
  @Input() private loggedIn$: Observable<boolean>;
  private loggedInSubscription: Subscription;
  public loggedIn: boolean;
  @Input() private user$: Observable<IUserAuth>;
  private userSubscription: Subscription;
  private user: IUserAuth;
  @Input() private splashScreen$: Observable<boolean>;
  private splashScreenSubscription: Subscription;
  public splashScreen: boolean;
  public mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(private store: Store<fromRoot.State>, private ref: ChangeDetectorRef, private media: MediaMatcher) {
    this.selectState();
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.ref.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.startSubscriptions();
  }

  ngAfterViewInit() {
    const store = this.store;
    setTimeout(function () {
      store.dispatch(new app.UpdateSplashScreenStatus(false));
    }, 2000);
  }

  private keepMenuOpen(isMobile: boolean): boolean {
    if (isMobile) {
      return this.showSidenav;
    } else {
      return true;
    }
  }

  private selectState(): void {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.user$ = this.store.select(fromAuth.getUser);
    this.splashScreen$ = this.store.select(fromRoot.getSplashScreenStatus);
  }

  private startSubscriptions(): void {
    this.showSidenavSubscription = this.showSidenav$
      .subscribe(data => {
        this.showSidenav = data;
        this.ref.markForCheck();
      });
    this.loggedInSubscription = this.loggedIn$
      .subscribe(data => {
        this.loggedIn = data;
        this.ref.markForCheck();
      });
    this.userSubscription = this.user$
      .subscribe(data => {
        this.user = data;
        this.ref.markForCheck();
      });
    this.splashScreenSubscription = this.splashScreen$
      .subscribe(data => {
        this.splashScreen = data;
        this.ref.markForCheck();
      });
  }

  public closeSidenav(): void {
    this.store.dispatch(new app.CloseSidenav());
  }

  private endSubscriptions(): void {
    this.showSidenavSubscription.unsubscribe();
    this.loggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.splashScreenSubscription.unsubscribe();
  }

  private logout(): void {
    this.closeSidenav();
    this.store.dispatch(new AuthenticationActions.Logout(this.user));
  }

  ngOnDestroy() {
    this.endSubscriptions();
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}