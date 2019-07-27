import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

import { authAdmin } from '../common/authAdmin';
import { adminInfo } from '../service/AdminInfoDb.storage';

@Injectable({ providedIn: 'root' })
export class RouterGuardService implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!authAdmin.authUser(adminInfo.id, adminInfo.adminToken) && state.url.indexOf('login') < 0) {
            this.router.navigate(['/login']);
            return false;
        }
        if (authAdmin.authUser(adminInfo.id, adminInfo.adminToken) && state.url.indexOf('login') >= 0) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canDeactivate(): boolean {
        if (authAdmin.authUser(adminInfo.id, adminInfo.adminToken)) {
            this.router.navigate(['/']);
            return true;
        }
    }

    canLoad(): boolean {
        if (!authAdmin.authUser(adminInfo.id, adminInfo.adminToken)) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
