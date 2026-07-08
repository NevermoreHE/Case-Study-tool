import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { DataStorageService } from '../../case-study-tool/titleCase/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

//  private apiUrl = 'http://localhost:8080/nevermore-backend/getSectors';
 private apiUrl = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getSectors';

//  private apiUrlForSpecificCaseStudy = 'http://localhost:8080/nevermore-backend/getSectorsForSpecificCase';
  private apiUrlForSpecificCaseStudy = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getSectorsForSpecificCase';

 private caseStudyId:any = DataStorageService;
//  private apiUrlForChallengesForChosedSector = 'http://localhost:8080/nevermore-backend/getChallengesForChosedSector'
 private apiUrlForChallengesForChosedSector = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getChallengesForChosedSector'


 private apiUrlForRezValueForChartForSelectedCaseStudy = 'http://localhost:8081/nevermore-backend/getRezVariablesForEcvGraphs';

   getRezValuesForChartForSelectedCaseStudy(caseStudyId:string,ecvCode:string,scenarioName:string,modelName:string):Observable<string>{
    return this.http.post(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:modelName},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});

 }

  constructor(private http: HttpClient,private keycloakToken:KeycloakService) { }
  thekeycloakToken = this.keycloakToken.getToken().then(data => console.log(data));


  
 getSectorsForSpecificCaseStudy(theSelectedTitleCase:string):Observable<string>{
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
  return this.http.post(this.apiUrlForSpecificCaseStudy,{caseStudyName: theSelectedTitleCase},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});
 }


 getChallengesForChosedSector(ChosedSector:string):Observable<string>{
    return this.http.post(this.apiUrlForChallengesForChosedSector,{chosedSector: ChosedSector},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});

 }
  getSectors():Observable<string>{
      return this.http.get(this.apiUrl, {headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});

}
}