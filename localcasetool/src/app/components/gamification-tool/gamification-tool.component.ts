import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-gamification-tool',
  templateUrl: './gamification-tool.component.html',
  styleUrls: ['./gamification-tool.component.css']
})
export class GamificationToolComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
