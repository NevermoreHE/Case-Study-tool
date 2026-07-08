import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GamificationMission2Service } from '../../services/gamification_mission_2/gamification-mission-2.service';

@Component({
  selector: 'app-climate-change-game',

  templateUrl: './climate-change-game.component.html',
  styleUrls: ['./climate-change-game.component.css'],
})
export class ClimateChangeGameComponent implements OnInit {

ngOnInit(){
  this.loadImpactAndSectorData();
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

  imageOpacity: number = 0.5;
  visableToolNameSalected: string = '';
  adaptationMeasureSelected: string = '';
  bonusSelected: string = '';
  selectedBonusTool(toolName: string) {
    this.bonusSelected = toolName;
    console.log('You have selected the bonus tool named: ', this.bonusSelected);
  }

  selectedTemperature: string = '';
  selectTemp() {}
  constructor(private router: Router,private impactAndSector:GamificationMission2Service) {}

  showPopup = true;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  isPopupVisibleAbove: boolean = false;
  isPopupVisibleRight: boolean = false;

  // Method to toggle the visibility of the popups
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
    this.selected = value;
    this.selectedChange.emit(value);
    console.log(value);
  }

  nextRoundButton() {
    if (this.selected == 'Round 1: 2030') {
      this.selected = 'Round 2: 2040';
    } else if (this.selected == 'Round 2: 2040') {
      this.selected = 'Round 3: 2050';
    } else if (this.selected == 'Round 3: 2050') {
      this.selected = 'Round 4: 2060';
    } else if (this.selected == 'Round 4: 2060') {
      this.selected = 'Round 4: 2060';
    }
  }

  tools = [
    {
      name: 'Heatwave',
      image: '/assets/images/heatwave-icon.png',
      description:
        'If "Climate shelters and heat management Plans" is applied, the effect is reduced in 4 units for Health (+2 instead of +6). If "Green urban areas" is applied, the effect is reduced in 2 units for Health (+4 instead of +6).				',
        code:'HEATWAVE'
    },
    {
      name: 'Draught',
      image: '/assets/images/draught_card.png',
      description:
        'If "Water reuse and harvesting" is activated, the value is +4 instead of +7				',
                code:'DROUGHT'

    },
    {
      name: 'Coastal Event',
      image: '/assets/images/coastal-card.png',
      description:
        'If "Mixed coastal protection" is activated, the value is +2 instead of +6				',
        code:'COASTAL_EVENT'
    },
    {
      name: 'Energy Blackout',
      image: '/assets/images/energy-synergy-card.png',
      description:
        'If "Microgrids and critical backup power" is activated, the first application in Energy is 0. If "Energy retrofitting of buildings" is applied, the effect is reduced in 2 units for Energy (+4 instead of +6). 				',
      code:'ENERGY_BLACKOUT'
      },
    {
      name: 'Extreme Precipitation',
      image: '/assets/images/extreme-precipitation.png',
      description:
        'If "Wetlands and sustainable drainage" is applied, the effect is reduced in 3 units for both affected sectors (Transport is +2 and Water +0)				',
      code:'EXTREME_PRECIPITATION'
      },
    {
      name: 'Negative Public Perception',
      image: '/assets/images/negative-public-perception.png',
      description:
        'If this is applied, the first OPEX is increased in 0,3M. If "Climate shelters and heat management Plans" is the first measure, the effect is not applicable				',
    code:'NEGATIVE_PUBLIC'
      },
    {
      name: 'Urban Heat Island',
      image: '/assets/images/urban-heat-island.png',
      description:
        'If "Energy retrofitting of buildings" is applied, the effect is reduced in 2 units for Energy (+2 instead of +4). If "Green urban areas" is applied, the effect is reduced in 2 unit for Health (+2 instead of +4).				',
    code:'URBAN_HEAT'
      },
    {
      name: 'Wildfires',
      image: '/assets/images/wildfires.png',
      description:
        'If "Climate shelters and heat management Plans" is applied, the effect is reduced in 3 units for Health (+4 instead of +7). If "Early warning systems" is applied, the effect is reduced in 2 unit for Health (+5 instead of +7). 				',
      code:'WILDFIRES'
      },
  ];

