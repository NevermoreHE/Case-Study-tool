import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
