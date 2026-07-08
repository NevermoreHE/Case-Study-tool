import { Component, OnInit } from '@angular/core';
import { KeyCloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.css']
})
export class AuthRedirectComponent implements OnInit {
 constructor(private kc: KeyCloakService) {}

  async ngOnInit() {
        await this.kc.goLogin(window.location.origin + '/home');

  }
}
