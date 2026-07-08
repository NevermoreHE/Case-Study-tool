import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'never-more';

  constructor(private keycloak: KeycloakService, private router: Router) {}

  ngOnInit(): void {
    this.keycloak.keycloakEvents$.subscribe((event) => {
      // ✅ when user logs out in another tab, this tab is notified (via iframe check)
      if (event.type === KeycloakEventType.OnAuthLogout) {
        this.router.navigate(['/auth']);
      }

      // Optional: if token expires and cannot be refreshed
      if (event.type === KeycloakEventType.OnTokenExpired) {
        this.router.navigate(['/auth']);
      }
    });
  }
}
