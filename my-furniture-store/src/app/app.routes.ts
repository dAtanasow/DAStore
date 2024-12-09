import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrMsgComponent } from './core/err-msg/err-msg.component';
import { ErrorComponent } from './error/error.component';
import { CreateAdComponent } from './ads/create-ad/create-ad.component';
import { CatalogComponent } from './ads/catalog/catalog.component';
import { DetailsComponent } from './ads/details/details.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditComponent } from './ads/edit-page/edit-page.component';
import { MyFurnitureComponent } from './ads/my-furniture/my-furniture.component';
import { CartComponent } from './user/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my-furniture', component: MyFurnitureComponent },
  { path: 'create', component: CreateAdComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'error', component: ErrMsgComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
