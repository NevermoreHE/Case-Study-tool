import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeyCloakService } from '../services/keycloak.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // showHeader: boolean = false;
  // showHomeHeader: boolean = false;
  constructor(
    private router: Router,
    private keycloakService: KeyCloakService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onClick() {
    console.log('Clicked');
  }

  async ngOnInit() {
    const profile = await this.keycloakService.getUserProfile();

    this.username =
      // profile.firstName ||
      profile.username ||   // fallback
      '';
  }



  username:string = '';

  // ngOnInit(): void {
  //   // this.router.events.subscribe(() => {
  //   //   const currentUrl = this.router.url;
  //   //   this.showHeader = currentUrl === '/' || currentUrl === '/register' || currentUrl ==='/forgot_password';
  //   //   this.showHomeHeader = currentUrl === '/aboutUs' || currentUrl === '/help' || currentUrl === '/gamification'
  //   //   || currentUrl === '/catalogueExplorer' || currentUrl === '/euScale' || currentUrl === '/caseStudy' || currentUrl === '/home';
  //   // });
  // }

  logout() {
    this.keycloakService.logout();
  }
}
