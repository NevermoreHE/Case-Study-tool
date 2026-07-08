import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mission-2-for-groups',
  templateUrl: './mission-2-for-groups.component.html',
  styleUrls: ['./mission-2-for-groups.component.css']
})
export class Mission2ForGroupsComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
