import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { LoginComponent } from './auth/login/login/login.component';
import { UserComponent } from './pages/user/user/user.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found/no-page-found.component';

// security
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: UserComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
