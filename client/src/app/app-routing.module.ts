import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { UserAdminGuard } from './guards/admin/user-admin.guard';
import { NoLoginGuard } from './guards/no-login/no-login.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SuGuard } from './guards/su/su.guard';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { StudentsComponent } from './components/students/students.component';
import { DashboardSuComponent } from './components/dashboard-su/dashboard-su.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  //GENERAL
  {path: '', pathMatch: 'full', redirectTo: 'login'},                            
  {path: 'login', component: LoginComponent, canActivate: [NoLoginGuard]},
  {path: 'singup', component: SingupComponent, canActivate: [NoLoginGuard]},
  //SU
  {path: 'dashboard/0001', component: DashboardSuComponent, canActivate: [SuGuard]},
  {path: 'dashboard/0001/asignar', component: AssignmentsComponent, canActivate: [SuGuard]},
  {path: 'dashboard/0001/cuentas', component: StudentsComponent, canActivate: [SuGuard]},
  //ADMIN
  {path: 'dashboard/0010', component: DashboardAdminComponent, canActivate: [UserAdminGuard]},
  {path: 'dashboard/0010/asignar', component: AssignmentsComponent, canActivate: [UserAdminGuard]},
  {path: 'dashboard/0010/cuentas', component: StudentsComponent, canActivate: [UserAdminGuard]},
  //NOTFOUND
  {path: '**', redirectTo: 'not-found'},
  {path: 'not-found', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
