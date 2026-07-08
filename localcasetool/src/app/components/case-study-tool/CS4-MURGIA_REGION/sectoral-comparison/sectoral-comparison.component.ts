import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../titleCase/data-storage.service';
import { HazardsService } from 'src/app/components/services/hazards/hazards.service';

@Component({
  selector: 'app-sectoral-comparison',
  templateUrl: './sectoral-comparison.component.html',
  styleUrls: ['./sectoral-comparison.component.css']
})
export class SectoralComparisonComponent {
 selectedTitleCase: string = '';

  constructor(private translate: TranslateService,private dataStorageService: DataStorageService,private hazardService:HazardsService) {
    translate.setDefaultLang('EN');
  }

  theRoutingTitleCase:string = '';

  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log("Selected Title Case from service:", this.selectedTitleCase);
    this.hazardService.getSpecificHazardsForSelectedCaseStudy(this.selectedTitleCase).subscribe(data => this.hazardsReceived =JSON.parse(data));
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


hazardsReceived:any[] = [];

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
