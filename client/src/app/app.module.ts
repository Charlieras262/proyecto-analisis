import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { FormsModule } from '@angular/forms';
//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StudentsComponent } from './components/students/students.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { AdminsComponent } from './components/admins/admins.component';
import { VarDirective } from './directives/var.directive';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardSuComponent } from './components/dashboard-su/dashboard-su.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SingupComponent,
    NotFoundComponent,
    StudentsComponent,
    AssignmentsComponent,
    AdminsComponent,
    DashboardAdminComponent,
    DashboardSuComponent,
    VarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
