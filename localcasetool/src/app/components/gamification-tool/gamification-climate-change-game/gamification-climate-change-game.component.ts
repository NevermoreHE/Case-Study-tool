import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GamificationMission2Service } from '../../services/gamification_mission_2/gamification-mission-2.service';
import { GamificationMissionsService } from '../../services/gamificationMissions/gamification-missions.service';


interface RoundSummary {
  round: string;
  climateCards: any[];
  adaptCards: any[];
  startBudget: number;
  spentBudget: number;
  endBudget: number;
  risks: {
    transport: number;
    water: number;
    health: number;
    energy: number;
  };
  cobenefits: number;
}

@Component({
  selector: 'app-gamification-climate-change-game',
  templateUrl: './gamification-climate-change-game.component.html',
  styleUrls: ['./gamification-climate-change-game.component.css'],
})
export class GamificationClimateChangeGameComponent implements OnInit {
ngOnInit() {
  console.log('Initializing component...');

  this.updateVisibleTools();
  this.updateVisibleAdaptTools();
  this.updateVisibleBonusTools();

  console.log('Component initialized!');
}

 resetToCCgame():any{
    this.userProgress.setUserProgressMission1(false);
  }

  isSelectionLocked: boolean = false;

initialBudget = 60;          // constant for the whole game
remainingBudget = 60;        // changes through rounds
roundStartBudget = 60;       // budget available at the start of current round
projectedRemainingBudget = 60; // op

private computeSpentThisRound(): number {
  const climateCapex = this.selectedClimateCards.reduce(
    (sum, c) => sum + Number(c.capex || 0),
    0
  );
  const adaptCapex = this.selectedAdaptCards.reduce(
    (sum, c) => sum + Number(c.capex || 0),
    0
  );
  return climateCapex + adaptCapex;
}

calculateRemainingBudget(): void {
  const spent = this.computeSpentThisRound();

  // ✅ preview budget clamps at 0
  this.projectedRemainingBudget = Math.max(0, this.roundStartBudget - spent);

  console.log('--- BUDGET SUMMARY ---');
  console.log('Round start budget:', this.roundStartBudget);
  console.log('Spent this round:', spent);
  console.log('Projected remaining:', this.projectedRemainingBudget);
}


toggleSelectionLock(): void {
  if (this.isRoundAlreadyApplied()) {
    console.warn('Round already applied. Go to next round.');
    return;
  }

  if (!this.isSelectionLocked) {
    if (this.roundStartBudget <= 0) {
      this.isSelectionLocked = true;
      console.log('Selection LOCKED (budget is 0, skipping selections)');
      return;
    }

    if (!this.hasValidSelectionForRound()) return;

    this.calculateRemainingBudget();

    const spent = this.computeSpentThisRound();

    
  }

  this.isSelectionLocked = !this.isSelectionLocked;
  console.log(this.isSelectionLocked ? 'Selection LOCKED' : 'Selection UNLOCKED');
}

get canEditCards(): boolean {
  // can edit only if NOT locked and NOT applied
  return !this.isSelectionLocked && !this.isRoundAlreadyApplied();
}


private budgetBroken = false;

visibleTools: { tool: any; realIndex: number }[] = [];

  visibleAdaptTools: any[] = [];
  visibleBonusTools: any[] = [];


updateVisibleTools() {
  const total = this.tools.length;

  const leftIndex = (this.climateCarouselIndex - 1 + total) % total;
  const rightIndex = (this.climateCarouselIndex + 1) % total;
  const nextIndex = (this.climateCarouselIndex + 2) % total;

  this.visibleTools = [
    { tool: this.tools[leftIndex], realIndex: leftIndex },
    { tool: this.tools[this.climateCarouselIndex], realIndex: this.climateCarouselIndex },
    { tool: this.tools[rightIndex], realIndex: rightIndex },
    { tool: this.tools[nextIndex], realIndex: nextIndex },
  ];
}

selectClimateCard(realIndex: number): void {
  if (!this.canEditCards) return;
  if (this.isSelectionLocked) return;

  this.selectedClimateIndex = realIndex;
  this.loadImpactAndSectorData(); 
}


isRoundAlreadyApplied(): boolean {
  return !!this.appliedRounds[this.selected];
}

  healthRisk = 45;
  waterRisk = 40;
  energyRisk = 35;
  transportRisk = 30;
  totalRisk = 38;
  hazard = 10;
  low = 8;
  medium = 12;
  high = 16;
  budget = 60;
  cobenefits = 0;

  roundSummaries: RoundSummary[] = [];
  budgetRounds: Record<string, number> = {};
transportRiskRounds: Record<string, number> = {};
waterRiskRounds: Record<string, number> = {};
healthRiskRounds: Record<string, number> = {};
energyRiskRounds: Record<string, number> = {};
cobenefitRounds: Record<string, number> = {};
totalRiskRounds: Record<string, number> = {};
private appliedRounds: Record<string, boolean> = {};
bonusUsageCount: Record<string, number> = {
  'Citizen engagement': 0,
  'Climate risk communication plan': 0,
  'Coordinated governance': 0, // this one has no "2 rounds" limit in your table, but safe to track
};
private adaptEffectsCache: Record<string, { sector: string; effect: number }[]> = {};
private getBestSectorForFirstAdaptCached(firstCode: string): 'Transport'|'Water'|'Health'|'Energy'|null {
  const effects = this.adaptEffectsCache[firstCode];
  if (!effects?.length) {
    console.log('No cached effects for first adapt measure:', firstCode);
    return null;
  }

  // Your effects look like negatives for "risk reduction" (ex: -10).
  // "higher reduction" => most negative effect (min).
  let best = effects[0];
  for (const e of effects) {
    if (e.effect < best.effect) best = e;
  }

  // ensure only allowed sectors
  if (best.sector === 'Transport' || best.sector === 'Water' || best.sector === 'Health' || best.sector === 'Energy') {
    return best.sector;
  }
  return null;
}

baseBudget = 60;


climateCarouselIndex: number = 1;   
selectedClimateIndex: number | null = null; 

selectedClimateCards: any[] = [];
selectedAdaptCards: any[] = [];



  imageOpacity: number = 0.5;
  visableToolNameSalected: string = '';
  adaptationMeasureSelected: string = '';
  bonusSelected: string = '';
selectedBonusTool(toolName: string) {
  if (!this.canEditCards) return;
  this.bonusSelected = toolName;
}

  selectedTemperature: string = '';
  selectTemp() {}
  constructor(
    private router: Router,
    private impactAndSector: GamificationMission2Service,
    private userProgress:GamificationMissionsService
  ) {}

  showPopup = true;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  isPopupVisibleAbove: boolean = false;
  isPopupVisibleRight: boolean = false;

  togglePopup(position: string): void {
    if (position === 'above') {
      this.isPopupVisibleAbove = !this.isPopupVisibleAbove;
    } else if (position === 'right') {
      this.isPopupVisibleRight = !this.isPopupVisibleRight;
      console.log('hi');
    }
  }

  inputSelected: string = '';
  execute_button: boolean = true;

  @Input() selected: string = 'Round 1: 2030';
  @Output() selectedChange = new EventEmitter<string>();

select(value: string) {
  // ❌ hard block: user cannot jump rounds by clicking tabs
  console.warn('Round tabs are disabled. Use Previous/Next buttons.');
  return;
}

private updateBudgetCoins(): void {
  const roundIndex = this.getCurrentRoundIndex();
  const rowStart = roundIndex * 4;
  const rowEnd = rowStart + 4;

  for (let i = rowStart; i < rowEnd; i++) {
    this.budgetCoins[i].coinOpacity = 0.5;
  }

  const used = this.baseBudget - this.remainingBudget;

  let active = 1;
  if (used >= 16 && used <= 30) active = 2;
  else if (used >= 31 && used <= 45) active = 3;
  else if (used > 45) active = 4;

  for (let i = 0; i < active; i++) {
    this.budgetCoins[rowStart + i].coinOpacity = 1;
  }
}

selectedAdaptationOrder: number[] = []; 

