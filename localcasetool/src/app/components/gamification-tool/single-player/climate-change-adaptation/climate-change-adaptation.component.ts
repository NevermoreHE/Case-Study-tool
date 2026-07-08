import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-climate-change-adaptation',
  templateUrl: './climate-change-adaptation.component.html',
  styleUrls: ['./climate-change-adaptation.component.css']
})
export class ClimateChangeAdaptationComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
