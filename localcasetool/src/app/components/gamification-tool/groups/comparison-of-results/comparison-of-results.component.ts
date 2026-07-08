import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comparison-of-results',
  templateUrl: './comparison-of-results.component.html',
  styleUrls: ['./comparison-of-results.component.css']
})
export class ComparisonOfResultsComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
