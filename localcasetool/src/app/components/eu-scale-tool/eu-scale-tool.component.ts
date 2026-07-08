// import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-eu-scale-tool',
//   templateUrl: './eu-scale-tool.component.html',
//   styleUrls: ['./eu-scale-tool.component.css']
// })
// export class EuScaleToolComponent {
// constructor(private translate: TranslateService) {
//     translate.setDefaultLang('EN');
//   }

//   switchLanguage(language: string) {
//     this.translate.use(language);
//   }
// }


import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-eu-scale-tool',
  templateUrl: './eu-scale-tool.component.html',
  styleUrls: ['./eu-scale-tool.component.css'],
})
export class EuScaleToolComponent {
  constructor(
    private translate: TranslateService,
    private keycloakService: KeycloakService
  ) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  // ngAfterViewInit() {
  //   const iframe = document.getElementById('rethink') as HTMLIFrameElement;

  //   iframe.onload = async () => {
  //     try {
  //       const token = await this.keycloakService.getToken();
  //       if (token && iframe.contentWindow) {
  //         iframe.contentWindow.postMessage({ token }, 'https://tools.cartif.es/nevermore');
  //         console.log('Token trimis către iframe:', token);
  //       } else {
  //         console.warn('Tokenul nu există sau iframe.contentWindow e null');
  //       }
  //     } catch (error) {
  //       console.error('Eroare la obținerea tokenului:', error);
  //     }
  //   };
  // }

  ngOnInit() {
    const iframe = document.getElementById('rethink') as HTMLIFrameElement;
    iframe.onload = async () => {
      const token = await this.keycloakService.getToken();

      iframe.contentWindow?.postMessage(
        { token: token },
        'https://tools.cartif.es/nevermore'
      );
      console.log('Token sent to iframe for eu-scale-tool:', token);
    };
  }


  
}
