import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private publicPaths = [
    // '/',
    // '/home',
    '/catalogue_explorer_info',
    '/eu_scale_info',
    '/case_study_info',
    '/gamification_info',
    '/helpInfo',
    '/aboutUsInfo',
      '/auth',
  ];

  constructor(private keycloak: KeycloakService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const path = state.url.split('?')[0];

    // ✅ public routes do not require login
    if (this.publicPaths.includes(path)) return true;

    // ✅ Keycloak logged-in check (handles refresh correctly)
    const loggedInRaw = this.keycloak.isLoggedIn() as any;
    const loggedIn = typeof loggedInRaw === 'boolean' ? loggedInRaw : await loggedInRaw;

    if (loggedIn) return true;

    // ✅ redirect to Keycloak login and come back to the page user requested
    await this.keycloak.login({
      redirectUri: window.location.origin + state.url
    });

    return false;
  }
}
