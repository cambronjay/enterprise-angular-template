import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
//import { _throw } from 'rxjs/observable/throw';
import { IUser, IUserAuth, ILogin, IGoogleLogin, ISignUp, IUserStatus } from '../../interfaces';
import { EnterpriseDataService } from '../data';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthenticationService {
  constructor(private enterpriseDataService: EnterpriseDataService) { }

  public login({ username, password }: ILogin): Observable<IUserAuth> {
    // return Observable
    //   .fromPromise(this.myService.authenticateUser(username, password))
    //   .map((data: IUser) => {
    //     let userAuth = data as IUserAuth;
    //     userAuth.id = '1';
    //     return userAuth;
    //   });
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    // if (username !== 'test@test.com') {
    //   return _throw('Invalid username or password');
    // }

    // return Observable.of({ name: 'User' });
  }

  public googleLogin(google: IGoogleLogin): Observable<IUserAuth> {
    return Observable
      .fromPromise(this.googleAuth(google))
      .map((data: IUser) => {
        let userAuth = data as IUserAuth;
        userAuth.fullName = google.fullName;
        userAuth.userEmail = google.email;
        userAuth.imageURL = google.imageURL;
        userAuth.id = '1';
        return userAuth;
      });
  }

  private googleAuth(google: IGoogleLogin): Promise<any> {
    return new Promise((resolve, reject) => {
      // this.myService.AuthenticateGoogleUser(google.token)
      //   .then(data => {

      //   });
    });
  }

  public signUp(formData: ISignUp) {
    return Observable
      .fromPromise(this.enterpriseDataService.postSignUp(formData))
      .map((data) => {
        return data;
      });
  }

  public checkAuthentication(user: IUserAuth): Observable<boolean | Error> {
    let userSession = user as IUser;
    // return Observable
    //   .fromPromise(this.myService.checkAuth(userSession));
  }
}