import { Injectable } from '@angular/core';
import { Router , CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService,
                private router:Router) {

    }
    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if(this.authService.checkLogIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
        throw new Error("Method not implemented.");
    }
}