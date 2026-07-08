import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicySelectedService {

  constructor() { }

  policySelectedInput:string = '';
  theScenarioResult:string = '';
  thePolicyIndex:number = 0;
  setPolicySelected(policySelected:string,indexOfPolicy:number):void{
    console.log('You have selected the policy: ', policySelected);
    this.policySelectedInput = policySelected;
    this.thePolicyIndex = indexOfPolicy + 1;
  }

  getPolicyIndex(){
    return this.thePolicyIndex;
  }
  

  getPolicySelected():string{
    return this.policySelectedInput;
  }

  setScenario(scenarioResult:string):void{
    console.log('You have selected the policy: ', scenarioResult);
    this.theScenarioResult = scenarioResult;
  }

  getScenarioResult():string{
    return this.theScenarioResult;
  }
}
