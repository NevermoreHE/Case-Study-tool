import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-final-results-for-groups',
  templateUrl: './final-results-for-groups.component.html',
  styleUrls: ['./final-results-for-groups.component.css']
})
export class FinalResultsForGroupsComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
