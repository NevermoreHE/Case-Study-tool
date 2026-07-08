import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-help-info',
  templateUrl: './help-info.component.html',
  styleUrls: ['./help-info.component.css']
})
export class HelpInfoComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}



