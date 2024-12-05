import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrMsgComponent } from './core/err-msg/err-msg.component';
import { ErrorComponent } from './error/error.component';
import { CreateAdComponent } from './ads/create-ad/create-ad.component';
import { CatalogComponent } from './ads/catalog/catalog.component';
import { DetailsComponent } from './ads/details/details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateAdComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: DetailsComponent },
  { path: 'error', component: ErrMsgComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
