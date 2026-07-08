import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-climate-change-game-for-groups',
  templateUrl: './climate-change-game-for-groups.component.html',
  styleUrls: ['./climate-change-game-for-groups.component.css']
})
export class ClimateChangeGameForGroupsComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
