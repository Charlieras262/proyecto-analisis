import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
  constructor(private router: Router,
    public authService: AuthenticateService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/dashboard/0001']);
      return false;
    }
  }
}
