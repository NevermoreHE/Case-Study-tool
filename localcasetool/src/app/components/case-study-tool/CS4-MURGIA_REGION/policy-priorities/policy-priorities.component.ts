import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../titleCase/data-storage.service';

@Component({
  selector: 'app-policy-priorities',
  templateUrl: './policy-priorities.component.html',
  styleUrls: ['./policy-priorities.component.css'],
})
export class PolicyPrioritiesComponent {
  selectedTitleCase: string = '';

  constructor(
    private translate: TranslateService,
    private dataStorageService: DataStorageService
  ) {
    translate.setDefaultLang('EN');
  }
      theRoutingTitleCase:string = '';

  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log('Selected Title Case from service:', this.selectedTitleCase);

                   if(this.selectedTitleCase == "CS1_CRETE_ISLAND"){
      this.theRoutingTitleCase = "CS1-Crete_Island";
    }else if(this.selectedTitleCase == "CS2_TRENTINO_REGION"){
      this.theRoutingTitleCase = "CS2-Trentino_region";
    }else if(this.selectedTitleCase == "CS3_NORRBOTTEN_COUNTRY"){
      this.theRoutingTitleCase = "CS3-Norrbotten_country";
    }else if(this.selectedTitleCase == "CS4_MURCIA_REGION"){
      this.theRoutingTitleCase = "CS4-Murcia_region";
    }else if(this.selectedTitleCase == "CS5_DANUBE_DELTA"){
      this.theRoutingTitleCase = "CS5-Danube_delta";
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  priorityAndObjective: string = '';
  mainSectorToEvaluate: string = '';
  adaptationAndMitigationOption: string = '';
  provideARank: string = '';

  priorityAndObjectivesList = [
    'WATER_SECURITY',
    'WELL_BEING',
    'ENERGY_SECURITY',
    'JOB_CREATION',
  ];
  mainSectorList = ['AGRICULTURE', 'TURISM', 'WATER'];
  ranksList = ['1)WATER_SCARCITY', '2)WELL_BEING'];
  adaptationAndMitigationList = ['ADAPTAION', 'MITIGATION'];

  selectedPriorityAndObjective(priority: string) {
    this.priorityAndObjective = priority;
  }

  chosedPriorityAndObjective(priorityAndObj: string) {
    this.priorityAndObjective = priorityAndObj;
    console.log(
      'You have chosen the priority and objective option: ',
      priorityAndObj
    );
  }

  chosedMainSector(mainSector: string) {
    this.mainSectorToEvaluate = mainSector;
    console.log('You have chosen the main sector option: ', mainSector);
  }

  chosedAdaptationAndMitigation(adaptationAndMitigation: string) {
    this.adaptationAndMitigationOption = adaptationAndMitigation;
    console.log(
      'You have chosen the adaptation and mitigation option: ',
      adaptationAndMitigation
    );
  }

  chosedProvidedRank(provideARank: string) {
    this.provideARank = provideARank;
    console.log('You have chosen the rank option: ', provideARank);
  }

  needsFullfiledStatus: boolean = true;

  checkNeedsFullfilled(): boolean {
    if (
      this.priorityAndObjective != '' &&
      this.mainSectorToEvaluate != '' &&
      this.adaptationAndMitigationOption != '' &&
      this.provideARank != ''
    ) {
      this.needsFullfiledStatus = false;
      return false;
    } else {
      return true;
    }
  }

  goodToGoNext: boolean = false;

  checkValueForMainSector() {
    if (this.mainSectorToEvaluate != '') {
      console.log('GOOD');
    }
    this.goodToGoNext = this.checkNeedsFullfilled();
    if (this.goodToGoNext == false) {
      this.needsFullfiledStatus = false;
    }
  }
  

  checkValueForPriorityAndObjective() {
    if (this.mainSectorToEvaluate != '') {
      console.log('GOOD');
    }
    this.goodToGoNext = this.checkNeedsFullfilled();
    if (this.goodToGoNext == false) {
      this.needsFullfiledStatus = false;
    }
  }


  checkValueForAdaptationAndMitigation() {
    if (this.mainSectorToEvaluate != '') {
      console.log('GOOD');
    }
    this.goodToGoNext = this.checkNeedsFullfilled();
    if (this.goodToGoNext == false) {
      this.needsFullfiledStatus = false;
    }
  }


  checkValueForRank() {
    if (this.mainSectorToEvaluate != '') {
      console.log('GOOD');
    }
    this.goodToGoNext = this.checkNeedsFullfilled();
    if (this.goodToGoNext == false) {
      this.needsFullfiledStatus = false;
    }
  }
}
