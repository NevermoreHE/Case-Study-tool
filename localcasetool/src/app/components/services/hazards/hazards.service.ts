import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HazardsService {
//  private apiUrl = 'http://localhost:8080/nevermore-backend/getHazards';
 private apiUrl = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getHazards';

//  private apiUrlForHazardsForSelectedCaseStudy = 'http://localhost:8080/nevermore-backend/getHazardsForSpecificCaseStudy';
 private apiUrlForHazardsForSelectedCaseStudy = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getHazardsForSpecificCaseStudy';

  constructor(private http:HttpClient, private keycloakToken:KeycloakService) { }

  thekeycloakToken:any =this.keycloakToken.getToken().then(data => console.log(data));
  // header = "Bearer " + this.thekeycloakToken;
  getHazards():Observable<string>{
        return this.http.get(this.apiUrl,{headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'})
  
  }





   getSpecificHazardsForSelectedCaseStudy(theSelectedTitleCase:string):Observable<string>{
  if(theSelectedTitleCase == "CS1_CRETE_ISLAND"){
    theSelectedTitleCase = "CS1";
  }else if(theSelectedTitleCase == "CS2_TRENTINO_REGION"){
    theSelectedTitleCase = "CS2";
  }else if(theSelectedTitleCase == "CS3_NORRBOTTEN_COUNTRY"){
    theSelectedTitleCase = "CS3";
  }else if(theSelectedTitleCase == "CS4_MURCIA_REGION"){
    theSelectedTitleCase = "CS4";
  }else if(theSelectedTitleCase == "CS5_DANUBE_DELTA"){
    theSelectedTitleCase = "CS5";
  }
  return this.http.post(this.apiUrlForHazardsForSelectedCaseStudy,{caseStudyName: theSelectedTitleCase},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }
}
