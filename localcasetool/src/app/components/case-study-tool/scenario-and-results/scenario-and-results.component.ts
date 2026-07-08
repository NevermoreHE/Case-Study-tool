import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PolicySelectedService } from '../../services/policy/policy-selected.service';
import { SectorsService } from '../../services/sectors/sectors.service';
import { DataStorageService } from '../titleCase/data-storage.service';
import { PolicyRecommandationsService } from '../../services/policy_recommandations/policy-recommandations.service';

@Component({
  selector: 'app-scenario-and-results',

  templateUrl: './scenario-and-results.component.html',
  styleUrls: ['./scenario-and-results.component.css']
})
export class ScenarioAndResultsComponent {
title_case: string = '';
appliedPoliciesReceived:any = [];
  selectedTitleCase: string = '';
  selectedSectorData: string = '';

  constructor(private translate: TranslateService,private dataStorageService: DataStorageService,private sectorService:SectorsService,private thePolicySelected:PolicySelectedService,private policyRecommendation:PolicyRecommandationsService) {
    translate.setDefaultLang('EN');
  }

sectorsReceived :any[] = [];
the_title_case:string = '';
policySelectedPreviously:string = '';
storyLineCode:any = '';
storyLineDescription:string = '';
caseStudyName:string = '';
theScenarioIndex:number = 0;
appliedPoliciesDescriptionsReceived:any = [];

  ngOnInit(): void {
    this.selectedSectorData = this.dataStorageService.getSelectedSector();
    // this.the_title_case = this.dataStorageService.getTitleCase();
    // console.log(this.the_title_case);
    
    console.log(this.selectedSectorData);
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log("Selected Title Case from service:", this.selectedTitleCase); 
    this.sectorService.getSectorsForSpecificCaseStudy(this.selectedTitleCase).subscribe(data => this.sectorsReceived =JSON.parse(data));
    this.policySelectedPreviously = this.thePolicySelected.getPolicySelected();

    if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
      this.caseStudyName = 'CS1';
    } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
      this.caseStudyName = 'CS2';
    } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
      this.caseStudyName = 'CS3';
    } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
      this.caseStudyName = 'CS4';
    } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
      this.caseStudyName = 'CS5';
    }

    this.thePolicySelectedPreviously = this.thePolicySelected.getPolicySelected();
    this.storyLineCode = "S" + this.thePolicySelected.getPolicyIndex();
    this.policyRecommendation.getAppliedPolicies(this.caseStudyName,this.storyLineCode)
  .subscribe((data: any[]) => {
    this.appliedPoliciesReceived = data;
    console.log('received:', this.appliedPoliciesReceived);
  });    console.log(this.appliedPoliciesReceived);

  this.policyRecommendation.getAssesmentAndStoryline(this.caseStudyName)
  .subscribe((data: any[]) => {
    this.appliedPoliciesDescriptionsReceived = data;
    console.log('received:', this.appliedPoliciesDescriptionsReceived);
  });    console.log(this.appliedPoliciesDescriptionsReceived);
    
    console.log(this.thePolicySelectedPreviously);
    console.log("This is the storyline code:",this.storyLineCode);
    console.log(this.appliedPoliciesReceived);
  this.selected = this.policyRecommendation.getSelectedScenarioCode() || 'SSP245';

    // this.appliedPoliciesReceived = this.policyRecommendation.getAppliedPolicies(this.caseStudyName);
    //  if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
    //   this.title_case = 'CS1-Crete_Island';
    // } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
    //   this.title_case = 'CS2-Trentino_region';
    // } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
    //   this.title_case = 'CS3-Norrbotten_country';
    // } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
    //   this.title_case = 'CS4-Murcia_region';
    // } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
    //   this.title_case = 'CS5-Danube_delta';
    // }

         if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
      this.title_case = 'CS1 - Sitia municipality';
    } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
      this.title_case = 'CS2 - Trentino Province';
    } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
      this.title_case = 'CS3 - Norrbotten County';
    } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
      this.title_case = 'CS4 - Murcia Region';
    } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
      this.title_case = 'CS5 - Danube Delta';
    }

    // this.title_case = "/" +this.title_case;
        this.title_case = this.title_case;

    console.log(this.title_case);
    this.theScenarioIndex = this.thePolicySelected.getPolicyIndex();
  }
    thePolicySelectedPreviously:string = ''

 isPopupVisibleAbove: boolean = false;
  isPopupVisibleRight: boolean = false;

  // Method to toggle the visibility of the popups
  togglePopup(position: string): void {
    if (position === 'above') {
      this.isPopupVisibleAbove = !this.isPopupVisibleAbove;
    } else if (position === 'right') {
      this.isPopupVisibleRight = !this.isPopupVisibleRight;
      console.log("hi");
    }
  }



inputSelected:string = '';
execute_button:boolean  = true;

  checkInputValue(inputSelected:string):void{
    this.thePolicySelected.setScenario(inputSelected);
    this.execute_button = false;

    this.policyRecommendation.setPolicyAlternatives(inputSelected);
    
  }


    @Input() selected: string = 'SSP245';
  @Output() selectedChange = new EventEmitter<string>();

  select(value: string) {
  this.selected = value;
  this.selectedChange.emit(value);
  this.policyRecommendation.setSelectedScenarioCode(value);
}
}
