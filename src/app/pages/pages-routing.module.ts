import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {
    path: 'home',
   // canActivate: [AuthGuard],
    component: HomePage,
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'registro',
    component: RegistroComponent
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
}) export class PagesRoutingModule {}
