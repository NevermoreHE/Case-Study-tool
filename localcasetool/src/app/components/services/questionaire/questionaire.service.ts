import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class QuestionaireService {

//  private apiUrlQuestionAndAnswers = 'http://localhost:8081/nevermore-backend/getQuestionsAndAnswersForGamification';
  private apiUrlQuestionAndAnswers = 'https://nevermore.simavi.ro/api/backend/nevermore-backend/getQuestionsAndAnswersForGamification';


  constructor(private http: HttpClient,private keycloakToken:KeycloakService) { }
  thekeycloakToken = this.keycloakToken.getToken().then(data => console.log(data));


answerList: string[] = [];

getAnswerList(): string[] {
  return this.answerList;
}

setAnswerList(value: string[]): void {
  console.log('Final answer list received in service:', value);
  this.answerList = value;
}

  getQuestionAndAnswersForSpecificQuestion():Observable<string>{
    return this.http.get(this.apiUrlQuestionAndAnswers, {headers:{'Authorization' : 'Bearer ' + this.thekeycloakToken},responseType:'text'});

}
}
