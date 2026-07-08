import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamificationMission2Service {

  constructor(private http: HttpClient,private keycloakToken:KeycloakService) { }
  thekeycloakToken = this.keycloakToken.getToken().then(data => console.log(data));

private roundData: any = {};

setRoundData(data: any) {
  this.roundData = data;
}

getRoundData() {
  return this.roundData;
}


 private apiUrlForSectorsAndImpactForGamification2 = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getSectorAndImpactForGameficationMission2';
private apiUrlForCardsData = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getAdaptCardsData';
private apiUrlForCardData = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getAdaptCardData';
private apiUrlForSectorAndImpactForCard = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getSectorAndEffectForGM_ADAPTFor1CardForSpecificId';
private apiUrlForgetCobenAndEffectForGM_ADAPTFor1CardForSpecificId = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getCobenAndEffectForGM_ADAPTFor1CardForSpecificId';


   


   getImpactAndSectorValuesForTool(card_code:string):Observable<string>{
    return this.http.post(this.apiUrlForSectorsAndImpactForGamification2,{card_code:card_code},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }

  getAdaptCardDataFor1Card(card_code:string):Observable<string>{
    return this.http.post(this.apiUrlForCardData,{adapt_card_1:card_code},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }

   getAdaptCardDataFor2Cards(card_code_1:string,card_code_2:string):Observable<string>{
    return this.http.post(this.apiUrlForCardsData,{adapt_card_1:card_code_1,adapt_card_2:card_code_2},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }
 
   getSectorAndImpactDataForCardSpecficId(card_code_1:string):Observable<string>{
    return this.http.post(this.apiUrlForSectorAndImpactForCard,{adapt_card_1_id:card_code_1},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }

    getSectorAndEffectDataForCardSpecficId(card_code_1:string):Observable<string>{
    return this.http.post(this.apiUrlForSectorAndImpactForCard,{adapt_card_1_id:card_code_1},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }

     getCobenAndEffectForGM_ADAPTFor1CardForSpecificId(card_code_1:string):Observable<string>{
    return this.http.post(this.apiUrlForgetCobenAndEffectForGM_ADAPTFor1CardForSpecificId,{adapt_card_1_id:card_code_1},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }

}