  loadImpactAndSectorData(): void {
  const selectedToolCode = this.tools[this.selectedToolIndex].code;

  this.impactAndSector
    .getImpactAndSectorValuesForTool(selectedToolCode)
    .subscribe(data => {
      this.ImpactAndSectorForSelectedToolList = JSON.parse(data);
      console.log("Loaded data for:", selectedToolCode);
      console.log(this.ImpactAndSectorForSelectedToolList);
    });
}



  selectedToolIndex: number = 1;
  private previousSelectedToolName: string = '';
  private previousSelectedToolCode:string = '';
  ImpactAndSectorForSelectedToolList:any[]=[];
  getVisibleTools(): any[] {
    const total = this.tools.length;

    const leftIndex = (this.selectedToolIndex - 1 + total) % total;
    const rightIndex = (this.selectedToolIndex + 1) % total;
    const nextIndex = (this.selectedToolIndex + 2) % total;

    const selectedToolName = this.tools[this.selectedToolIndex].name;
    const selectedToolCode = this.tools[this.selectedToolIndex].code;
    if (selectedToolName !== this.previousSelectedToolName && selectedToolCode !== this.previousSelectedToolCode) {
      this.previousSelectedToolName = selectedToolName;
      this.previousSelectedToolCode = selectedToolCode;
      console.log(
        'You have selected the visible tool named: ',
        selectedToolName
      );

      console.log('You have selected the visible tool named: ',
        selectedToolCode)


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

  navigateLeft(): void {
    this.selectedToolIndex =
      (this.selectedToolIndex - 1 + this.tools.length) % this.tools.length;
      this.loadImpactAndSectorData();  
  }

  navigateRight(): void {
    this.selectedToolIndex = (this.selectedToolIndex + 1) % this.tools.length;
    this.loadImpactAndSectorData();  
  }
  
  toolsForAdapt = [
    {
      name: 'Wetlands & sustainable drainage',
      image: '/assets/images/wetlands-icon.png',
      description:
        'If "Mixed coastal protection" is activated, +3 additional points for Transport',
    },
    {
      name: 'Mixed coastal protection',
      image: '/assets/images/mixed-costal.png',
      description:
        'If "Coastal event", the effects on transpor are reduced in 4 units',
    },
    {
      name: 'Cool mobility & shading',
      image: '/assets/images/cool-mobility.png',
      description:
        'If "Green urban areas" is activated, +2 additional points for Transport',
    },
    {
      name: 'Energy retrofitting of buildings',
      image: '/assets/images/energy-retrofitting.png',
      description:
        'If "Green urban areas" is activated, +2 additional points for Health',
    },
    {
      name: 'Green urban areas',
      image: '/assets/images/urban-areas.png',
      description:
        'If "Cool mobility and shading" is activated, +2 additional points for Transport',
    },
    {
      name: 'Climate shelters & heat management plans',
      image: '/assets/images/climate-shares.png',
      description:
        'It has no lag (is applied since the application); If “Early warning systems” is activated, +2 additional points for Health',
    },
    {
      name: 'Early warning systems',
      image: '/assets/images/early-warnings.png',
      description:
        'If this measures is applied, it improve other measures with +2 additional points in the better sector',
    },
    {
      name: 'Water efficiency',
      image: '/assets/images/water-scarcity.png',
      description:
        'If "Water reuse and harvesting" is activated, +3 additional points for Water',
    },
    {
      name: 'Water reuse & harvesting',
      image: '/assets/images/water-reuse.png',
      description:
        'If climate event is "Drought", the impact on Water is multiplied by 0,5',
    },
    {
      name: 'Microgrids & critical backup power',
      image: '/assets/images/microgrids.png',
      description:
        'If is activated, the first event that affect Energy has 0 impact on Energy',
    },
  ];

  selectedToolIndexForAdapt: number = 1;
  private previousAdaptationToolName: string = '';
  selectedAdaptationTools: Set<number> = new Set();

  adaptCard1LDataList:any[] = [];
  adaptCardsDataList:any[] = [];

  getVisibleToolsForAdapt(): any[] {
    const total = this.toolsForAdapt.length;
    const leftIndex = (this.selectedToolIndexForAdapt - 1 + total) % total;
    const rightIndex = (this.selectedToolIndexForAdapt + 1) % total;
    const nextIndex = (this.selectedToolIndexForAdapt + 2) % total;

    return [
      { tool: this.toolsForAdapt[leftIndex], realIndex: leftIndex },
      {
        tool: this.toolsForAdapt[this.selectedToolIndexForAdapt],
        realIndex: this.selectedToolIndexForAdapt,
      },
      { tool: this.toolsForAdapt[rightIndex], realIndex: rightIndex },
      { tool: this.toolsForAdapt[nextIndex], realIndex: nextIndex },
    ];
  }

logSelectedTools(): void {
  const selected = [...this.selectedAdaptationTools]
    .map(i => this.toolsForAdapt[i].name);
  console.log('Selected length:', selected.length);

  console.log('Selected tools:', selected.length);

  if (selected.length === 1) {
    this.impactAndSector.getAdaptCardDataFor1Card(selected[0])
      .subscribe(data => {
        this.adaptCard1LDataList = JSON.parse(data);

        console.log("Loaded data for:", selected[0]);
        console.log("Data list:", this.adaptCard1LDataList); 
      });

  } 
}

  toggleSelection(index: number): void {
    if (this.selectedAdaptationTools.has(index)) {
      this.selectedAdaptationTools.delete(index);
    } else {
      if (this.selectedAdaptationTools.size < 2) {
        this.selectedAdaptationTools.add(index);
      } else {
        console.log('You can only select up to 2 cards.');
      }
    }

    this.logSelectedTools();
  }

  isSelected(index: number): boolean {
    return this.selectedAdaptationTools.has(index);
  }

  getAdaptationMeasureInfo(): any {
    return this.toolsForAdapt[this.selectedToolIndexForAdapt];
  }

  navigateLeftForAdapt(): void {
    this.selectedToolIndexForAdapt =
      (this.selectedToolIndexForAdapt - 1 + this.toolsForAdapt.length) %
      this.toolsForAdapt.length;
  }

  navigateRightForAdapt(): void {
    this.selectedToolIndexForAdapt =
      (this.selectedToolIndexForAdapt + 1) % this.toolsForAdapt.length;
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
  getVisibleToolsForBonus(): any[] {
    const total = this.toolsForBonus.length;
    const leftIndex = (this.selectedToolIndexForBonus - 1 + total) % total;
    const rightIndex = (this.selectedToolIndexForBonus + 1) % total;

    return [
      this.toolsForBonus[leftIndex],
      this.toolsForBonus[this.selectedToolIndexForBonus],
      this.toolsForBonus[rightIndex],
    ];
  }

  getAdaptationMeasureBonus(): any {
    return this.toolsForBonus[this.selectedToolIndexForBonus];
  }

  navigateLeftForBonus(): void {
    this.selectedToolIndexForBonus =
      (this.selectedToolIndexForBonus - 1 + this.toolsForBonus.length) %
      this.toolsForBonus.length;
  }

  navigateRightForBonus(): void {
    this.selectedToolIndexForBonus =
      (this.selectedToolIndexForBonus + 1) % this.toolsForBonus.length;
  }
  selectToolForBonus(): void {
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
    { coinIndex: 1, coinOpacity: 1 },
    { coinIndex: 2, coinOpacity: 1 },
    { coinIndex: 3, coinOpacity: 1 },
    { coinIndex: 4, coinOpacity: 1 },
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
    { coinIndex: 1, coinOpacity: 1 },
    { coinIndex: 2, coinOpacity: 1 },
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
    { coinIndex: 1, coinOpacity: 1 },
    { coinIndex: 2, coinOpacity: 1 },
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
    { coinIndex: 1, coinOpacity: 1 },
    { coinIndex: 2, coinOpacity: 1 },
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
    { coinIndex: 1, coinOpacity: 1 },
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
    { coinIndex: 1, coinOpacity: 1 },
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
    { coinIndex: 1, coinOpacity: 1 },
    { coinIndex: 2, coinOpacity: 1 },
    { coinIndex: 3, coinOpacity: 1 },
    { coinIndex: 4, coinOpacity: 1 },
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
}
