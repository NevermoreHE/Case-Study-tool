import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mission-2',
  templateUrl: './mission-2.component.html',
  styleUrls: ['./mission-2.component.css']
})
export class Mission2Component {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
