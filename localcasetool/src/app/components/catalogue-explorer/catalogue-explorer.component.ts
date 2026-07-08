// import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-catalogue-explorer',
//   templateUrl: './catalogue-explorer.component.html',
//   styleUrls: ['./catalogue-explorer.component.css']
// })
// export class CatalogueExplorerComponent {
//   constructor(private translate: TranslateService) {
//     translate.setDefaultLang('EN');
//   }

//   switchLanguage(language: string) {
//     this.translate.use(language);
//   }
// }


import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-catalogue-explorer',
  templateUrl: './catalogue-explorer.component.html',
  styleUrls: ['./catalogue-explorer.component.css']
})
export class CatalogueExplorerComponent implements OnInit {

  @ViewChild('rethink') iframe!:ElementRef<HTMLIFrameElement>;
  iframeWindow: Window | null = null;
  token: string | undefined;

  constructor(private translate: TranslateService,private readonly keycloak: KeycloakService, private keycloakService:KeycloakService) {
    translate.setDefaultLang('EN');

  //   iframe = document.getElementById('rethink') as HTMLIFrameElement;

  // iframe.onload = () => {

  // iframe.contentWindow?.postMessage(

  //   { token: window.localStorage.getItem('token') },

  //   'https://tools.cartif.es/nevermore-ams'

  // );

};

// console.log(window.localStorage.getItem('token'));

switchLanguage(language: string) {
    this.translate.use(language);
  }

  // iframeToken = '';


  // ngAfterViewInit(): void {
  //   this.iframeWindow = this.iframe.nativeElement.contentWindow;
  //   setTimeout(() => {
  //     this.sendMessageToIframe(this.token);
  //   }, 500);
  // }

  // ngOnInit(): void {
  //   const keycloak = this.keycloak.getKeycloakInstance();
  //    this.token = keycloak.token;
  //   window.addEventListener('message', this.handleIframeMessage.bind(this));
  // }

  // ngOnDestroy(): void {
  //   window.removeEventListener('message', this.handleIframeMessage.bind(this));
  // }

  // sendMessageToIframe(message: any) {
  //   if (this.iframeWindow) {
  //     const messageWithId = { message: message, source: 'parent' };
  //     const messageStringified = JSON.stringify(messageWithId);
  //     console.log("Parent sending message to iframe:", messageStringified);
  //     this.iframeToken = messageWithId.message;
  //     console.log("The iframe token is: ",this.iframeToken)
  //     this.iframeWindow.postMessage(messageStringified, 'http://localhost:4200');
  //   } else {
  //     console.error("iframeWindow nu este disponibil!");
  //   }
  // }

  // handleIframeMessage(event: MessageEvent) {
  //   try {
  //     const messageStringified = event.data;
  //     const messageWithId = JSON.parse(messageStringified);
  //     console.log("Parent received message:", messageWithId); // Verifică mesajul complet
  //     if (event.origin === 'http://localhost:4202' && messageWithId.source === 'iframe') {
  //       console.log('I received a message from iframe:', messageWithId.message);
  //       // ... procesează mesajul de la iframe
  //     } else {
  //       console.warn("Mesaj primit dintr-o origine neașteptată sau cu identificator incorect:", event.origin, messageWithId?.source);
  //     }
  //   } catch (error) {
  //     console.error("Eroare la parsarea mesajului de la iframe:", error);
  //   }
  // }

   ngOnInit() {
    const iframe = document.getElementById('rethink') as HTMLIFrameElement;
    iframe.onload = async () => {
      const token = await this.keycloakService.getToken();

      iframe.contentWindow?.postMessage(
        { token: token },
        'https://tools.cartif.es/nevermore-ams'
      );
      console.log('Token sent to iframe for eu-scale-tool:', token);
    };
  }
}
  

  

  

  