  nextRoundButton() {
  // DON'T reset budget here
  this.selectedClimateCards = [];
  this.selectedAdaptCards = [];
  this.cobenefits = 0;

  this.adaptTransportRisk = this.transportRisk;
  this.adaptWaterRisk = this.waterRisk;
  this.adaptHealthRisk = this.healthRisk;
  this.adaptEnergyRisk = this.energyRisk;

  this.transportCoins.forEach(c => (c.coinOpacity = 0.5));
  this.waterCoins.forEach(c => (c.coinOpacity = 0.5));
  this.healthCoints.forEach(c => (c.coinOpacity = 0.5));
  this.energyCoints.forEach(c => (c.coinOpacity = 0.5));
  this.cobenefitCoins.forEach(c => (c.coinOpacity = 0.5));

  this.isSelectionLocked = false;

  // Move round
  if (this.selected == 'Round 1: 2030') this.selected = 'Round 2: 2040';
  else if (this.selected == 'Round 2: 2040') this.selected = 'Round 3: 2050';
  else if (this.selected == 'Round 3: 2050') this.selected = 'Round 4: 2060';

  // New round starts with whatever is left
  this.roundStartBudget = this.remainingBudget;
  this.projectedRemainingBudget = this.remainingBudget;
}

  isFinalRound(): boolean {
  return this.selected === 'Round 4: 2060';
}

resetGame(): void {
  this.budgetBroken = false;

  console.log('🔁 Resetting entire game');

  this.selected = 'Round 1: 2030';
  this.roundSummaries = [];
this.selectedAdaptationOrder = [];

  this.remainingBudget = this.initialBudget;
  this.roundStartBudget = this.initialBudget;
  this.projectedRemainingBudget = this.initialBudget;

  this.resetRoundState();

  [
    this.transportCoins,
    this.waterCoins,
    this.healthCoints,
    this.energyCoints,
    this.cobenefitCoins,
    this.budgetCoins,
    this.totalriskCoins,
  ].forEach(row => row.forEach(c => (c.coinOpacity = 0.5)));

  console.log('Game reset complete');
  this.budgetRounds = {};
this.transportRiskRounds = {};
this.waterRiskRounds = {};
this.healthRiskRounds = {};
this.energyRiskRounds = {};
this.cobenefitRounds = {};
this.totalRiskRounds = {};
this.bonusUsageCount = {
  'Citizen engagement': 0,
  'Climate risk communication plan': 0,
  'Coordinated governance': 0,
};



this.impactAndSector.setRoundData({
  budgetRounds: {},
  transportRiskRounds: {},
  waterRiskRounds: {},
  healthRiskRounds: {},
  energyRiskRounds: {},
  cobenefitRounds: {},
   totalRiskRounds: {},
   
});

this.appliedRounds = {};
}




get canGoNext(): boolean {
  return this.isCurrentRoundApplied();
}

get canViewResults(): boolean {
  return this.allRounds.every(r => !!this.appliedRounds[r]);
}


  firstOpexDeltaThisRound = 0;
  private applyBonusRules(): void {
  const bonus = this.bonusSelected?.trim();
  if (!bonus) return;

  // helper
  const useBonus = (name: string, maxUses?: number): boolean => {
    const used = this.bonusUsageCount[name] ?? 0;
    if (maxUses !== undefined && used >= maxUses) {
      console.log(`${name} already used ${used} times (max ${maxUses}). Ignored.`);
      return false;
    }
    this.bonusUsageCount[name] = used + 1;
    return true;
  };

  const climateCode: string | undefined = this.selectedClimateCards?.[0]?.code;

  // -----------------------
  // Citizen engagement
  // first OPEX of round decreases by 0.3M
  // only applicable in two rounds
  // -----------------------
  if (bonus === 'Citizen engagement') {
    if (!useBonus('Citizen engagement', 2)) return;
    this.firstOpexDeltaThisRound -= 0.3;
    console.log('BONUS Citizen engagement: first OPEX -0.3M');
  }

  // -----------------------
  // Climate risk communication plan
  // invalidates NEGATIVE_PUBLIC effects
  // if NEGATIVE_PUBLIC not applied -> first OPEX -0.3M
  // only applicable in two rounds
  // -----------------------
  if (bonus === 'Climate risk communication plan') {
    if (!useBonus('Climate risk communication plan', 2)) return;

    if (climateCode !== 'NEGATIVE_PUBLIC') {
      this.firstOpexDeltaThisRound -= 0.3;
      console.log('BONUS Climate comm plan: first OPEX -0.3M (since NEGATIVE_PUBLIC not played)');
    } else {
      console.log('BONUS Climate comm plan: NEGATIVE_PUBLIC invalidated');
    }
  }

  // -----------------------
  // Coordinated governance
  // first measure selected: "reduction increase of two units in the sector with higher reduction"
  // meaning: for the FIRST selected adaptation measure,
  // apply extra -2 to the sector where that measure reduces the most.
  // -----------------------
  if (bonus === 'Coordinated governance') {
    if (!useBonus('Coordinated governance')) return;

    const firstCode = this.getFirstSelectedAdaptCode();
    if (!firstCode) {
      console.log('Coordinated governance: no first adaptation selected, ignored.');
      return;
    }

    // We approximate "sector with higher reduction" using the effects of the first measure:
    // If you have cached the first card's sector effects -> use them.
    // If not cached, we apply a simple safe fallback (choose the sector with currently lowest risk improvement).
    // BEST: cache effects (see section 4 below).

    const sectorToBoost = this.getBestSectorForFirstAdaptCached(firstCode);
    if (!sectorToBoost) return;

    if (sectorToBoost === 'Transport') this.adaptTransportRisk -= 2;
    if (sectorToBoost === 'Water') this.adaptWaterRisk -= 2;
    if (sectorToBoost === 'Health') this.adaptHealthRisk -= 2;
    if (sectorToBoost === 'Energy') this.adaptEnergyRisk -= 2;

    console.log(`BONUS Coordinated governance: extra -2 applied to ${sectorToBoost}`);
  }
}

  tools = [
    {
      name: 'Heatwave',
      image: '/assets/images/heatwave-icon.png',
      description:
        'If "Climate shelters and heat management Plans" is applied, the effect is reduced in 4 units for Health (+2 instead of +6). If "Green urban areas" is applied, the effect is reduced in 2 units for Health (+4 instead of +6).				',
      code: 'HEATWAVE',
    },
    {
      name: 'Draught',
      image: '/assets/images/draught_card.png',
      description:
        'If "Water reuse and harvesting" is activated, the value is +4 instead of +7				',
      code: 'DROUGHT',
    },
    {
      name: 'Coastal Event',
      image: '/assets/images/coastal-card.png',
      description:
        'If "Mixed coastal protection" is activated, the value is +2 instead of +6				',
      code: 'COASTAL_EVENT',
    },
    {
      name: 'Energy Blackout',
      image: '/assets/images/energy-synergy-card.png',
      description:
        'If "Microgrids and critical backup power" is activated, the first application in Energy is 0. If "Energy retrofitting of buildings" is applied, the effect is reduced in 2 units for Energy (+4 instead of +6). 				',
      code: 'ENERGY_BLACKOUT',
    },
    {
      name: 'Extreme Precipitation',
      image: '/assets/images/extreme-precipitation.png',
      description:
        'If "Wetlands and sustainable drainage" is applied, the effect is reduced in 3 units for both affected sectors (Transport is +2 and Water +0)				',
      code: 'EXTREME_PRECIPITATION',
    },
    {
      name: 'Negative Public Perception',
      image: '/assets/images/negative-public-perception.png',
      description:
        'If this is applied, the first OPEX is increased in 0,3M. If "Climate shelters and heat management Plans" is the first measure, the effect is not applicable				',
      code: 'NEGATIVE_PUBLIC',
    },
    {
      name: 'Urban Heat Island',
      image: '/assets/images/urban-heat-island.png',
      description:
        'If "Energy retrofitting of buildings" is applied, the effect is reduced in 2 units for Energy (+2 instead of +4). If "Green urban areas" is applied, the effect is reduced in 2 unit for Health (+2 instead of +4).				',
      code: 'URBAN_HEAT',
    },
    {
      name: 'Wildfires',
      image: '/assets/images/wildfires.png',
      description:
        'If "Climate shelters and heat management Plans" is applied, the effect is reduced in 3 units for Health (+4 instead of +7). If "Early warning systems" is applied, the effect is reduced in 2 unit for Health (+5 instead of +7). 				',
      code: 'WILDFIRES',
    },
  ];

loadImpactAndSectorData(): void {
  if (this.selectedClimateIndex === null) return; 

  const selectedTool = this.tools[this.selectedClimateIndex];
  const selectedToolCode = selectedTool.code;

  this.selectedClimateCards = [selectedTool];

  this.impactAndSector
    .getImpactAndSectorValuesForTool(selectedToolCode)
    .subscribe((data) => {
      this.ImpactAndSectorForSelectedToolList = JSON.parse(data);
    });
}

