import { Component } from '@angular/core';
import { GamificationMissionsService } from '../../services/gamificationMissions/gamification-missions.service';

@Component({
  selector: 'app-key-definitions',

  templateUrl: './key-definitions.component.html',
  styleUrls: ['./key-definitions.component.css']
})
export class KeyDefinitionsComponent {
  constructor(private userProgress: GamificationMissionsService) {}
 resetToCCgame():any{
    this.userProgress.setUserProgressMission1(false);
  }
}
