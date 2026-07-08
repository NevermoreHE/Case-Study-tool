import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamificationMissionsService {

  constructor() { }
  userFinishedMission1:boolean = false;
  setUserProgressMission1(value:boolean):void{
    this.userFinishedMission1 = value;
  }

  getUserProgressMission1():boolean{
    return this.userFinishedMission1;
  }
}