  selectedToolIndex: number = 1;
  private previousSelectedToolName: string = '';
  private previousSelectedToolCode: string = '';
  ImpactAndSectorForSelectedToolList: any[] = [];
  getVisibleTools(): any[] {
    const total = this.tools.length;

    const leftIndex = (this.selectedToolIndex - 1 + total) % total;
    const rightIndex = (this.selectedToolIndex + 1) % total;
    const nextIndex = (this.selectedToolIndex + 2) % total;

    const selectedToolName = this.tools[this.selectedToolIndex].name;
    const selectedToolCode = this.tools[this.selectedToolIndex].code;
    if (
      selectedToolName !== this.previousSelectedToolName &&
      selectedToolCode !== this.previousSelectedToolCode
    ) {
      this.previousSelectedToolName = selectedToolName;
      this.previousSelectedToolCode = selectedToolCode;
      console.log(
        'You have selected the visible tool named: ',
        selectedToolName
      );

      console.log(
        'You have selected the visible tool named: ',
        selectedToolCode
      );
    }

    return [
      this.tools[leftIndex],
      this.tools[this.selectedToolIndex],
      this.tools[rightIndex],
      this.tools[nextIndex],
    ];
  }

  getSpecificToolInfo(): any {
    return this.tools[this.selectedToolIndex];
  }

 navigateLeft() {
  if (!this.canEditCards) return;
  if (this.isSelectionLocked) return;

  this.climateCarouselIndex =
    (this.climateCarouselIndex - 1 + this.tools.length) % this.tools.length;

  this.updateVisibleTools();
}

navigateRight() {
  if (!this.canEditCards) return;
  if (this.isSelectionLocked) return;

  this.climateCarouselIndex =
    (this.climateCarouselIndex + 1) % this.tools.length;

  this.updateVisibleTools();
}

  toolsForAdapt = [
    
    {
      code: 'WETLANDS_SUSTAINABLE',
      name: 'Wetlands & sustainable drainage',
      image: '/assets/images/wetlands-icon.png',
      description:
        'If "Mixed coastal protection" is activated, +3 additional points for Transport',
    },
    {
      code: 'MIXED_COASTAL',
      name: 'Mixed coastal protection',
      image: '/assets/images/mixed-costal.png',
      description:
        'If "Coastal event", the effects on transpor are reduced in 4 units',
    },
    {
      code: 'COOL_MOBILITY',
      name: 'Cool mobility & shading',
      image: '/assets/images/cool-mobility.png',
      description:
        'If "Green urban areas" is activated, +2 additional points for Transport',
    },
    {
      code: 'ENERGY_RETROFITTING',
      name: 'Energy retrofitting of buildings',
      image: '/assets/images/energy-retrofitting.png',
      description:
        'If "Green urban areas" is activated, +2 additional points for Health',
    },
    {
      code: 'GREEN_URBAN',
      name: 'Green urban areas',
      image: '/assets/images/urban-areas.png',
      description:
        'If "Cool mobility and shading" is activated, +2 additional points for Transport',
    },
    {
      code: 'CLIMATE_SHELTERS',
      name: 'Climate shelters & heat management plans',
      image: '/assets/images/climate-shares.png',
      description:
        'It has no lag (is applied since the application); If “Early warning systems” is activated, +2 additional points for Health',
    },
    {
      code: 'EARLY_WARNING',
      name: 'Early warning systems',
      image: '/assets/images/early-warnings.png',
      description:
        'If this measures is applied, it improve other measures with +2 additional points in the better sector',
    },
    {
      code: 'WATER_EFFICIENCY',
      name: 'Water efficiency',
      image: '/assets/images/water-scarcity.png',
      description:
        'If "Water reuse and harvesting" is activated, +3 additional points for Water',
    },
    {
      code: 'WATER_REUSE',
      name: 'Water reuse & harvesting',
      image: '/assets/images/water-reuse.png',
      description:
        'If climate event is "Drought", the impact on Water is multiplied by 0,5',
    },
    {
      code: 'MICROGRIDS_CRITICAL',
      name: 'Microgrids & critical backup power',
      image: '/assets/images/microgrids.png',
      description:
        'If is activated, the first event that affect Energy has 0 impact on Energy',
    },
  ];





  selectedToolIndexForAdapt: number = 1;
  private previousAdaptationToolName: string = '';
  selectedAdaptationTools: Set<number> = new Set();

  updateVisibleAdaptTools() {
    const total = this.toolsForAdapt.length;

    const leftIndex = (this.selectedToolIndexForAdapt - 1 + total) % total;
    const rightIndex = (this.selectedToolIndexForAdapt + 1) % total;
    const nextIndex = (this.selectedToolIndexForAdapt + 2) % total;

    this.visibleAdaptTools = [
      { tool: this.toolsForAdapt[leftIndex], realIndex: leftIndex },
      {
        tool: this.toolsForAdapt[this.selectedToolIndexForAdapt],
        realIndex: this.selectedToolIndexForAdapt,
      },
      { tool: this.toolsForAdapt[rightIndex], realIndex: rightIndex },
      { tool: this.toolsForAdapt[nextIndex], realIndex: nextIndex },
    ];
  }
  adaptCard1LDataList: any[] = [];
  adaptCard2LDataList: any[] = [];
  adaptCardSectorAndImpactData: any[] = [];
  adaptCardsSectorAndImpactData: any[] = [];
  roundBuget1Card: number = 0;
  roundBudget2Cards: number = 0;
  sectorAndEffectDataList: any[] = [];
  adaptCardEffectSum: number = 0;

  adaptCardEffectSum1: number = 0;
  adaptCardEffectSum2: number = 0;

  adaptTransportRisk: number = 0;
  adaptWaterRisk: number = 0;
  adaptHealthRisk: number = 0;
  adaptEnergyRisk: number = 0;

  effectsLoaded: number = 0;
  budgetLoadedForAdapt: number = 0;
  budgetLoadedForAdaptForCard1: number = 0;
  budgetLoadedForAdaptForCard2: number = 0;

