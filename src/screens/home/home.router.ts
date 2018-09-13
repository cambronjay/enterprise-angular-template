import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home.component';

const homeRoutes: Routes = [
    {
      path: '', component: HomeScreenComponent
    }
];

export const HomeRouter = RouterModule.forChild(homeRoutes);