import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyRecommandationsService {

  constructor(private http:HttpClient, private keycloakToken:KeycloakService) { }

  // theSelectedScenario:string = ''

  // setSelectedScenario(selectedScenarioString:string):void{
  //   this.theSelectedScenario = selectedScenarioString;
  // }

  // getSelectedScenario(){
  //   console.log("The Scenario you selected is : ",this.theSelectedScenario);
  //   return this.theSelectedScenario;
  // }


  

  thekeycloakToken:any =this.keycloakToken.getToken().then(data => console.log(data));

  private apiUrlForAssesmentAndStoryLines = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getAsmPolicyScenarios';
  // private apiUrlForAssesmentAndStoryLines = 'http://localhost:8081/nevermore-backend/getAsmPolicyScenarios';

  
  
    getAssesmentAndStoryline(caseStudyID:string):Observable<string[]>{
      return this.http.post<string[]>(this.apiUrlForAssesmentAndStoryLines,{caseStudyID:caseStudyID},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});
   }

   private apiUrlForAppliedPolicies = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getAppliedPolicies';
  // private apiUrlForAppliedPolicies = 'http://localhost:8081/nevermore-backend/getAppliedPolicies';

  
  
    getAppliedPolicies(caseStudyID:string,storyLineCode:string):Observable<string[]>{
      return this.http.post<string[]>(this.apiUrlForAppliedPolicies,{caseStudyID:caseStudyID,storyLineCode:storyLineCode},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});
  
   }

    private apiUrlForIndicators = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getIndicatorForPolicyScenarios';
  // private apiUrlForIndicators = 'http://localhost:8081/nevermore-backend/getIndicatorForPolicyScenarios';

  
  
    getIndicatorsForPolicies(caseStudyID:string,storyLineCode:string):Observable<string[]>{
      return this.http.post<string[]>(this.apiUrlForIndicators,{caseStudyID:caseStudyID,storyLineCode:storyLineCode},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});
   }


   
    private apiUrlForGraphData = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getIndicatorSelectedData';
  // private apiUrlForGraphData = 'http://localhost:8081/nevermore-backend/getIndicatorSelectedData';

  

   getYearAndDataForPoliciesAndLevelsImplemented(indicatorCode:string,caseStudyID:string,storyLineCode:string,scenarioCode:string,lmhCode:string):Observable<string[]>{
      return this.http.post<string[]>(this.apiUrlForGraphData,{indicatorCode:indicatorCode,caseStudyID:caseStudyID,storyLineCode:storyLineCode,scenarioCode:scenarioCode,lmhCode:lmhCode},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});
   }

    private apiUrlForGraphDataBaseline = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getIndicatorSelectedDataBaseline';
  // private apiUrlForGraphDataBaseline = 'http://localhost:8081/nevermore-backend/getIndicatorSelectedDataBaseline';

  
      getYearAndDataForPoliciesAndLevelsImplementedBaseline(indicatorCode:string,caseStudyID:string,storyLineCode:string):Observable<string[]>{
      return this.http.post<string[]>(this.apiUrlForGraphDataBaseline,{indicatorCode:indicatorCode,caseStudyID:caseStudyID,storyLineCode:storyLineCode},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});
   }
   
   selectedScenario : string = '';
  //  setSelectedScenarioCode(theSelectedScenario:string){
  //     this.selectedScenario = theSelectedScenario;
  //  }

  //  getSelectedScenarioCode(){
  //   return this.selectedScenario;
  //  }

   setSelectedScenarioCode(s: string) {
  this.selectedScenario = s;
  localStorage.setItem('selectedScenario', s);
}

getSelectedScenarioCode() {
  return localStorage.getItem('selectedScenario') || this.selectedScenario || 'SSP245';
}

   policyAlternativeLevel:string = '';

   setPolicyAlternatives(thePolicyAlternativeLevel:string){
      this.policyAlternativeLevel = thePolicyAlternativeLevel;
   }

   getPolicyAlternativeLevel(){
    return this.policyAlternativeLevel;
   }

   

}
