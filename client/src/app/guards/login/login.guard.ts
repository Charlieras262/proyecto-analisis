import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router,
    public authService: AuthenticateService,
    public translate: TranslateService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/login']);
      this.translate.get('login_guard_msg').subscribe(res => {
        $.toaster(res, '<i class="fa fa-exclamation-triangle"></i>', 'info');
      });
      return false;
    }else{
      return true;
    }
  }
}
