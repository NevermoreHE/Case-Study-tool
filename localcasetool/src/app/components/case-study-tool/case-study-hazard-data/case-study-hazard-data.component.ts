import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SectorsService } from '../../services/sectors/sectors.service';
import { DataStorageService } from '../titleCase/data-storage.service';

@Component({
  selector: 'app-case-study-hazard-data',
  templateUrl: './case-study-hazard-data.component.html',
  styleUrls: ['./case-study-hazard-data.component.css']
})
export class CaseStudyHazardDataComponent {
title_case: string = '';

  selectedTitleCase: string = '';

  constructor(private translate: TranslateService,private dataStorageService: DataStorageService,private sectorService:SectorsService) {
    translate.setDefaultLang('EN');
  }

  hazard_chosen:string = '';


  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log("Selected Title Case from service:", this.selectedTitleCase); 
    if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
      this.title_case = 'CS1-Crete_Island';
    } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
      this.title_case = 'CS2-Trentino_region';
    } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
      this.title_case = 'CS3-Norrbotten_country';
    } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
      this.title_case = 'CS4-Murcia_region';
    } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
      this.title_case = 'CS5-Danube_delta';
    }
    this.title_case = "/"+this.title_case;
    console.log(this.title_case);
    console.log(this.selectedTitleCase)

    this.hazard_chosen = this.dataStorageService.getSelectedHazardFromEcv();
    console.log(this.hazard_chosen);
  
  }


  switchLanguage(language: string) {
    this.translate.use(language);
  }




}