  cobenefitsFromAdapt: number = 0;
  cobenefitsFromAdaptList: any[] = [];
  cobenFitsFromAdaptCard1:number = 0;
  cobenFitsFromAdaptCard2:number = 0;
  cobenefitsCardCounter:number = 0;


private clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// KPI clamps from your table
private clampRisk(v: number): number {
  return this.clamp(v, 15, 90);  // risks: min 15, max 90
}

private clampCobenefits(v: number): number {
  return this.clamp(v, 0, 60);   // cobenefits: min 0, max 60
}

private clampTotalRisk(v: number): number {
  return this.clamp(v, 0, 40);   // total risk: min 0, max 40
}


logSelectedTools(): void {
  const selected = [...this.selectedAdaptationTools].map(
    (i) => this.toolsForAdapt[i].code
  );
  console.log('Selected length:', selected.length);
  console.log('Selected tools:', selected);

  if (selected.length === 1) {
    this.impactAndSector
      .getAdaptCardDataFor1Card(selected[0])
      .subscribe((data) => {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        this.adaptCard1LDataList = parsedData;

        if (!this.adaptCard1LDataList || this.adaptCard1LDataList.length === 0) {
  console.warn('No adapt card data returned for:', selected[0]);
  this.selectedAdaptCards = [];
  return;
}

this.selectedAdaptCards = this.adaptCard1LDataList;
console.log('ID:', this.adaptCard1LDataList[0].id);

console.log(
  'Selected adapt card:',
  selected[0] ?? 'N/A',
  'ID:',
  this.adaptCard1LDataList[0].id,
  'capex:',
  this.adaptCard1LDataList[0].capex
);

        console.log(
  'Selected card ID:',
  this.adaptCard1LDataList[0]?.id
);

        this.roundBuget1Card = Number(this.adaptCard1LDataList[0].capex);

        this.impactAndSector
          .getCobenAndEffectForGM_ADAPTFor1CardForSpecificId(
            this.adaptCard1LDataList[0].id
          )
          .subscribe((data) => {
            const parsedData =
              typeof data === 'string' ? JSON.parse(data) : data;
            this.cobenefitsFromAdaptList = parsedData;
            this.cobenefitsFromAdapt = this.cobenefits;

            if (this.cobenefitsFromAdaptList.length == 1) {
              this.cobenefitsFromAdapt =
                this.cobenefits +
                Number(this.cobenefitsFromAdaptList[0].effect);
            } else if (this.cobenefitsFromAdaptList.length > 1) {
              this.cobenefitsFromAdapt = this.cobenefits;
              for (let i = 0; i < this.cobenefitsFromAdaptList.length; i++) {
                this.cobenefitsFromAdapt +=
                  Number(this.cobenefitsFromAdaptList[i].effect);
              }
            }
            this.cobenefits = this.cobenefitsFromAdapt;   
            this.updateCobenefitCoins();                 
            console.log(' cobenefits now =', this.cobenefits);
          });

        this.impactAndSector
          .getSectorAndEffectDataForCardSpecficId(
            this.adaptCard1LDataList[0].id
          )
          .subscribe((data) => {
            const parsedData =
              typeof data === 'string' ? JSON.parse(data) : data;
            this.sectorAndEffectDataList = parsedData;

            const codeKey = selected[0];
this.adaptEffectsCache[codeKey] = parsedData.map((x: any) => ({
  sector: x.sector,
  effect: Number(x.effect),
}));

            this.adaptTransportRisk = this.transportRisk;
            this.adaptWaterRisk = this.waterRisk;
            this.adaptHealthRisk = this.healthRisk;
            this.adaptEnergyRisk = this.energyRisk;

            this.adaptCardEffectSum = 0;
            for (let i = 0; i < this.sectorAndEffectDataList.length; i++) {
              const effect = Number(this.sectorAndEffectDataList[i].effect);
              this.adaptCardEffectSum += effect;

              if (this.sectorAndEffectDataList[i].sector === 'Transport')
                this.adaptTransportRisk += effect;
              else if (this.sectorAndEffectDataList[i].sector === 'Water')
                this.adaptWaterRisk += effect;
              else if (this.sectorAndEffectDataList[i].sector === 'Health')
                this.adaptHealthRisk += effect;
              else if (this.sectorAndEffectDataList[i].sector === 'Energy')
                this.adaptEnergyRisk += effect;
            }
          });
      });
  }

  else if (selected.length === 2) {
    this.adaptTransportRisk = this.transportRisk;
    this.adaptWaterRisk = this.waterRisk;
    this.adaptHealthRisk = this.healthRisk;
    this.adaptEnergyRisk = this.energyRisk;

    this.impactAndSector
      .getAdaptCardDataFor2Cards(selected[0], selected[1])
      .subscribe((data) => {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        this.adaptCard2LDataList = parsedData;

if (!this.adaptCard2LDataList || this.adaptCard2LDataList.length < 2) {
  console.warn('No adapt 2-cards data returned for:', selected);
  this.selectedAdaptCards = [];
  return;
}

this.selectedAdaptCards = this.adaptCard2LDataList;

this.adaptCard2LDataList.forEach((card, i) => {
  console.log(
    `Selected adapt card ${i + 1}:`,
    selected[i] ?? 'N/A',
    'ID:',
    card.id,
    'capex:',
    card.capex
  );
});

console.log(
  'Selected card IDs:',
  this.adaptCard2LDataList[0]?.id,
  this.adaptCard2LDataList[1]?.id
);

        this.roundBudget2Cards =
          Number(this.adaptCard2LDataList[0].capex) +
          Number(this.adaptCard2LDataList[1].capex);

this.cobenFitsFromAdaptCard1 = 0;
this.cobenFitsFromAdaptCard2 = 0;
this.cobenefitsCardCounter = 0;

this.impactAndSector
  .getCobenAndEffectForGM_ADAPTFor1CardForSpecificId(
    this.adaptCard2LDataList[0].id
  )
  .subscribe((data) => {
    const parsed =
      typeof data === 'string' ? JSON.parse(data) : data;
    this.cobenefitsFromAdaptList = parsed;

    this.cobenFitsFromAdaptCard1 = 0;

    if (this.cobenefitsFromAdaptList.length === 1) {
      this.cobenFitsFromAdaptCard1 +=
        Number(this.cobenefitsFromAdaptList[0].effect);
    } else {
      for (let i = 0; i < this.cobenefitsFromAdaptList.length; i++) {
        this.cobenFitsFromAdaptCard1 +=
          Number(this.cobenefitsFromAdaptList[i].effect);
      }
    }

    this.cobenefitsCardCounter++;
    if (this.cobenefitsCardCounter === 2) {
      this.cobenefits =
        this.cobenFitsFromAdaptCard1 + this.cobenFitsFromAdaptCard2;

      this.updateCobenefitCoins(); //  refresh UI
      console.log(' Final cobenefits:', this.cobenefits);

      this.cobenefitsCardCounter = 0;
    }
  });

this.impactAndSector
  .getCobenAndEffectForGM_ADAPTFor1CardForSpecificId(
    this.adaptCard2LDataList[1].id
  )
  .subscribe((data) => {
    const parsed =
      typeof data === 'string' ? JSON.parse(data) : data;
    this.cobenefitsFromAdaptList = parsed;

    this.cobenFitsFromAdaptCard2 = 0;

    if (this.cobenefitsFromAdaptList.length === 1) {
      this.cobenFitsFromAdaptCard2 +=
        Number(this.cobenefitsFromAdaptList[0].effect);
    } else {
      for (let i = 0; i < this.cobenefitsFromAdaptList.length; i++) {
        this.cobenFitsFromAdaptCard2 +=
          Number(this.cobenefitsFromAdaptList[i].effect);
      }
    }

    this.cobenefitsCardCounter++;
    if (this.cobenefitsCardCounter === 2) {
      this.cobenefits =
        this.cobenFitsFromAdaptCard1 + this.cobenFitsFromAdaptCard2;

      this.updateCobenefitCoins(); 
      console.log(' Final cobenefits:', this.cobenefits);

      this.cobenefitsCardCounter = 0;
    }
  });

        const applyEffects = (effects: any[]) => {
          effects.forEach((e) => {
            const val = Number(e.effect);
            if (e.sector === 'Transport') this.adaptTransportRisk += val;
            else if (e.sector === 'Water') this.adaptWaterRisk += val;
            else if (e.sector === 'Health') this.adaptHealthRisk += val;
            else if (e.sector === 'Energy') this.adaptEnergyRisk += val;
          });
        };

        const firstCode = selected[0];
this.impactAndSector
  .getSectorAndEffectDataForCardSpecficId(this.adaptCard2LDataList[0].id)
  .subscribe((data) => {
    const effects = typeof data === 'string' ? JSON.parse(data) : data;

    this.adaptEffectsCache[firstCode] = effects.map((x: any) => ({
      sector: x.sector,
      effect: Number(x.effect),
    }));

    applyEffects(effects);
  });

const secondCode = selected[1];
this.impactAndSector
  .getSectorAndEffectDataForCardSpecficId(this.adaptCard2LDataList[1].id)
  .subscribe((data) => {
    const effects = typeof data === 'string' ? JSON.parse(data) : data;


    this.adaptEffectsCache[secondCode] = effects.map((x: any) => ({
      sector: x.sector,
      effect: Number(x.effect),
    }));

    applyEffects(effects);
  });

        
      });
  } else {
    console.log('No card selected or too many cards selected.');
  }
}

private hasValidSelectionForRound(): boolean {
  // ✅ If no budget left, allow user to continue without selecting cards
  if (this.roundStartBudget <= 0) return true;

  const hasClimate = this.selectedClimateCards?.length > 0;
  const hasAdapt = this.selectedAdaptCards?.length > 0;

  if (!hasClimate) console.warn('Select a climate card first.');
  if (!hasAdapt) console.warn('Select at least 1 adaptation card.');

  return hasClimate && hasAdapt;
}


