import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login.component';

const loginRoutes: Routes = [
    {
      path: 'login', component: LoginScreenComponent
    }
];

export const LoginRouter = RouterModule.forChild(loginRoutes);
