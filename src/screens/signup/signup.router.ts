import { Routes, RouterModule } from '@angular/router';
import { SignUpScreenComponent } from './signup.component';

const signUpRoutes: Routes = [
    {
      path: '', component: SignUpScreenComponent
    }
];

export const SignUpRouter = RouterModule.forChild(signUpRoutes);