  toggleSelection(index: number): void {
     if (!this.canEditCards) return;
  if (this.isSelectionLocked) return;

  if (this.selectedAdaptationTools.has(index)) {
    this.selectedAdaptationTools.delete(index);
    this.selectedAdaptationOrder = this.selectedAdaptationOrder.filter(i => i !== index);
  } else {
    if (this.selectedAdaptationTools.size < 2) {
      this.selectedAdaptationTools.add(index);
      this.selectedAdaptationOrder.push(index); 
    } else {
      console.log('You can only select up to 2 cards.');
    }
  }

  this.logSelectedTools();
}

private getFirstSelectedAdaptCode(): string | null {
  const firstIndex = this.selectedAdaptationOrder[0];
  if (firstIndex === undefined) return null;
  return this.toolsForAdapt[firstIndex]?.code ?? null;
}


  isSelected(index: number): boolean {
    return this.selectedAdaptationTools.has(index);
  }

  getAdaptationMeasureInfo(): any {
    return this.toolsForAdapt[this.selectedToolIndexForAdapt];
  }
  navigateLeftForAdapt(): void {
      if (!this.canEditCards) return;

    this.selectedToolIndexForAdapt =
      (this.selectedToolIndexForAdapt - 1 + this.toolsForAdapt.length) %
      this.toolsForAdapt.length;

    this.updateVisibleAdaptTools();
  }

  navigateRightForAdapt(): void {
      if (!this.canEditCards) return;

    
    this.selectedToolIndexForAdapt =
      (this.selectedToolIndexForAdapt + 1) % this.toolsForAdapt.length;

    this.updateVisibleAdaptTools();
  }
  selectToolForAdapt(): void {
    const selectedTool = this.toolsForAdapt[this.selectedToolIndexForAdapt];

    switch (selectedTool.name) {
      case 'GAMIFICATION_TOOL_TITLE':
        this.router.navigate(['/climateChangeGame']);
        break;
      case 'CATALOGUE_EXPLORER_TITLE':
        this.router.navigate(['/catalogueExplorer']);
        break;
      case 'EU_SCALE_TOOL_TITLE':
        this.router.navigate(['/euScale']);
        break;
      case 'CASE_STUDY_TOOL_TITLE':
        this.router.navigate(['/caseStudyToolInfo']);
        break;
      default:
        console.log('No route found for this tool');
        break;
    }
  }

  toolsForBonus = [
    {
      name: 'Citizen engagement',
      image: '/assets/images/citizens-engagement.png',
      description:
        'If this card is applied, the first OPEX of the round (for the first selected measure) decrease in 0,3M. This card is only applicable in two rounds.						',
    },
    {
      name: 'Coordinated governance',
      image: '/assets/images/coordinated-governance.png',
      description:
        'The firt measure selected in the round in which the card is applied obtain a reduction increase of two units in the sector with higher reduction						',
    },
    {
      name: 'Climate risk communication plan',
      image: '/assets/images/climate-risk-comunications-plan.png',
      description:
        'This card invalidates "Negative public perception" effects. If "Negative public perception" is not applied, the first OPEX of the round (for the first selected measure) decrease in 0,3M. This card is only applicable in two rounds.						',
    },
  ];

  selectedToolIndexForBonus: number = 1;
  updateVisibleBonusTools() {
  if (!this.canEditCards) return;

     if (this.isSelectionLocked) {
    console.log('Selection is locked. Unlock to change cards.');
    return;
  }
    const total = this.toolsForBonus.length;

    const leftIndex = (this.selectedToolIndexForBonus - 1 + total) % total;
    const rightIndex = (this.selectedToolIndexForBonus + 1) % total;

    this.visibleBonusTools = [
      this.toolsForBonus[leftIndex],
      this.toolsForBonus[this.selectedToolIndexForBonus],
      this.toolsForBonus[rightIndex],
    ];
  }
  getAdaptationMeasureBonus(): any {
     if (this.isSelectionLocked) {
    console.log('Selection is locked. Unlock to change cards.');
    return;
  }
    return this.toolsForBonus[this.selectedToolIndexForBonus];
  }

  navigateLeftForBonus(): void {
  if (!this.canEditCards) return;

       if (this.isSelectionLocked) {
    console.log('Selection is locked. Unlock to change cards.');
    return;
  }
    this.selectedToolIndexForBonus =
      (this.selectedToolIndexForBonus - 1 + this.toolsForBonus.length) %
      this.toolsForBonus.length;

    this.updateVisibleBonusTools();
  }

  navigateRightForBonus(): void {
  if (!this.canEditCards) return;

       if (this.isSelectionLocked) {
    console.log('Selection is locked. Unlock to change cards.');
    return;
  }
    this.selectedToolIndexForBonus =
      (this.selectedToolIndexForBonus + 1) % this.toolsForBonus.length;

    this.updateVisibleBonusTools();
  }
  selectToolForBonus(): void {

   if (this.isSelectionLocked) {
    console.log('Selection is locked. Unlock to change cards.');
    return;
  }

    const selectedTool = this.toolsForBonus[this.selectedToolIndexForBonus];

    switch (selectedTool.name) {
      case 'GAMIFICATION_TOOL_TITLE':
        this.router.navigate(['/climateChangeGame']);
        break;
      case 'CATALOGUE_EXPLORER_TITLE':
        this.router.navigate(['/catalogueExplorer']);
        break;
      case 'EU_SCALE_TOOL_TITLE':
        this.router.navigate(['/euScale']);
        break;
      case 'CASE_STUDY_TOOL_TITLE':
        this.router.navigate(['/caseStudyToolInfo']);
        break;
      default:
        console.log('No route found for this tool');
        break;
    }
  }

