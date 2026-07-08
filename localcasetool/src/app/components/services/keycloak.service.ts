  import { Injectable } from '@angular/core';
  import { KeycloakService } from 'keycloak-angular';
  import { KeycloakProfile } from 'keycloak-js';

  @Injectable({
    providedIn: 'root'
  })
  export class KeyCloakService {

    constructor(private readonly keycloak: KeycloakService) {}

    isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

   async logout(): Promise<void> {
  localStorage.removeItem('token');
  await this.keycloak.logout(window.location.origin + '/auth');
}

    async getUserProfile(): Promise<KeycloakProfile> {
      return await this.keycloak.loadUserProfile();
    }

    getToken(): Promise<string> {
      return this.keycloak.getToken();
    }

    async goLogin(redirectTo: string = window.location.origin + '/home'): Promise<void> {
      await this.keycloak.login({
        redirectUri: redirectTo
      });
    }
  }
