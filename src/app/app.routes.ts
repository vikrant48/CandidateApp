// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersListComponent } from './components/users-list/user-list.component';
import { UserDetailComponent } from './components/user-details/user-details.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminComponent } from './components/admin/admin.component';
// import { RegisterFieldConfigComponent } from './config_components/register-field-config/register-field-config.component
import { RegisterFieldConfigComponent } from './config_components/register-field-config/register-field-config.component';
import { CurrentUserDetailsComponent } from './components/current-user-details/current-user-details.component';
import { ChatComponent } from './components/chat/chat.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register_config', component: RegisterFieldConfigComponent, canActivate: [RoleGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  // { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
  { path: 'userdetails', component: UserDetailComponent, canActivate: [authGuard] },
  { path: 'my-details', component: CurrentUserDetailsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];