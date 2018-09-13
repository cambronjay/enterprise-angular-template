import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import { IMyData } from '../../';
import * as appConfig from '../../../app/app.constants';
import { ISignUp, IUserStatus } from '../../';
// Data state found in the common state folder
//import * as DataAction from '../../';
// Screen state
//import * as HomeAction from '../../../screens/home/state/home.actions';

@Injectable()
export class EnterpriseDataService {
    constructor() { }

    public getTestData(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this.myService
            //     .getData({})
            //     .then(result => {
            //         // Data can exist within its own state or as part of a screen state
            //         // You can dispatch actions here or from the effect
            //         //this.store.dispatch(new data.LoadMyDataAction(result as IMyData[]));
            //         // or 
            //         //this.store.dispatch(new home.LoadMyDataAction(result as IHome[]));
            //         resolve(result);
            //     })
            //     .catch(error => {
            //         reject(error.message);
            //     });
        });
    }

    public postSignUp(formData: ISignUp): Promise<any> {
        return new Promise((resolve, reject) => {
            // this.myService
            //     .postData({})
            //     .then(result => {
            //         resolve(result);
            //     })
            //     .catch(error => {
            //         reject(error.message);
            //     });
        });
    }

    public getRegisteredStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this.myService
            //     .postData({})
            //     .then(result => {
            //         resolve(result as IUserStatus);
            //     })
            //     .catch(error => {
            //         reject(error.message);
            //     });
        });
    }    

    public postTestData(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // this.myService
            //     .postData({})
            //     .then(result => {
            //         resolve(result);
            //     })
            //     .catch(error => {
            //         reject(error.message);
            //     });
        });
    }

}