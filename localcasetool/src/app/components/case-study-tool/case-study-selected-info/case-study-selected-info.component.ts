import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataServiceService } from '../../services/chartService/chart-data-service.service';
import { HazardsService } from '../../services/hazards/hazards.service';
import { DataStorageService } from '../titleCase/data-storage.service';

@Component({
  selector: 'app-case-study-selected-info',
  templateUrl: './case-study-selected-info.component.html',
  styleUrls: ['./case-study-selected-info.component.css'],
})
export class CaseStudySelectedInfoComponent {
  constructor(
    private translate: TranslateService,
    private dataStorageService: DataStorageService
  ) {
    translate.setDefaultLang('EN');
  }

  caseId: string = '';
  selectedTitleCase: string = '';
  title_case: string = '';

  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log('Selected Title Case from service:', this.selectedTitleCase);

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
  }
}
