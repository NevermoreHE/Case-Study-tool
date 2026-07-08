import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataServiceService {
private apiUrlForTempgraphRezValues = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getGamificationRezValuesForTempGraph';



  getTempGraphRezValues(scenaryName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForTempgraphRezValues,{scenaryName:scenaryName},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

//  private apiUrl = 'http://localhost:8080/nevermore-backend/getHazards';
 private apiUrl = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getHazards';

//  private apiUrlForRezValueForChartForSelectedCaseStudy = 'http://localhost:8081/nevermore-backend/getRezVariablesForEcvGraphs';
 private apiUrlForRezValueForChartForSelectedCaseStudy = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getRezVariablesForEcvGraphs';

  // private apiUrlForYearsForChartForSelectedCaseStudy = 'http://localhost:8081/nevermore-backend/getYearsForChosenEcvGraphsAndSelectedCaseStudy';
 private apiUrlForYearsForChartForSelectedCaseStudy = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getYearsForChosenEcvGraphsAndSelectedCaseStudy';


  private apiUrlForEcvVariables = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/nevermore-backend/getEcvVariables';


  private apiUrlForEcvModels = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/nevermore-backend/getModels';


  private apiUrlForEcvScenarios = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/nevermore-backend/getScenarios';

//   private apiUrlForGetGamificationYearsGraph = 'http://localhost:8081/nevermore-backend/getGamificationYearsGraph'
  private apiUrlForGetGamificationYearsGraph = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getGamificationYearsGraph'

//   private apiUrlForGetGamificationRezValuesGraph = 'http://localhost:8081/nevermore-backend/getGamificationRezValuesGraph';
  private apiUrlForGetGamificationRezValuesGraph = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getGamificationRezValuesGraph';

  scenarioName:string ='';

  modelName:string = '';

  variableName:string = '';

  constructor(private http:HttpClient, private keycloakToken:KeycloakService) { }

  thekeycloakToken:any =this.keycloakToken.getToken().then(data => console.log(data));
  ecvCode:string = '';

  

corraRezValue:any = [];
HadGEM3_GC31_LLRezValue:any=[];
EC_Earth3_Veg_LRRezValue:any = [];
MIROC6RezValue:any = [];
CNRM_ESM2_1RezValue:any = [];
CESM2RezValue:any = [];
IPSL_CM6A_LRRezValue:any = [];
NorESM2_MMRezValue:any = [];
ACCESS_CM2RezValue:any = [];


    getYearsForSelectedChartAndCaseStudy(caseStudyId:string,ecvCode:string,scenarioName:string,modelName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForYearsForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:modelName},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

  getcerraRezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'CERRA'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

   getHadGEM3_GC31_LLRezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'HadGEM3-GC31-LL'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

   getEC_Earth3_Veg_LRRezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'EC-Earth3-Veg-LR'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

    getCESM2RRezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'CESM2'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

   getMIROC6RezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'MIROC6'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

   getIPSL_CM6A_LRRezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'IPSL-CM6A-LR'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

   getNorESM2_MMRezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'NorESM2-MM'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

   getCNRM_ESM2_1RezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'CNRM-ESM2-1'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

    getACCESS_CM2RezValue(caseStudyId:string,ecvCode:string,scenarioName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForRezValueForChartForSelectedCaseStudy,{ecvCode:ecvCode,caseStudyName: caseStudyId,scenarioName:scenarioName,modelName:'ACCESS-CM2'},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

 getGamificationYears():Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForGetGamificationYearsGraph,{scenaryName:"baseline"},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }

 getGamificationRezValue(scenaryName:string):Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForGetGamificationRezValuesGraph,{scenaryName:scenaryName},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }


 getGamificationRezValueForBaseline():Observable<string[]>{
    return this.http.post<string[]>(this.apiUrlForGetGamificationRezValuesGraph,{scenaryName:"baseline"},{observe:'body',headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'json'});

 }






  getVariables():Observable<string>{
    return this.http.get(this.apiUrlForEcvVariables,{headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'})
  }

    getModels():Observable<string>{
    return this.http.get(this.apiUrlForEcvModels,{headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'})
  }

    getScenarios():Observable<string>{
    return this.http.get(this.apiUrlForEcvScenarios,{headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'})
  }

}
