import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamificationResultsService {

  constructor() { }

  gameResults = {
  budgetRounds: {},
  transportRiskRounds: {},
  waterRiskRounds: {},
  healthRiskRounds: {},
  energyRiskRounds: {},
  cobenefitRounds: {},
};
}
