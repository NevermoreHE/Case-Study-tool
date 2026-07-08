import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-adaptation-indicators',
  templateUrl: './adaptation-indicators.component.html',
  styleUrls: ['./adaptation-indicators.component.css']
})
export class AdaptationIndicatorsComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