  hazardCOins = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 1 },
    { coinIndex: 3, coinOpacity: 0.5 },
  ];
  budgetCoins = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 0.5 },
    { coinIndex: 3, coinOpacity: 0.5 },
    { coinIndex: 4, coinOpacity: 0.5 },
    { coinIndex: 5, coinOpacity: 0.5 },
    { coinIndex: 6, coinOpacity: 0.5 },
    { coinIndex: 7, coinOpacity: 0.5 },
    { coinIndex: 8, coinOpacity: 0.5 },
    { coinIndex: 9, coinOpacity: 0.5 },
    { coinIndex: 10, coinOpacity: 0.5 },
    { coinIndex: 11, coinOpacity: 0.5 },
    { coinIndex: 12, coinOpacity: 0.5 },
    { coinIndex: 13, coinOpacity: 0.5 },
    { coinIndex: 14, coinOpacity: 0.5 },
    { coinIndex: 15, coinOpacity: 0.5 },
    { coinIndex: 16, coinOpacity: 0.5 },
  ];
  waterCoins = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 0.5 },
    { coinIndex: 3, coinOpacity: 0.5 },
    { coinIndex: 4, coinOpacity: 0.5 },
    { coinIndex: 5, coinOpacity: 0.5 },
    { coinIndex: 6, coinOpacity: 0.5 },
    { coinIndex: 7, coinOpacity: 0.5 },
    { coinIndex: 8, coinOpacity: 0.5 },
    { coinIndex: 9, coinOpacity: 0.5 },
    { coinIndex: 10, coinOpacity: 0.5 },
    { coinIndex: 11, coinOpacity: 0.5 },
    { coinIndex: 12, coinOpacity: 0.5 },
    { coinIndex: 13, coinOpacity: 0.5 },
    { coinIndex: 14, coinOpacity: 0.5 },
    { coinIndex: 15, coinOpacity: 0.5 },
    { coinIndex: 16, coinOpacity: 0.5 },
  ];
  energyCoints = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 0.5 },
    { coinIndex: 3, coinOpacity: 0.5 },
    { coinIndex: 4, coinOpacity: 0.5 },
    { coinIndex: 5, coinOpacity: 0.5 },
    { coinIndex: 6, coinOpacity: 0.5 },
    { coinIndex: 7, coinOpacity: 0.5 },
    { coinIndex: 8, coinOpacity: 0.5 },
    { coinIndex: 9, coinOpacity: 0.5 },
    { coinIndex: 10, coinOpacity: 0.5 },
    { coinIndex: 11, coinOpacity: 0.5 },
    { coinIndex: 12, coinOpacity: 0.5 },
    { coinIndex: 13, coinOpacity: 0.5 },
    { coinIndex: 14, coinOpacity: 0.5 },
    { coinIndex: 15, coinOpacity: 0.5 },
    { coinIndex: 16, coinOpacity: 0.5 },
  ];
  healthCoints = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 0.5 },
    { coinIndex: 3, coinOpacity: 0.5 },
    { coinIndex: 4, coinOpacity: 0.5 },
    { coinIndex: 5, coinOpacity: 0.5 },
    { coinIndex: 6, coinOpacity: 0.5 },
    { coinIndex: 7, coinOpacity: 0.5 },
    { coinIndex: 8, coinOpacity: 0.5 },
    { coinIndex: 9, coinOpacity: 0.5 },
    { coinIndex: 10, coinOpacity: 0.5 },
    { coinIndex: 11, coinOpacity: 0.5 },
    { coinIndex: 12, coinOpacity: 0.5 },
    { coinIndex: 13, coinOpacity: 0.5 },
    { coinIndex: 14, coinOpacity: 0.5 },
    { coinIndex: 15, coinOpacity: 0.5 },
    { coinIndex: 16, coinOpacity: 0.5 },
  ];
  transportCoins = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 0.5 },
    { coinIndex: 3, coinOpacity: 0.5 },
    { coinIndex: 4, coinOpacity: 0.5 },
    { coinIndex: 5, coinOpacity: 0.5 },
    { coinIndex: 6, coinOpacity: 0.5 },
    { coinIndex: 7, coinOpacity: 0.5 },
    { coinIndex: 8, coinOpacity: 0.5 },
    { coinIndex: 9, coinOpacity: 0.5 },
    { coinIndex: 10, coinOpacity: 0.5 },
    { coinIndex: 11, coinOpacity: 0.5 },
    { coinIndex: 12, coinOpacity: 0.5 },
    { coinIndex: 13, coinOpacity: 0.5 },
    { coinIndex: 14, coinOpacity: 0.5 },
    { coinIndex: 15, coinOpacity: 0.5 },
    { coinIndex: 16, coinOpacity: 0.5 },
  ];
  cobenefitCoins = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 0.5 },
    { coinIndex: 3, coinOpacity: 0.5 },
    { coinIndex: 4, coinOpacity: 0.5 },
    { coinIndex: 5, coinOpacity: 0.5 },
    { coinIndex: 6, coinOpacity: 0.5 },
    { coinIndex: 7, coinOpacity: 0.5 },
    { coinIndex: 8, coinOpacity: 0.5 },
    { coinIndex: 9, coinOpacity: 0.5 },
    { coinIndex: 10, coinOpacity: 0.5 },
    { coinIndex: 11, coinOpacity: 0.5 },
    { coinIndex: 12, coinOpacity: 0.5 },
    { coinIndex: 13, coinOpacity: 0.5 },
    { coinIndex: 14, coinOpacity: 0.5 },
    { coinIndex: 15, coinOpacity: 0.5 },
    { coinIndex: 16, coinOpacity: 0.5 },
  ];
  totalriskCoins = [
    { coinIndex: 1, coinOpacity: 0.5 },
    { coinIndex: 2, coinOpacity: 0.5 },
    { coinIndex: 3, coinOpacity: 0.5 },
    { coinIndex: 4, coinOpacity: 0.5 },
    { coinIndex: 5, coinOpacity: 0.5 },
    { coinIndex: 6, coinOpacity: 0.5 },
    { coinIndex: 7, coinOpacity: 0.5 },
    { coinIndex: 8, coinOpacity: 0.5 },
    { coinIndex: 9, coinOpacity: 0.5 },
    { coinIndex: 10, coinOpacity: 0.5 },
    { coinIndex: 11, coinOpacity: 0.5 },
    { coinIndex: 12, coinOpacity: 0.5 },
    { coinIndex: 13, coinOpacity: 0.5 },
    { coinIndex: 14, coinOpacity: 0.5 },
    { coinIndex: 15, coinOpacity: 0.5 },
    { coinIndex: 16, coinOpacity: 0.5 },
  ];

private updateCoinRow(coins: any[], value: number): void {
  const start = this.getRoundRowStartIndex();
  const end = start + 4;

  for (let i = start; i < end; i++) coins[i].coinOpacity = 0.5;

  let active = 1;
  if (value <= 30) active = 1;        // x1: < 30 (and 30 itself)
  else if (value <= 50) active = 2;   // x2: 31–50
  else if (value <= 70) active = 3;   // x3: 51–70
  else active = 4;                    // x4: >= 71

  for (let i = 0; i < active; i++) coins[start + i].coinOpacity = 1;

  console.log('Coins update:', { value, active, start });
}

private updateCobenefitCoins(): void {
  const start = this.getRoundRowStartIndex();
  const end = start + 4;

  for (let i = start; i < end; i++) this.cobenefitCoins[i].coinOpacity = 0.5;

  let active = 0;
  if (this.cobenefits > 0 && this.cobenefits <= 20) active = 1;
else if (this.cobenefits >= 21 && this.cobenefits <= 40) active = 2;
else if (this.cobenefits >= 41 && this.cobenefits <= 60) active = 3;
else if (this.cobenefits >= 61) active = 4;

  for (let i = 0; i < active; i++) this.cobenefitCoins[start + i].coinOpacity = 1;

  console.log('Cobenefit coins:', { cobenefits: this.cobenefits, active });
}


    BudgetIncrease:number = 0;
    BudgetCoinShowedCounter:number =0;

    private getRoundRowStartIndex(): number {
  switch (this.selected) {
    case 'Round 1: 2030': return 0;
    case 'Round 2: 2040': return 4;
    case 'Round 3: 2050': return 8;
    case 'Round 4: 2060': return 12;
    default: return 0;
  }
}

    private getCurrentRoundIndex(): number {
  switch (this.selected) {
    case 'Round 1: 2030': return 0;
    case 'Round 2: 2040': return 1;
    case 'Round 3: 2050': return 2;
    case 'Round 4: 2060': return 3;
    default: return 0;
  }
}

