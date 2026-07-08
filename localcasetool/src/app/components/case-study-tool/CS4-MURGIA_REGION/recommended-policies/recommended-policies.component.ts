import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../titleCase/data-storage.service';

@Component({
  selector: 'app-recommended-policies',
  templateUrl: './recommended-policies.component.html',
  styleUrls: ['./recommended-policies.component.css'],
})
export class RecommendedPoliciesComponent {
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

  policy_selected_status: boolean = false;
  policy_selected = 'No policy selected yet !';
  policy_selected_recommandations = 'No recomandations yet';

  choosePolicy() {
    this.policy_selected_status = true;
  }

  finishedExperience: boolean = false;
  finalText: string = '';
  disableReturnButton:boolean = true;

  selectedPolicyStatus(selectedPolicyRecommandation:string) {
      this.finishedExperience == true;
      this.finalText = 'Congratulation ! \n You have succesfuly finished your local case study !\n\n You can go through more recommende policies if you want OR exit and return to the tool selection ';
      this.disableReturnButton = false;
      console.log("You have chosen the policy recommandation for :" ,selectedPolicyRecommandation)
    }
  

  // policies = [
  //   {
  //     policy_type: 'Improve water storage tanks',
  //     policy_recomandations: [
  //       'This policy could be applied to water-storage-tanks..',
  //       'The cost of this policy...',
  //       'The benefits are....',
  //     ],
  //   },
  //   {
  //     policy_type: 'Improve desalination plants',
  //     policy_recomandations: [
  //       'This policy could be applied to desalination-plants..',
  //       'The cost of this policy...',
  //       'The benefits are....',
  //     ],
  //   },
  //   {
  //     policy_type: 'Improve water savings at household level',
  //     policy_recomandations: [
  //       'This policy could be applied to improve-water-savings-at-household-level..',
  //       'The cost of this policy...',
  //       'The benefits are....',
  //     ],
  //   },
  //   {
  //     policy_type: 'Improve pattern in agriculture',
  //     policy_recomandations: [
  //       'This policy could be applied to pattern-in-agriculture..',
  //       'The cost of this policy...',
  //       'The benefits are....',
  //     ],
  //   },
  //   {
  //     policy_type: 'Improve reforestation with adapted species',
  //     policy_recomandations: [
  //       'This policy could be applied to reforestation-with-adapted-species..',
  //       'The cost of this policy...',
  //       'The benefits are....',
  //     ],
  //   },
  // ];

  policies = [
    {
      policy_type: 'IMPROVE_WATER_STORAGE_TANKS',
    },
    {
      policy_type: 'IMPROVE_DESALINATION_PLANTS',
    },
    {
      policy_type: 'IMPROVE_WATER_SAVINGS_AT_HOUSEHOLD_LEVEL',
    },
    {
      policy_type: 'IMPROVE_PATTERN_IN_AGRICULTURE',
    },
    {
      policy_type: 'IMPROVE_REFORESTATION_WITH_ADAPTED_SPICIES',
    },
  ];
}
