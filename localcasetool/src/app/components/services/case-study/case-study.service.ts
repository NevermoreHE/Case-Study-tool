import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {
  // private apiUrl = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getCaseStudies';
  private apiUrl = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getCaseStudies';

  constructor(private http: HttpClient,private keycloakToken:KeycloakService) { }

  thekeycloakToken:any =this.keycloakToken.getToken().then(data => console.log(data));

  getCaseStudies():Observable<string>{
    return this.http.get(this.apiUrl, {headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
  }
  
}