applyRound(): void {
  // 1) Block re-applying same round
  if (this.isRoundAlreadyApplied()) {
    console.warn('This round was already applied. Go to next round to continue.');
    return;
  }

  // 2) Must be locked before applying (normal flow)
  if (!this.isSelectionLocked) {
    console.log('Lock selections before applying.');
    return;
  }

  const startBudget = this.roundStartBudget;

  // 3) If budget already gone OR previously broken -> apply empty round (and keep budget coins at 0.5)
  //    budgetBroken = true means: overbudget happened in some previous round.
  if (startBudget <= 0 || this.budgetBroken) {
    const transport = this.clampRisk(this.transportRisk);
    const water = this.clampRisk(this.waterRisk);
    const health = this.clampRisk(this.healthRisk);
    const energy = this.clampRisk(this.energyRisk);

    this.cobenefits = this.clampCobenefits(0);
    this.totalRisk = this.clampTotalRisk(
      Math.round((transport + water + health + energy) / 4)
    );

    // Store round data for graphs
    this.budgetRounds[this.selected] = 0;
    this.transportRiskRounds[this.selected] = transport;
    this.waterRiskRounds[this.selected] = water;
    this.healthRiskRounds[this.selected] = health;
    this.energyRiskRounds[this.selected] = energy;
    this.cobenefitRounds[this.selected] = this.cobenefits;
    this.totalRiskRounds[this.selected] = this.totalRisk;

    this.impactAndSector.setRoundData({
      budgetRounds: this.budgetRounds,
      transportRiskRounds: this.transportRiskRounds,
      waterRiskRounds: this.waterRiskRounds,
      healthRiskRounds: this.healthRiskRounds,
      energyRiskRounds: this.energyRiskRounds,
      cobenefitRounds: this.cobenefitRounds,
      totalRiskRounds: this.totalRiskRounds,
    });

    // Budget coins stay 0.5 in this round when budget is broken/zero
    this.updateBudgetCoinsForRoundSpent(0, true);

    const summary: RoundSummary = {
      round: this.selected,
      climateCards: [],
      adaptCards: [],
      startBudget,
      spentBudget: 0,
      endBudget: 0,
      risks: { transport, water, health, energy },
      cobenefits: this.cobenefits,
    };

    const idx = this.roundSummaries.findIndex(s => s.round === this.selected);
    if (idx >= 0) this.roundSummaries[idx] = summary;
    else this.roundSummaries.push(summary);

    // Mark applied
    this.appliedRounds[this.selected] = true;
    this.isSelectionLocked = true;

    this.remainingBudget = 0;
    this.roundStartBudget = 0;
    this.projectedRemainingBudget = 0;

    console.log('✅ Applied round with budget=0 OR budgetBroken (no selections).', summary);
    return;
  }

  // 4) Normal round: must have selections
  if (!this.hasValidSelectionForRound()) return;

  // 5) Reset bonus delta tracker
  this.firstOpexDeltaThisRound = 0;

  // 6) Compute spent based on selected cards
  const climateCapex = this.selectedClimateCards.reduce(
    (sum, c) => sum + Number(c.capex || 0),
    0
  );
  const adaptCapex = this.selectedAdaptCards.reduce(
    (sum, c) => sum + Number(c.capex || 0),
    0
  );
  const spentRaw = climateCapex + adaptCapex;

  // 7) Overbudget detection for THIS round (this breaks budget forever)
  const isOverBudget = spentRaw > startBudget;
  if (isOverBudget) {
    this.budgetBroken = true;
  }

  // 8) What you can actually spend this round (cap at startBudget)
  const spentThisRound = Math.min(spentRaw, startBudget);

  // 9) Remaining budget rule
  //    If overbudget -> endBudget forced to 0
  //    else -> normal subtraction
  const endBudget = isOverBudget ? 0 : Math.max(0, startBudget - spentRaw);

  this.remainingBudget = endBudget;
  this.projectedRemainingBudget = endBudget;

  // 10) Apply rules
  this.applySynergyRules();
  this.applyBonusRules();

  // 11) Clamp KPIs
  this.adaptTransportRisk = this.clampRisk(this.adaptTransportRisk);
  this.adaptWaterRisk = this.clampRisk(this.adaptWaterRisk);
  this.adaptHealthRisk = this.clampRisk(this.adaptHealthRisk);
  this.adaptEnergyRisk = this.clampRisk(this.adaptEnergyRisk);

  this.cobenefits = this.clampCobenefits(this.cobenefits);

  const total = Math.round(
    (this.adaptTransportRisk + this.adaptWaterRisk + this.adaptHealthRisk + this.adaptEnergyRisk) / 4
  );
  this.totalRisk = this.clampTotalRisk(total);

  // 12) Update coins
  this.updateCoinRow(this.totalriskCoins, this.totalRisk);

  // Budget coins: based on SPENT THIS ROUND (absolute thresholds),
  // and if overbudget happened -> keep 0.5 now and future rounds.
  this.updateBudgetCoinsForRoundSpent(spentThisRound, this.budgetBroken);

  this.updateCoinRow(this.transportCoins, this.adaptTransportRisk);
  this.updateCoinRow(this.waterCoins, this.adaptWaterRisk);
  this.updateCoinRow(this.healthCoints, this.adaptHealthRisk);
  this.updateCoinRow(this.energyCoints, this.adaptEnergyRisk);
  this.updateCobenefitCoins();

  // 13) Store for graphs
  this.budgetRounds[this.selected] = endBudget;
  this.transportRiskRounds[this.selected] = this.adaptTransportRisk;
  this.waterRiskRounds[this.selected] = this.adaptWaterRisk;
  this.healthRiskRounds[this.selected] = this.adaptHealthRisk;
  this.energyRiskRounds[this.selected] = this.adaptEnergyRisk;
  this.cobenefitRounds[this.selected] = this.cobenefits;
  this.totalRiskRounds[this.selected] = this.totalRisk;

  this.impactAndSector.setRoundData({
    budgetRounds: this.budgetRounds,
    transportRiskRounds: this.transportRiskRounds,
    waterRiskRounds: this.waterRiskRounds,
    healthRiskRounds: this.healthRiskRounds,
    energyRiskRounds: this.energyRiskRounds,
    cobenefitRounds: this.cobenefitRounds,
    totalRiskRounds: this.totalRiskRounds,
  });

  // 14) Summary
  const summary: RoundSummary = {
    round: this.selected,
    climateCards: [...this.selectedClimateCards],
    adaptCards: [...this.selectedAdaptCards],
    startBudget,
    spentBudget: spentThisRound, // ✅ what was actually possible this round
    endBudget,
    risks: {
      transport: this.adaptTransportRisk,
      water: this.adaptWaterRisk,
      health: this.adaptHealthRisk,
      energy: this.adaptEnergyRisk,
    },
    cobenefits: this.cobenefits,
  };

  const idx = this.roundSummaries.findIndex(s => s.round === this.selected);
  if (idx >= 0) this.roundSummaries[idx] = summary;
  else this.roundSummaries.push(summary);

  // 15) Mark applied
  this.appliedRounds[this.selected] = true;
  this.isSelectionLocked = true;

  // next round starts with what is left
  this.roundStartBudget = this.remainingBudget;

  console.log('===== ROUND SUMMARY =====', summary);
}


private updateBudgetCoinsForRoundSpent(spentThisRound: number, broken: boolean): void {
 const roundIndex = this.getCurrentRoundIndex();
  const rowStart = roundIndex * 4;
  const rowEnd = rowStart + 4;

  // reset this round row
  for (let i = rowStart; i < rowEnd; i++) this.budgetCoins[i].coinOpacity = 0.5;

  // if budget is broken (overbudget happened now or earlier), keep them all 0.5
  if (broken) {
    console.log('Budget coins: budget is broken -> keep 0.5');
    return;
  }

  

  let active = 0;
  if (spentThisRound > 0 && spentThisRound <= 15) active = 1;
  else if (spentThisRound > 15 && spentThisRound <= 30) active = 2;
  else if (spentThisRound > 30 && spentThisRound <= 45) active = 3;
  else if (spentThisRound > 45) active = 4;

  for (let i = 0; i < active; i++) this.budgetCoins[rowStart + i].coinOpacity = 1;

  console.log('Budget coins (spent-based):', { spentThisRound, active });
}



