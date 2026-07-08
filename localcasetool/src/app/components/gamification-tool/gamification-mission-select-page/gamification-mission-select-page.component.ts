import { Component, OnInit } from '@angular/core';
import { GamificationMissionsService } from '../../services/gamificationMissions/gamification-missions.service';

@Component({
  selector: 'app-gamification-mission-select-page',
  templateUrl: './gamification-mission-select-page.component.html',
  styleUrls: ['./gamification-mission-select-page.component.css']
})
export class GamificationMissionSelectPageComponent implements OnInit {


constructor(private userMissionStatus:GamificationMissionsService){}

userMission1Status: boolean = false;

showPopup = true;

popupStep: 1 | 2 = 1;

ngOnInit() {
  this.userMission1Status = this.userMissionStatus.getUserProgressMission1();

  this.showPopup = true;
  this.popupStep = 1;
}

closePopup() {
  if (this.popupStep === 1) {
    this.popupStep = 2;
  } else {
    this.showPopup = false;
  }
}

openPopup() {
  this.showPopup = true;
  this.popupStep = 1;
}


}