goToNextRound(): void {
  // ✅ if all 4 rounds are applied -> go to Dynamic Results
  if (this.canSeeGraphs) {
    this.goToResultsGraphs();
    return;
  }

  // ✅ block going next unless the current round is applied
  if (!this.canGoNext) {
    console.warn('Apply the current round before moving to the next round.');
    return;
  }

  // ✅ normal next-round flow
  this.resetRoundState();
  this.isSelectionLocked = false;

  if (this.selected === 'Round 1: 2030') this.selected = 'Round 2: 2040';
  else if (this.selected === 'Round 2: 2040') this.selected = 'Round 3: 2050';
  else if (this.selected === 'Round 3: 2050') this.selected = 'Round 4: 2060';
}

goToPreviousRound(): void {
  this.resetRoundState();

  if (this.selected === 'Round 4: 2060') {
    this.selected = 'Round 3: 2050';
  } else if (this.selected === 'Round 3: 2050') {
    this.selected = 'Round 2: 2040';
  } else if (this.selected === 'Round 2: 2040') {
    this.selected = 'Round 1: 2030';
  }
}

private allRounds = ['Round 1: 2030','Round 2: 2040','Round 3: 2050','Round 4: 2060'];

canGoToResults(): boolean {
  return this.allRounds.every(r => this.roundSummaries.some(s => s.round === r));
}

getNextButtonLabel(): string {
  if (this.selected === 'Round 4: 2060') return 'View results';
  return 'Continue to next round';
}

isCurrentRoundApplied(): boolean {
  return this.isRoundAlreadyApplied();
  return this.roundSummaries.some(s => s.round === this.selected);
  
}

continueFlow(): void {
  if (this.selected === 'Round 4: 2060') {
    if (!this.canViewResults) return;
    this.router.navigate(['/resultsGraphs']);
    return;
  }

  if (!this.canGoNext) return;
  this.goToNextRound();
}

seeGrahpsButtonStatus = true;
selectedTempLevel: 'low' | 'medium' | 'high' = 'low';
selectTempLevel(level: 'low' | 'medium' | 'high'): void {
  this.selectedTempLevel = level;
  console.log('Selected temperature level:', level);
}

get canSeeGraphs(): boolean {
  // true only if ALL rounds exist in roundSummaries
  return this.allRounds.every(r => this.roundSummaries.some(s => s.round === r));
}

goToResultsGraphs(): void {
  if (!this.canSeeGraphs) {
    console.log('Finish and APPLY all rounds before viewing graphs.');
    return;
  }
  this.router.navigate(['/resultsGraphs']);
}

resetRoundState(): void {
  console.log('Resetting round state');

  this.isSelectionLocked = false;
  this.firstOpexDeltaThisRound = 0;

  this.selectedClimateCards = [];
  this.selectedAdaptCards = [];
  this.selectedAdaptationOrder = [];
  this.selectedAdaptationTools.clear();
  this.bonusSelected = '';

  this.selectedClimateIndex = null;                
  this.ImpactAndSectorForSelectedToolList = [];     

  this.roundStartBudget = this.remainingBudget;
  this.projectedRemainingBudget = this.remainingBudget;

  this.cobenefits = 0;
  this.adaptTransportRisk = this.transportRisk;
  this.adaptWaterRisk = this.waterRisk;
  this.adaptHealthRisk = this.healthRisk;
  this.adaptEnergyRisk = this.energyRisk;

  this.cobenefitsCardCounter = 0;
  this.cobenFitsFromAdaptCard1 = 0;
  this.cobenFitsFromAdaptCard2 = 0;

  console.log('Round reset complete');
}

private getSelectedAdaptCodes(): string[] {
  return [...this.selectedAdaptationTools].map(i => this.toolsForAdapt[i].code);
}

private applySynergyRules(): void {

    const climateCode: string | undefined = this.selectedClimateCards?.[0]?.code;

  if (!climateCode) return;

  const adaptCodes = this.getSelectedAdaptCodes();
  const has = (code: string) => adaptCodes.includes(code);

  

  switch (climateCode) {
    case 'HEATWAVE': this.adaptHealthRisk += 6; break;
    case 'DROUGHT': this.adaptWaterRisk += 7; break;
    case 'COASTAL_EVENT': this.adaptTransportRisk += 6; break;
    case 'ENERGY_BLACKOUT': this.adaptEnergyRisk += 6; break;
    case 'EXTREME_PRECIPITATION':
      this.adaptTransportRisk += 5;
      this.adaptWaterRisk += 3;
      break;
    case 'URBAN_HEAT':
      this.adaptEnergyRisk += 4;
      this.adaptHealthRisk += 5;
      break;
    case 'WILDFIRES':
      this.adaptHealthRisk += 7;
      this.adaptTransportRisk += 2;
      break;
  }

  // Reduce climate impacts if synergies exist
  if (climateCode === 'HEATWAVE') {
    if (has('CLIMATE_SHELTERS')) this.adaptHealthRisk -= 4; // +2 instead of +6
    else if (has('GREEN_URBAN')) this.adaptHealthRisk -= 2; // +4 instead of +6
  }

  if (climateCode === 'DROUGHT') {
    if (has('WATER_REUSE')) this.adaptWaterRisk -= 3; // +4 instead of +7
  }

  if (climateCode === 'COASTAL_EVENT') {
    if (has('MIXED_COASTAL')) this.adaptTransportRisk -= 4; // +2 instead of +6
  }

  if (climateCode === 'ENERGY_BLACKOUT') {
    if (has('MICROGRIDS_CRITICAL')) this.adaptEnergyRisk -= 6; // 0 instead of +6
    else if (has('ENERGY_RETROFITTING')) this.adaptEnergyRisk -= 2; // +4 instead of +6
  }

  if (climateCode === 'EXTREME_PRECIPITATION') {
    if (has('WETLANDS_SUSTAINABLE')) {
      this.adaptTransportRisk -= 3; // +2 instead of +5
      this.adaptWaterRisk -= 3;     // 0 instead of +3
    }
  }

  if (climateCode === 'URBAN_HEAT') {
    if (has('ENERGY_RETROFITTING')) this.adaptEnergyRisk -= 2;
    if (has('GREEN_URBAN')) this.adaptHealthRisk -= 2;
  }

  if (climateCode === 'WILDFIRES') {
    if (has('CLIMATE_SHELTERS')) this.adaptHealthRisk -= 3;
    else if (has('EARLY_WARNING')) this.adaptHealthRisk -= 2;
  }

  // 3) Adapt <-> Adapt synergies
  if (has('GREEN_URBAN') && has('COOL_MOBILITY')) this.adaptTransportRisk -= 2;
  if (has('CLIMATE_SHELTERS') && has('EARLY_WARNING')) this.adaptHealthRisk -= 2;
  if (has('WATER_EFFICIENCY') && has('WATER_REUSE')) this.adaptWaterRisk -= 3;
  if (has('WETLANDS_SUSTAINABLE') && has('MIXED_COASTAL')) this.adaptTransportRisk -= 3;
  if (has('ENERGY_RETROFITTING') && has('GREEN_URBAN')) this.adaptHealthRisk -= 2;

  

  const bonus = this.bonusSelected?.trim();
const commPlanActive = bonus === 'Climate risk communication plan';

if (climateCode === 'NEGATIVE_PUBLIC') {
  if (commPlanActive) {
    console.log('NEGATIVE_PUBLIC canceled by Climate risk communication plan');
  } else {
    const sheltersSelected = has('CLIMATE_SHELTERS');
    if (!sheltersSelected) {
      console.log('NEGATIVE_PUBLIC: increase first OPEX by 0.3M');
    }
  }
}

  // Clamp to avoid negatives
  this.adaptTransportRisk = Math.max(0, this.adaptTransportRisk);
  this.adaptWaterRisk = Math.max(0, this.adaptWaterRisk);
  this.adaptHealthRisk = Math.max(0, this.adaptHealthRisk);
  this.adaptEnergyRisk = Math.max(0, this.adaptEnergyRisk);
}



}
